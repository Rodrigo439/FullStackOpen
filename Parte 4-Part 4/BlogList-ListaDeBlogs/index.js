require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// MongoDB connection
const mongoUrl = process.env.MONGO_URI;
mongoose.connect(mongoUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connected to database'))
.catch(err => console.error('Errot to connect the database:', err));

// definitions of the schema and the structure of blog list
const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number
});

const Blog = mongoose.model('Blog', blogSchema);

// Path to get the info of blogs
app.get('/api/blogs', async (req, res) => {
  try {
    const blogs = await Blog.find({});
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los blogs' });
  }
});

// path to post the info of blogs
app.post('/api/blogs', async (req, res) => {
  try {
    const blog = new Blog(req.body);
    const savedBlog = await blog.save();
    res.status(201).json(savedBlog);
  } catch (error) {
    res.status(400).json({ error: 'Error al guardar el blog' });
  }
});

// Start the server
const PORT = process.env.PORT || 3003;
app.listen(PORT, () => {
  console.log(`The server is running in the port ${PORT}`);
});

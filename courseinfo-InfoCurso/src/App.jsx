const Header = (props) => {
  console.log(props);
  return (
    <h1>{props.course.name}</h1>
  );
};

const Part = (props) => {
  return (
    <p>{props.part.name} {props.part.exercises}</p>
  );
};

const Content = (props) => {
  return (
    <div>
      {props.course.parts.map(part => (
        <Part key={part.name} part={part} />
      ))}
    </div>
  );
};

const Total = (props) => {
  console.log(props);
  const totalExercises = props.course.parts.reduce((sum, part) => sum + part.exercises, 0);
  return (
    <p>Cantidad de ejercicios / Quantity of exercises {totalExercises}</p>
  );
};

const App = () => {
  const course = {
    name: 'Half Stack application development/Desarrollo de aplicaciones HalfStack',
    parts: [
      {
        name: 'Fundamentals of React/Fundamentos de React ',
        exercises: 10
      },
      {
        name: 'Using props to pass data/Uso de props para pasar datos',
        exercises: 7
      },
      {
        name: 'State of a component/Estado de un componente ',
        exercises: 14
      }
    ]
  };

  return (
    <div>
      <Header course={course} />
      <Content course={course} />
      <Total course={course} />
    </div>
  );
};

export default App;

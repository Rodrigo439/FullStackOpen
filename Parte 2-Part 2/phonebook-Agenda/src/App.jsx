import { useState, useEffect } from 'react';
import axios from 'axios';
import Filter from './filter';
import PersonForm from './personForm';
import Persons from './persons';
import { addPerson } from './addPersonsService';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filter, setFilter] = useState('');


  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then((response) => {
        setPersons(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };
  
  //add a person in the phonebook / añadir una persona a la agenda
  const handleAddPerson = (event) => {
    event.preventDefault();
    const newPerson = {
      name: newName,
      number: newNumber,
    };
  
    addPerson(newPerson, persons, setPersons).then(() => {
      setNewName('');
      setNewNumber('');
    });
  };  
  //delete a person of the phonebook / borrar una persona de la agenda
  const handleDeletePerson = (id, name) => {
    if (window.confirm(`Delete ${name}?`)) {
      axios
        .delete(`http://localhost:3001/persons/${id}`)
        .then(() => {
          setPersons(persons.filter((person) => person.id !== id));
        })
        .catch((error) => {
          console.error('Error deleting person:', error);
        });
    }
  };

  const personsToShow =
    filter.length > 0
      ? persons.filter((person) =>
          person.name.toLowerCase().includes(filter.toLowerCase())
        )
      : persons;

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} handleFilterChange={handleFilterChange} />
      <h3>Add a new</h3>
      <PersonForm
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        addPerson={handleAddPerson}
      />
      <h3>Numbers</h3>
      <Persons personsToShow={personsToShow} onDelete={handleDeletePerson} />
    </div>
  );
};

export default App;

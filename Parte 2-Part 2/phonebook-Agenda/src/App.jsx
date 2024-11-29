import { useState, useEffect } from 'react';
import axios from 'axios';
import Filter from './filter';
import PersonForm from './personForm';
import Persons from './persons';
import { addPerson, deletePerson } from './addPersonsService';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filter, setFilter] = useState('');
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');
  const [notificationType, setNotificationType] = useState('success');

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

  const handleAddPerson = (event) => {
    event.preventDefault();
    const newPerson = { name: newName, number: newNumber };

    addPerson(newPerson, persons, setPersons)
      .then(() => {
        setNewName('');
        setNewNumber('');
        setShowNotification(true);
        setNotificationMessage('Person added successfully!');
        setNotificationType('success');
      })
      .catch((error) => {
        console.error('Error adding person:', error);
        setShowNotification(true);
        setNotificationMessage('Error adding person. Please try again.');
        setNotificationType('error');
      });
  };

  const handleDeletePerson = (id, name) => {
    if (window.confirm(`Delete ${name}?`)) {
      deletePerson(id)
        .then(() => {
          setPersons(persons.filter((person) => person.id !== id));
          setShowNotification(true);
          setNotificationMessage(`${name} deleted successfully!`);
          setNotificationType('success');
        })
        .catch((error) => {
          console.error('Error deleting person:', error);
          setShowNotification(true);
          setNotificationMessage('Error deleting person. Please try again.');
          setNotificationType('error');
        });
    }
  };

  const personsToShow = filter.length > 0 ? persons.filter((person) => person.name.toLowerCase().includes(filter.toLowerCase())) : persons;

  useEffect(() => {
    if (showNotification) {
      const timer = setTimeout(() => {
        setShowNotification(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showNotification]);

  return (
    <div>
      <h2>Phonebook</h2>
      {showNotification && (
        <div className={`notification ${notificationType}`}>
          {notificationMessage}
        </div>
      )}
      <Filter filter={filter} handleFilterChange={handleFilterChange} />
      <h3>Add a new</h3>
      <PersonForm newName={newName} newNumber={newNumber} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} addPerson={handleAddPerson} />
      <h3>Numbers</h3>
      <Persons personsToShow={personsToShow} onDelete={handleDeletePerson} />
    </div>
  );
};

export default App;

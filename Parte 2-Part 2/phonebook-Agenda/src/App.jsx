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
      .get('/api/persons')
      .then((response) => setPersons(response.data))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  const handleAddPerson = (event) => {
    event.preventDefault();
    const newPerson = { name: newName, number: newNumber };

    addPerson(newPerson, persons, setPersons)
      .then(() => {
        setNewName('');
        setNewNumber('');
        setNotificationMessage('Person added successfully!');
        setNotificationType('success');
        setShowNotification(true);
      })
      .catch(() => {
        setNotificationMessage('Error adding person.');
        setNotificationType('error');
        setShowNotification(true);
      });
  };

  const handleDeletePerson = (id, name) => {
    if (window.confirm(`Delete ${name}?`)) {
      deletePerson(id)
        .then(() => {
          setPersons(persons.filter(person => person.id !== id));
          setNotificationMessage(`${name} deleted successfully!`);
          setNotificationType('success');
          setShowNotification(true);
        })
        .catch(() => {
          setNotificationMessage('Error deleting person.');
          setNotificationType('error');
          setShowNotification(true);
        });
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      {showNotification && <div className={`notification ${notificationType}`}>{notificationMessage}</div>}
      <Filter filter={filter} handleFilterChange={(e) => setFilter(e.target.value)} />
      <h3>Add a new</h3>
      <PersonForm newName={newName} newNumber={newNumber} handleNameChange={(e) => setNewName(e.target.value)} handleNumberChange={(e) => setNewNumber(e.target.value)} addPerson={handleAddPerson} />
      <h3>Numbers</h3>
      <Persons personsToShow={persons.filter(p => p.name.toLowerCase().includes(filter.toLowerCase()))} onDelete={handleDeletePerson} />
    </div>
  );
};

export default App;

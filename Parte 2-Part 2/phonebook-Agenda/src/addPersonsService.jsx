import axios from 'axios';

const baseUrl = 'http://localhost:3001/persons';

export const addPerson = (newPerson, persons, setPersons) => {
  const existingPerson = persons.find((person) => person.name === newPerson.name);

  //verify if the person is in the phonebook/verificar si la persona esta en la agenda
  if (existingPerson) {
    if (window.confirm(`${newPerson.name} is already added to phonebook, replace the old number with a new one?/ya se encuentra en la agenda, desea reemplazar el numero?`)) {
      return axios
        .put(`${baseUrl}/${existingPerson.id}`, { ...existingPerson, number: newPerson.number })
        .then((response) => {
          setPersons(persons.map((person) => (person.id === existingPerson.id ? response.data : person)));
        })
        .catch((error) => {
          console.error('Error updating person:', error);
        });
    } else {
      return Promise.resolve(); //exit if the user cancel the action / salir del cartel si el usuario cancela la accion
    }
  } else {
    return axios
      .post(baseUrl, newPerson)
      .then((response) => {
        setPersons(persons.concat(response.data));
      })
      .catch((error) => {
        console.error('Error adding person:', error);
      });
  }
};

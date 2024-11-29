import axios from 'axios';

const baseUrl = 'http://localhost:3001/persons';

export const addPerson = (newPerson, persons, setPersons) => {
  const existingPerson = persons.find((person) => person.name === newPerson.name);

  if (existingPerson) {
    if (window.confirm(`${newPerson.name} is already added to phonebook, replace the old number with a new one? - ya esta
      en la agenda, quiere añadirlo?`)) {
      return axios
        .put(`${baseUrl}/${existingPerson.id}`, { ...existingPerson, number: newPerson.number })
        .then((response) => {
          setPersons(persons.map((person) => (person.id === existingPerson.id ? response.data : person)));
          return Promise.resolve();
        })
        .catch((error) => {
          console.error('Error updating person-error actualizando persona:', error);
          return Promise.reject(error);
        });
    } else {
      return Promise.resolve();
    }
  } else {
    return axios
      .post(baseUrl, newPerson)
      .then((response) => {
        setPersons(persons.concat(response.data));
        return Promise.resolve();
      })
      .catch((error) => {
        console.error('Error adding person-error añadiendo persona:', error);
        return Promise.reject(error);
      });
  }
};

export const deletePerson = (id) => {
  return axios.delete(`${baseUrl}/${id}`).catch((error) => {
    console.error('Error deleting person-error borrando persona:', error);
    return Promise.reject(error);
  });
};

import axios from 'axios';

const baseUrl = 'http://localhost:3001/api/persons';

export const addPerson = (newPerson, persons, setPersons) => {
  return axios.post(baseUrl, newPerson)
    .then(response => {
      setPersons([...persons, response.data]);
      return response.data;
    })
    .catch(error => Promise.reject(error));
};

export const deletePerson = (id) => {
  return axios.delete(`${baseUrl}/${id}`).catch(error => Promise.reject(error));
};

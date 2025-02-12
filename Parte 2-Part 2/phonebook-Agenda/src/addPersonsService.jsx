import axios from 'axios';

const baseUrl = '/api/persons';

export const addPerson = (newPerson, persons, setPersons) => {
  const existingPerson = persons.find(person => person.name === newPerson.name);

  if (existingPerson) {
    // If the contact already exists, update the number with a PUT request.
    return axios.put(`${baseUrl}/${existingPerson.id}`, newPerson)
      .then(response => {
        setPersons(persons.map(person => 
          person.id === existingPerson.id ? response.data : person
        ));
        return response.data;
      })
      .catch(error => {
        return Promise.reject(error);
      });
  } else {
    // If the contact does not exist, add a new one with a POST request
    return axios.post(baseUrl, newPerson)
      .then(response => {
        setPersons([...persons, response.data]);
        return response.data;
      })
      .catch(error => {
        return Promise.reject(error);
      });
  }
};

export const deletePerson = (id) => {
  return axios.delete(`${baseUrl}/${id}`).catch(error => Promise.reject(error));
};

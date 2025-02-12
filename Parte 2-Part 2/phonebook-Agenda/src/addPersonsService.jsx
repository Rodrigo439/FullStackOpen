import axios from 'axios';

const baseUrl = '/api/persons';

export const addPerson = (newPerson, persons, setPersons) => {
  const existingPerson = persons.find(person => person.name === newPerson.name);

  if (existingPerson) {
    // Si el contacto ya existe, actualizar el número con una solicitud PUT
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
    // Si el contacto no existe, agregar uno nuevo con una solicitud POST
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

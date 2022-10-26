import axios from 'axios';
const baseUrl = 'http://localhost:3001/persons';

const getAllPeople = () => {
  return axios.get(baseUrl);
};

const addPerson = (newPersonObj) => {
  return axios.post(baseUrl, newPersonObj);
};

const deletePerson = (id) => {
  return axios.delete(`${baseUrl}/${id}`);
};

const update = (id, changedNumber) => {
  const request = axios.put(`${baseUrl}/${id}`, changedNumber);
  console.log('updating');
  return request.then((response) => response.data);
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getAllPeople: getAllPeople,
  addPerson: addPerson,
  deletePerson: deletePerson,
  update: update,
};

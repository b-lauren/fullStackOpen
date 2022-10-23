import axios from 'axios';
const baseUrl = 'http://localhost:3001/persons';

const getAllPeople = () => {
  return axios.get(baseUrl);
};

const addPerson = (newPersonObj) => {
  return axios.post(baseUrl, newPersonObj);
};

// const update = (id, newObject) => {
//   //   return axios.put(`${baseUrl}/${id}`, newObject)
//   console.log('updating');
// };

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getAllPeople: getAllPeople,
  addPerson: addPerson,
  //   update: update,
};

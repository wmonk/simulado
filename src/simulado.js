const axios = require('axios');
const PortStore = require('./stores/PortStore');

const getPortNumber = () => {
  console.log('getPortNumber')
  const portStoreInstance = new PortStore();
  return portStoreInstance.getState().port;
};

const addMock = responseToMock => {
  console.log('addMock')
  const { path } = responseToMock;

  return axios
    .post(
      `http://localhost:${getPortNumber()}/simulado/response`,
      Object.assign({}, responseToMock, {
        path: path.toString(),
        isRegexPath: typeof path === 'object'
      }),
      { headers: { 'Content-Type': 'application/json' } }
    )
    .then(() => true);
};

const addMocks = async responsesToMock => {
  console.log('addMocks')
  return await Promise.all(responsesToMock.map(addMock));
};

const setDefaults = async responsesToMock => {
  console.log('setDefaults')
  await clearRequests();
  await clearResponses();

  return await addMocks(responsesToMock);
};

const lastRequests = (method, path, limit) => {
  console.log('lastRequests')
  return axios
    .get(
      `http://localhost:${getPortNumber()}/simulado/requests?method=${method.toUpperCase()}&path=${path}${limit
        ? `&limit=${limit}`
        : ''}`,
      { headers: { 'Content-Type': 'application/json' } }
    )
    .then(response => response.data);
};

const lastRequest = async (method, path) => {
  console.log('lastRequest')
  const lastRequest = await lastRequests(method, path, 1);
  return lastRequest[0];
};

const clearResponse = (method, path) => {
  console.log('clearResponse')
  return axios
    .delete(
      `http://localhost:${getPortNumber()}/simulado/response?method=${method.toUpperCase()}&path=${path}`
    )
    .then(() => true);
};

const clearResponses = () => {
  console.log('clearResponses')
  return axios.delete(`http://localhost:${getPortNumber()}/simulado/responses`).then(() => true);
};

const clearRequest = (method, path) => {
  console.log('clearRequest')
  return axios
    .delete(
      `http://localhost:${getPortNumber()}/simulado/request?method=${method.toUpperCase()}&path=${path}`
    )
    .then(() => true);
};

const clearRequests = () => {
  console.log('clearRequests')
  return axios.delete(`http://localhost:${getPortNumber()}/simulado/requests`).then(() => true);
};

module.exports = {
  addMock,
  addMocks,
  setDefaults,
  lastRequests,
  lastRequest,
  clearResponse,
  clearResponses,
  clearRequest,
  clearRequests
};

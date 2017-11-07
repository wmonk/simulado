process.on('exit', code =>  console.error(`Process exiting on ${code}`))
process.on('uncaughtException', console.error)

const { start, stop } = require('./server');
const {
  addMock,
  addMocks,
  setDefaults,
  lastRequests,
  lastRequest,
  clearResponse,
  clearResponses,
  clearRequest,
  clearRequests
} = require('./simulado.js');

module.exports = {
  start,
  stop,
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

process.on('exit', code =>  console.error(`Process exiting on ${code}`))
process.on('uncaughtException', err => {
    console.error('Something really bad happened:')
    console.err(err)
})

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

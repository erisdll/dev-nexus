const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const Area = require('../src/models/Area');
const mockArea = require('./mocks/mockArea');

beforeAll(async () => {
  const mongoServer = new MongoMemoryServer();
  const mongoUri = await mongoServer.getUri();

  // Connect to the in-memory database
  await mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

afterAll(async () => {
  // Disconnect Mongoose and stop the in-memory database server
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe('GET Area Model Test', () => {
  it('should call the model and return the correct values', async () => {
    const area = new Area(mockArea);
  });
});

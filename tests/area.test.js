const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const Area = require('../src/models/Area');

let mongoServer;

beforeAll(async () => {
  mongoServer = new MongoMemoryServer();
  const mongoUri = await mongoServer.getUri();
  await mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

const mockLangId = mongoose.Types.ObjectId();
const mockTechId = mongoose.Types.ObjectId();

const mockAreaData = {
  name: 'Mock Area',
  description: 'This is a mock area for testing purposes.',
  imgURL: 'https://example.com/mock-area.jpg',
  keyFeatures: ['Feature 1', 'Feature 2'],
  useCases: ['Use Case 1', 'Use Case 2'],
  popularity: 42,
  langs: [mockLangId],
  techs: [mockTechId],
};

describe('CREATE Area Model Test', () => {
  const mockArea = new Area(mockAreaData);

  it('Should save the mock area to the database.', () => {
    return mockArea.save().then((savedArea) => {
      expect(savedArea.name).toBe('Mock Area');
      expect(savedArea.description).toBe('This is a mock area for testing purposes.');
    });
  });
});

describe('READ Area Model Test', () => {
  const mockArea = new Area(mockAreaData);

  it('should test the schema and return the correct values', () => {
    const expectedData = {
      name: 'Mock Area',
      description: 'This is a mock area for testing purposes.',
      imgURL: 'https://example.com/mock-area.jpg',
      keyFeatures: ['Feature 1', 'Feature 2'],
      useCases: ['Use Case 1', 'Use Case 2'],
      popularity: 42,
      langs: [mockLangId],
      techs: [mockTechId],
    };

    const areaProperties = Object.keys(expectedData);

    areaProperties.forEach((property) => {
      expect(mockArea[property]).toEqual(expectedData[property]);
    });
  });
});

describe('UPDATE Area Model Test', () => {
  const mockArea = new Area(mockAreaData);

  it('Should edit the document and save the updated version to the DB', () => {
    mockArea.name = 'Updated Mock Area';

    return mockArea.save().then(() => {
      return Area.findOne({ _id: mockArea._id }).then((updatedArea) => {
        expect(updatedArea.name).toBe('Updated Mock Area');
      });
    });
  });
});

describe('DELETE Area Model Test', () => {
  const mockArea = new Area(mockAreaData);

  it('Should delete a mockArea document from the DB', () => {
    return mockArea.save().then((savedArea) => {
      return Area.deleteOne({ _id: savedArea._id }).then(() => {
        return Area.findOne({ _id: savedArea._id }).then((foundArea) => {
          expect(foundArea).toBe(null);
        });
      });
    });
  });
});

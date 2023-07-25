const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const Tech = require('../src/models/Tech');

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
const mockAreaId = mongoose.Types.ObjectId();

const mockTechData = {
  name: 'Mock Tech',
  description: 'This is a mock tech for testing purposes.',
  imgUrl: 'https://example.com/mock-tech.jpg',
  keyFeatures: ['Feature 1', 'Feature 2'],
  advantages: ['Advantage 1', 'Advantage 2'],
  disadvantages: ['Disadvantage 1', 'Disadvantage 2'],
  popularity: 50,
  langs: [mockLangId],
  areas: [mockAreaId],
};

describe('CREATE Tech Model Test', () => {
  const mockTech = new Tech(mockTechData);

  it('Should save the mock tech to the database.', () => {
    return mockTech.save().then((savedTech) => {
      expect(savedTech.name).toBe('Mock Tech');
      expect(savedTech.description).toBe('This is a mock tech for testing purposes.');
    });
  });
});

describe('READ Tech Model Test', () => {
  const mockTech = new Tech(mockTechData);

  it('should test the schema and return the correct values', () => {
    const expectedData = {
      name: 'Mock Tech',
      description: 'This is a mock tech for testing purposes.',
      imgUrl: 'https://example.com/mock-tech.jpg',
      keyFeatures: ['Feature 1', 'Feature 2'],
      advantages: ['Advantage 1', 'Advantage 2'],
      disadvantages: ['Disadvantage 1', 'Disadvantage 2'],
      popularity: 50,
      langs: [mockLangId],
      areas: [mockAreaId],
    };

    const techProperties = Object.keys(expectedData);

    techProperties.forEach((property) => {
      expect(mockTech[property]).toEqual(expectedData[property]);
    });
  });
});

describe('UPDATE Tech Model Test', () => {
  const mockTech = new Tech(mockTechData);

  it('Should edit the document and save the updated version to the DB', () => {
    mockTech.name = 'Updated Mock Tech';

    return mockTech.save().then(() => {
      return Tech.findOne({ _id: mockTech._id }).then((updatedTech) => {
        expect(updatedTech.name).toBe('Updated Mock Tech');
      });
    });
  });
});

describe('DELETE Tech Model Test', () => {
  const mockTech = new Tech(mockTechData);

  it('Should delete a mockTech document from the DB', () => {
    return mockTech.save().then((savedTech) => {
      return Tech.deleteOne({ _id: savedTech._id }).then(() => {
        return Tech.findOne({ _id: savedTech._id }).then((foundTech) => {
          expect(foundTech).toBe(null);
        });
      });
    });
  });
});

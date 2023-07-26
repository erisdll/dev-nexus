const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const Tech = require('../src/models/Tech');

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();
  await mongoose.connect(mongoUri, {
    dbName: 'testDB',
  });
});

afterAll(async () => {
  await mongoServer.stop();
  await mongoose.disconnect();
});

const mockLangId = new mongoose.Types.ObjectId();
const mockAreaId = new mongoose.Types.ObjectId();

const mockTechData = {
  name: 'Mock Tech',
  description:
    'This is a mock technology for testing purposes. It contains sample data to evaluate various scenarios and functionalities.',
  imgURL: 'https://example.com/mock-tech.jpg',
  keyFeatures: [
    'Feature_1',
    'Feature_2',
    'Feature_3',
    'Feature_4',
    'Feature_5',
  ],
  advantages: ['Advantage 1', 'Advantage 2'],
  disadvantages: ['Disadvantage 1', 'Disadvantage 2'],
  popularity: 50,
  langs: [mockLangId],
  areas: [mockAreaId],
};

describe('CREATE Tech Model Test', () => {
  const mockTech = new Tech({
    name: 'Mock Tech',
    description:
      'This is a mock technology for testing purposes. It contains sample data to evaluate various scenarios and functionalities.',
    imgURL: 'https://example.com/mock-tech.jpg',
    keyFeatures: [
      'Feature_1',
      'Feature_2',
      'Feature_3',
      'Feature_4',
      'Feature_5',
    ],
    advantages: ['Advantage 1', 'Advantage 2'],
    disadvantages: ['Disadvantage 1', 'Disadvantage 2'],
  });

  it('Should save the mock tech to the database.', () => {
    return mockTech.save().then((savedTech) => {
      expect(savedTech.name).toBe('Mock Tech');
      expect(savedTech.description).toBe('This is a mock technology for testing purposes. It contains sample data to evaluate various scenarios and functionalities.');
      expect(savedTech.imgURL).toBe('https://example.com/mock-tech.jpg');
      expect(savedTech.keyFeatures).toEqual([
        'Feature_1',
        'Feature_2',
        'Feature_3',
        'Feature_4',
        'Feature_5',
      ]);
      expect(savedTech.advantages).toEqual(['Advantage 1', 'Advantage 2']);
      expect(savedTech.disadvantages).toEqual(['Disadvantage 1', 'Disadvantage 2']);
      expect(savedTech.popularity).toBe(0);
      expect(savedTech.langs).toEqual([]);
      expect(savedTech.areas).toEqual([]);
    });
  });
});

describe('READ Tech Model Test', () => {
  const mockTech = new Tech(mockTechData);

  it('should test the schema and return the correct values', () => {
    const expectedData = {
      name: 'Mock Tech',
      description:
        'This is a mock technology for testing purposes. It contains sample data to evaluate various scenarios and functionalities.',
      imgURL: 'https://example.com/mock-tech.jpg',
      keyFeatures: [
        'Feature_1',
        'Feature_2',
        'Feature_3',
        'Feature_4',
        'Feature_5',
      ],
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
  let mockTech;

  beforeEach(async () => {
    // Clean up the Tech collection before each test
    await Tech.deleteMany({});

    // Create and save the mockTech
    mockTech = new Tech(mockTechData);
    await mockTech.save();
  });

  it('Should delete a mockTech document from the DB', () => {
    return Tech.deleteOne({ _id: mockTech._id }).then(() => {
      return Tech.findOne({ _id: mockTech._id }).then(foundTech => {
        expect(foundTech).toBe(null);
      });
    });
  });
});

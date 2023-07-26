const mongoose = require('mongoose');
const Area = require('../src/models/Area');
const { MongoMemoryServer } = require('mongodb-memory-server');

let mongoServer

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();
  await mongoose.connect(mongoUri, {
    dbName: "testDB",
  });
});

afterAll(async () => {
  await mongoServer.stop();
  await mongoose.disconnect();
});

const mockLangId = new mongoose.Types.ObjectId();
const mockTechId = new mongoose.Types.ObjectId();

const mockAreaData = {
  name: 'Mock Area',
  description:
    'This is a mock area of interest for testing purposes. It contains sample data to evaluate various scenarios and functionalities.',
  imgURL: 'https://example.com/mock-area.jpg',
  keyFeatures: [
    'Feature_1',
    'Feature_2',
    'Feature_3',
    'Feature_4',
    'Feature_5',
  ],
  useCases: ['Use Case 1', 'Use Case 2'],
  popularity: 42,
  langs: [mockLangId],
  techs: [mockTechId],
};

describe('CREATE Area Model Test', () => {
  const mockArea = new Area({
    name: 'Mock Area',
    description:
      'This is a mock area of interest for testing purposes. It contains sample data to evaluate various scenarios and functionalities.',
    imgURL: 'https://example.com/mock-area.jpg',
    keyFeatures: [
      'Feature_1',
      'Feature_2',
      'Feature_3',
      'Feature_4',
      'Feature_5',
    ],
    useCases: ['Use Case 1', 'Use Case 2'],
  });

  it('Should save the mock area to the database with default values for non-required fields.', () => {
    return mockArea.save().then((savedArea) => {
      expect(savedArea.name).toBe('Mock Area');
      expect(savedArea.description).toBe('This is a mock area of interest for testing purposes. It contains sample data to evaluate various scenarios and functionalities.');
      expect(savedArea.imgURL).toBe('https://example.com/mock-area.jpg');
      expect(savedArea.keyFeatures).toEqual([
        'Feature_1',
        'Feature_2',
        'Feature_3',
        'Feature_4',
        'Feature_5',
      ]);
      expect(savedArea.useCases).toEqual(['Use Case 1', 'Use Case 2']);
      // Expect default values for non-required fields
      expect(savedArea.popularity).toBe(0);
      expect(savedArea.langs).toEqual([]);
      expect(savedArea.techs).toEqual([]);
    });
  });
});

describe('READ Area Model Test', () => {
  const mockArea = new Area(mockAreaData);

  it('should test the schema and return the correct values', () => {
    const expectedData = {
      name: 'Mock Area',
      description:
        'This is a mock area of interest for testing purposes. It contains sample data to evaluate various scenarios and functionalities.',
      imgURL: 'https://example.com/mock-area.jpg',
      keyFeatures: [
        'Feature_1',
        'Feature_2',
        'Feature_3',
        'Feature_4',
        'Feature_5',
      ],
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
  let mockArea;

  beforeEach(async () => {
    // Clean up the collection before each test
    await Area.deleteMany({});

    // Create and save the mockArea
    mockArea = new Area(mockAreaData);
    await mockArea.save();
  });

  it('Should delete a mockArea document from the DB', () => {
    return Area.deleteOne({ _id: mockArea._id }).then(() => {
      return Area.findOne({ _id: mockArea._id }).then(foundArea => {
        expect(foundArea).toBe(null);
      });
    });
  });
});


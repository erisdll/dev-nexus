const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const Lang = require('../src/models/Lang');

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

const mockAreaId = mongoose.Types.ObjectId();
const mockTechId = mongoose.Types.ObjectId();

const mockLangData = {
  name: 'Mock Language',
  description: 'This is a mock programming language for testing purposes. It contains sample data to evaluate various scenarios and functionalities.',
  imgURL: 'https://example.com/mock-language.jpg',
  keyFeatures: ['Feature 1', 'Feature 2'],
  advantages: ['Advantage 1', 'Advantage 2'],
  disadvantages: ['Disadvantage 1', 'Disadvantage 2'],
  designedBy: ['Developer 1', 'Developer 2'],
  yearCreated: 2020,
  popularity: 75,
  areas: [mockAreaId],
  areas: [mockTechId],
};

describe('CREATE Lang Model Test', () => {
  const mockLang = new Lang({
    name: 'Mock Language',
    description: 'This is a mock programming language for testing purposes. It contains sample data to evaluate various scenarios and functionalities.',
    imgURL: 'https://example.com/mock-language.jpg',
    keyFeatures: ['Feature 1', 'Feature 2'],
    advantages: ['Advantage 1', 'Advantage 2'],
    disadvantages: ['Disadvantage 1', 'Disadvantage 2'],
    designedBy: ['Developer 1', 'Developer 2'],
    yearCreated: 2020,
  });

  it('Should save the mock language to the database.', () => {
    return mockLang.save().then((savedLang) => {
      expect(savedLang.name).toBe('Mock Language');
      expect(savedLang.description).toBe('This is a mock programming language for testing purposes. It contains sample data to evaluate various scenarios and functionalities.');
      expect(savedLang.imgURL).tobe('https://example.com/mock-language.jpg')
      expect(savedLang.keyFeatures).toEqual(['Feature 1', 'Feature 2'])
      expect(savedLang.advantages).toEqual(['Advantage 1', 'Advantage 2'])
      expect(savedLang.disadvantages).toEqual(['Disadvantage 1', 'Disadvantage 2'])
      expect(savedLang.designedBy).toEqual(['Developer 1', 'Developer 2'])
      expect(savedLang.yearCreated).tobe(2020)
      // Expect default values for non-required fields
      expect(savedLang.popularity).toBe(0);
      expect(savedLang.areas).toEqual([]);
      expect(savedLang.langs).toEqual([]);
    });
  });
});

describe('READ Lang Model Test', () => {
  const mockLang = new Lang(mockLangData);

  it('should test the schema and return the correct values', () => {
    const expectedData = {
      name: 'Mock Language',
      description: 'This is a mock programming language for testing purposes. It contains sample data to evaluate various scenarios and functionalities.',
      imgURL: 'https://example.com/mock-language.jpg',
      keyFeatures: ['Feature 1', 'Feature 2'],
      advantages: ['Advantage 1', 'Advantage 2'],
      disadvantages: ['Disadvantage 1', 'Disadvantage 2'],
      designedBy: ['Developer 1', 'Developer 2'],
      yearCreated: 2020,
      popularity: 75,
      areas: [mockAreaId],
      techs: [mockTechId],
    };

    const langProperties = Object.keys(expectedData);

    langProperties.forEach((property) => {
      expect(mockLang[property]).toEqual(expectedData[property]);
    });
  });
});

describe('UPDATE Lang Model Test', () => {
  const mockLang = new Lang(mockLangData);

  it('Should edit the document and save the updated version to the DB', () => {
    mockLang.name = 'Updated Mock Language';

    return mockLang.save().then(() => {
      return Lang.findOne({ _id: mockLang._id }).then((updatedLang) => {
        expect(updatedLang.name).toBe('Updated Mock Language');
      });
    });
  });
});

describe('DELETE Lang Model Test', () => {
  const mockLang = new Lang(mockLangData);

  it('Should delete a mockLang document from the DB', () => {
    return mockLang.save().then((savedLang) => {
      return Lang.deleteOne({ _id: savedLang._id }).then(() => {
        return Lang.findOne({ _id: savedLang._id }).then((foundLang) => {
          expect(foundLang).toBe(null);
        });
      });
    });
  });
});

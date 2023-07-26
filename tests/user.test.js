const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const User = require('../src/models/User');

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
const mockTechId = new mongoose.Types.ObjectId();
const mockAreaId = new mongoose.Types.ObjectId();

const mockUserData = {
  username: 'mockuser',
  password: 'M0ckp@ssword',
  email: 'mockuser@example.com',
  fullName: 'Mock User',
  location: 'Mock City',
  imgURL: 'https://example.com/mock-user.jpg',
  bio: "Hi, I'm a DevNexus user! I love coding and learning new technologies. :)",
  selectedLangs: [mockLangId],
  selectedTechs: [mockTechId],
  selectedAreas: [mockAreaId],
  isAdmin: false,
  createdAt: '2023-07-25T23:26:37.616Z',
  lastLogin: '2023-07-25T23:26:37.616Z',
  deactivated: false,
};

describe('CREATE User Model Test', () => {
  const mockUser = new User({
    username: 'mockuser',
    password: 'M0ckp@ssword',
    email: 'mockuser@example.com',
  });

  it('Should save the mock user to the database with default values for non-required fields.', () => {
    return mockUser.save().then((savedUser) => {
      expect(savedUser.username).toBe('mockuser');
      expect(savedUser.email).toBe('mockuser@example.com');
      // Expect default values for non-required fields
      expect(savedUser.fullName).toBeUndefined();
      expect(savedUser.location).toBeUndefined();
      expect(savedUser.imgURL).toBeUndefined();
      expect(savedUser.bio).toBe("Hi, I'm a DevNexus user! I love coding and learning new technologies. :)");
      expect(savedUser.selectedLangs).toEqual([]);
      expect(savedUser.selectedTechs).toEqual([]);
      expect(savedUser.selectedAreas).toEqual([]);
      expect(savedUser.isAdmin).toBeFalsy();
      expect(savedUser.createdAt).toBeInstanceOf(Date);
      expect(savedUser.lastLogin).toBeUndefined();
      expect(savedUser.deactivated).toBeFalsy();
    });
  });
});

describe('READ User Model Test', () => {
  const mockUser = new User(mockUserData);

  it('should test the schema and return the correct values', () => {
    const expectedData = {
      username: 'mockuser',
      password: 'M0ckp@ssword',
      email: 'mockuser@example.com',
      fullName: 'Mock User',
      location: 'Mock City',
      imgURL: 'https://example.com/mock-user.jpg',
      bio: "Hi, I'm a DevNexus user! I love coding and learning new technologies. :)",
      selectedLangs: [mockLangId],
      selectedTechs: [mockTechId],
      selectedAreas: [mockAreaId],
      isAdmin: false,
      createdAt: new Date('2023-07-25T23:26:37.616Z'),
      lastLogin: new Date('2023-07-25T23:26:37.616Z'),
      deactivated: false,
    };

    const userProperties = Object.keys(expectedData);

    userProperties.forEach((property) => {
      expect(mockUser[property]).toEqual(expectedData[property]);
    });
  });
});

describe('UPDATE User Model Test', () => {
  let mockUser = new User(mockUserData);

  beforeEach(async () => {
    // Clean up the User collection before each test
    await User.deleteMany({});

    // Create and save the mockUser
    mockUser = new User(mockUserData);
    await mockUser.save();
  });

  it('Should edit the document and save the updated version to the DB', () => {
    mockUser.username = 'updatedmockuser';

    return mockUser.save().then(() => {
      return User.findOne({ _id: mockUser._id }).then((updatedData) => {
        expect(updatedData.username).toBe('updatedmockuser');
      });
    });
  });
});

describe('DELETE User Model Test', () => {
  let mockUser;

  beforeEach(async () => {
    // Clean up the User collection before each test
    await User.deleteMany({});

    // Create and save the mockUser
    mockUser = new User(mockUserData);
    await mockUser.save();
  });

  it('Should delete a mockUser document from the DB', () => {
    return User.deleteOne({ _id: mockUser._id }).then(() => {
      return User.findOne({ _id: mockUser._id }).then(foundUser => {
        expect(foundUser).toBe(null);
      });
    });
  });
});

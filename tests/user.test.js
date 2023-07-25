const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const User = require('../src/models/User');

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
const mockAreaId = mongoose.Types.ObjectId();
const MockcreatedAt = Date.now()
const MocklastLogin = Date.now()

const mockUserData = {
  username: 'mockuser',
  password: 'mockpassword',
  email: 'mockuser@example.com',
  fullName: 'Mock User',
  location: 'Mock City',
  imgURL: 'https://example.com/mock-user.jpg',
  bio: "Hi, I'm a DevNexus user! I love coding and learning new technologies. :)",
  selectedLangs: [mockLangId],
  selectedTechs: [mockTechId],
  selectedAreas: [mockAreaId],
  isAdmin: false,
  createdAt: MockcreatedAt,
  lastLogin: MocklastLogin,
  deactivated: false,
};

describe('CREATE User Model Test', () => {
  const mockUser = new User({
    username: 'mockuser',
    password: 'mockpassword',
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
      password: 'mockpassword',
      email: 'mockuser@example.com',
      fullName: 'Mock User',
      location: 'Mock City',
      imgURL: 'https://example.com/mock-user.jpg',
      bio: "Hi, I'm a DevNexus user! I love coding and learning new technologies. :)",
      selectedLangs: [mockLangId],
      selectedTechs: [mockTechId],
      selectedAreas: [mockAreaId],
      isAdmin: false,
      createdAt: MockcreatedAt,
      lastLogin: MocklastLogin,
      deactivated: false,
    };

    const userProperties = Object.keys(expectedData);

    userProperties.forEach((property) => {
      expect(mockUser[property]).toEqual(expectedData[property]);
    });
  });
});

describe('UPDATE User Model Test', () => {
  const mockUser = new User(mockUserData);

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
  const mockUser = new User(mockUserData);

  it('Should delete a mockUser document from the DB', () => {
    return mockUser.save().then((savedUser) => {
      return User.deleteOne({ _id: savedUser._id }).then(() => {
        return User.findOne({ _id: savedUser._id }).then((foundData) => {
          expect(foundData).toBe(null);
        });
      });
    });
  });
});

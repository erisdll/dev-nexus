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
const createdAtMock = Date.now()
const lastLoginMock = Date.now()

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
  createdAt: createdAtMock,
  lastLogin: lastLoginMock,
  deactivated: false,
};

describe('CREATE User Model Test', () => {
  const mockUser = new User(mockUserData);

  it('Should save the mock user to the database.', () => {
    return mockUser.save().then((mockData) => {
      expect(mockData.username).toBe('mockuser');
      expect(mockData.email).toBe('mockuser@example.com');
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
      createdAt: createdAtMock,
      lastLogin: lastLoginMock,
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
    return mockUser.save().then((savedData) => {
      return User.deleteOne({ _id: savedData._id }).then(() => {
        return User.findOne({ _id: savedData._id }).then((foundData) => {
          expect(foundData).toBe(null);
        });
      });
    });
  });
});

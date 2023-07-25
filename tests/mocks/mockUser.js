const mongoose = require('mongoose');

const mockUser = {
  username: 'jsmith86',
  password: 'StrongPass2023!',
  email: 'jsmith@example.com',
  fullName: 'John Smith',
  location: 'San Francisco, CA',
  bio: "Hello! I'm a web developer passionate about building user-friendly and efficient applications.",
  imgURL: 'https://example.com/jsmith-avatar.jpg',
  selectedLangs: [mongoose.Types.ObjectId('615e65fe8abf32a5b848baa1')],
  selectedTechs: [mongoose.Types.ObjectId('615e65fe8abf32a5b848baa2')],
  selectedAreas: [mongoose.Types.ObjectId('615e65fe8abf32a5b848ba9f')],
  isAdmin: false,
  createdAt: new Date('2023-07-24T10:15:00'),
  updatedAt: new Date('2023-07-24T16:45:00'),
};

module.exports = mockUser;

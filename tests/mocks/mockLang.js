const mongoose = require('mongoose');

const mockLang = {
  name: 'JavaScript',
  description:
    'JavaScript is a versatile programming language that is commonly used for web development to add interactivity and dynamic content to websites.',
  imgURL: 'https://example.com/javascript.jpg',
  keyFeatures: ['Object-Oriented', 'Prototype-Based', 'Event-Driven'],
  advantages: ['Versatility', 'Wide Adoption', 'Large Ecosystem'],
  disadvantages: [
    'Asynchronous Programming Complexity',
    'Type Coercion Quirks',
  ],
  designedBy: ['Brendan Eich'],
  yearCreated: 1995,
  popularity: 77,

  areas: [
    mongoose.Types.ObjectId('615e65fe8abf32a5b848ba9f'),
    mongoose.Types.ObjectId('615e65fe8abf32a5b848baa0'),
  ],

  techs: [mongoose.Types.ObjectId('615e65fe8abf32a5b848baa1')],
};

module.exports = mockLang;

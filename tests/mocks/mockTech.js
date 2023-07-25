const mongoose = require('mongoose');

const mockTech = {
  name: 'React',
  description:
    'React is a popular JavaScript library for building user interfaces, particularly for single-page applications.',
  imgUrl: 'https://example.com/react.jpg',
  keyFeatures: ['Component-Based', 'Virtual DOM', 'Reusability'],
  advantages: ['Efficient Rendering', 'Declarative Syntax', 'Active Community'],
  disadvantages: ['Steep Learning Curve for Beginners', 'Large Bundle Size'],
  popularity: 90,

  langs: [mongoose.Types.ObjectId('615e65fe8abf32a5b848baa1')],

  areas: [mongoose.Types.ObjectId('615e65fe8abf32a5b848ba9f')],
};

module.exports = mockTech;

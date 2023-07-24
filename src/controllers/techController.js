const Tech = require('../models/Tech');

exports.createTech = async (req, res) => {
  try {
    const newTech = await Tech.create(req.body);

    res.status(201).json({
      status: 'success',
      message: 'Resource created successfully!',
      data: { newTech },
    });
  } catch (err) {
    if (err.name === 'ValidationError') {
      res.status(400).json({
        status: 'fail',
        message: 'Bad request!',
      });
    } else {
      res.status(500).json({
        status: 'fail',
        message: 'Internal server error',
      });
    }
  }
};

exports.getAllTechs = async (req, res) => {
  try {
    const techs = await Tech.find();

    if (techs.length === 0) {
      throw new Error('Not Found');
    }

    res.status(200).json({
      status: 'success',
      data: { techs },
    });
  } catch (err) {
    if (err.message === 'Not Found') {
      res.status(404).json({
        status: 'fail',
        message: 'Resource not found!',
      });
    } else {
      res.status(500).json({
        status: 'fail',
        message: 'Internal server error',
      });
    }
  }
};

exports.getTech = async (req, res) => {
  try {
    const techName = req.params.name
      .split('-')
      .map(word => {
        return word.charAt(0).toUpperCase() + word.slice(1);
      })
      .join(' '); 
    const tech = await Tech.findOne({ name: techName });

    if (!tech) {
      throw new Error('Not Found');
    }

    res.status(200).json({
      status: 'success',
      data: { tech },
    });
  } catch (err) {
    if (err.message === 'Not Found') {
      res.status(404).json({
        status: 'fail',
        message: 'Resource not found!',
      });
    } else {
      res.status(500).json({
        status: 'fail',
        message: 'Internal server error',
      });
    }
  }
};

exports.updateTech = async (req, res) => {
  try {
    const techName = req.params.name
      .split('-')
      .map(word => {
        return word.charAt(0).toUpperCase() + word.slice(1);
      })
      .join(' ');
    const updatedtech = await Tech.findOneAndUpdate(
      { techName },
      { $set: req.body },
      { new: true },
    );

    if (!updatedtech) {
      throw new Error('Not Found');
    }

    res.status(200).json({
      status: 'success',
      message: 'Resource updated successfully!',
      data: { updatedtech },
    });
  } catch (err) {
    if (err.name === 'ValidationError') {
      res.status(400).json({ message: 'Bad request!' });
    } else if (err.message === 'Not Found') {
      res.status(404).json({
        status: 'fail',
        message: 'Resource not found!',
      });
    } else {
      res.status(500).json({
        status: 'fail',
        message: 'Internal server error',
      });
    }
  }
};

exports.deleteTech = async (req, res) => {
  try {
    const techName = req.params.name
      .split('-')
      .map(word => {
        return word.charAt(0).toUpperCase() + word.slice(1);
      })
      .join(' ');
    const deletedtech = await Tech.findOneAndDelete({ techName });

    if (!deletedtech) {
      throw new Error('Not Found');
    }

    res.status(200).json({
      status: 'success',
      message: 'Resource deleted successfully!',
      data: { deletedtech },
    });
  } catch (err) {
    if (err.message === 'Not Found') {
      res.status(404).json({
        status: 'fail',
        message: 'Resource not deleted!',
      });
    } else {
      res.status(500).json({
        status: 'fail',
        message: 'Internal server error',
      });
    }
  }
};
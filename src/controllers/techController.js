const Tech = require('../models/Tech');

exports.createTech = async (req, res) => {

};

exports.getAllTechs = async (req, res) => {
  try {
    const techs = await Tech.find();

    if (techs.length === 0) {
      throw new Error('Not Found');
    }

    res.status(200).json({
      status: 'Success',
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
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
    const tech = await Tech.findOne({ name: techName });

    if (!tech) {
      throw new Error('Not Found');
    }

    res.status(200).json({
      status: 'Success',
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
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
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
      status: 'Success',
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
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
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
const Lang = require('../models/Lang');

exports.createLang = async (req, res) => {
  try {
    const newLang = await Lang.create(req.body);

    res.status(201).json({
      status: 'Success',
      message: 'Resource created successfully!',
      data: { newLang },
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

exports.getAllLangs = async (req, res) => {
  try {
    const langs = await Lang.find();

    if (langs.length === 0) {
      throw new Error('Not Found');
    }

    res.status(200).json({
      status: 'Success',
      data: { langs },
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

exports.getLang = async (req, res) => {
  try {
    const langName = req.params.name
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
    const lang = await Lang.findOne({ name: langName });

    if (!lang) {
      throw new Error('Not Found');
    }

    res.status(200).json({
      status: 'Success',
      data: { lang },
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

exports.updateLang = async (req, res) => {
  try {
    const langName = req.params.name
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
    const updatedlang = await Lang.findOneAndUpdate(
      { langName },
      { $set: req.body },
      { new: true },
    );

    if (!updatedlang) {
      throw new Error('Not Found');
    }

    res.status(200).json({
      status: 'Success',
      message: 'Resource updated successfully!',
      data: { updatedlang },
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

exports.deleteLang = async (req, res) => {
  try {
    const langName = req.params.name
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
    const deletedlang = await Lang.findOneAndDelete({ langName });

    if (!deletedlang) {
      throw new Error('Not Found');
    }

    res.status(200).json({
      status: 'success',
      message: 'Resource deleted successfully!',
      data: { deletedlang },
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

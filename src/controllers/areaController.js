const Area = require('../models/Area');

exports.createArea = async (req, res) => {
  try {
    const newArea = await Area.create(req.body);

    res.status(201).json({
      status: 'Success',
      message: 'Resource created successfully!',
      data: { newArea },
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

exports.getAllAreas = async (req, res) => {
  try {
    const areas = await Area.find();

    if (areas.length === 0) {
      throw new Error('Not Found');
    }

    res.status(200).json({
      status: 'Success',
      data: { areas },
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

exports.getArea = async (req, res) => {
  try {
    const areaName = req.params.name
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
    const area = await Area.findOne({ name: areaName });

    if (!area) {
      throw new Error('Not Found');
    }

    res.status(200).json({
      status: 'Success',
      data: { area },
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

exports.updateArea = async (req, res) => {
  try {
    const areaName = req.params.name
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
    const updatedArea = await Area.findOneAndUpdate(
      { areaName },
      { $set: req.body },
      { new: true },
    );

    if (!updatedArea) {
      throw new Error('Not Found');
    }

    res.status(200).json({
      status: 'Success',
      message: 'Resource updated successfully!',
      data: { updatedArea },
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

exports.deleteArea = async (req, res) => {
  try {
    const areaName = req.params.name
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
    const deletedArea = await Area.findOneAndDelete({ areaName });

    if (!deletedArea) {
      throw new Error('Not Found');
    }

    res.status(200).json({
      status: 'success',
      message: 'Resource deleted successfully!',
      data: { deletedArea },
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

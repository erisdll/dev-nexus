const Area = require('../models/Area');
const { capitalizeName } = require('../utils/capitalizer');

exports.createArea = async (req, res) => {
  try {
    const {
      name,
      description,
      imgURL,
      keyFeatures,
      useCases,
      popularity,
      langs,
      techs,
    } = req.body

    const newArea = new Area({
      name,
      description,
      imgURL,
      keyFeatures,
      useCases,
      popularity,
      langs,
      techs,
    })

    const savedArea = await newArea.save();

    return res.status(201).json({
      status: 'success',
      message: 'Resource created successfully!',
      data: { newArea: savedArea },
    });
  } catch (err) {
    return res.status(500).json({
      status: 'fail',
      message: 'Internal server error',
    });
  }
};

exports.getAllAreas = async (req, res) => {
  try {
    const areas = await Area.find();

    if (areas.length === 0) {
      throw new Error('Not Found');
    }

    const areasList = areas.map(area => ({
      name: area.name,
      description: area.description,
      imgURL: area.imgURL
    }));

    return res.status(200).json({
      status: 'success',
      data: { areasList },
    });
  } catch (err) {
    if (err.message === 'Not Found') {
      return res.status(404).json({
        status: 'fail',
        message: 'Resource not found!',
      });
    } else {
      return res.status(500).json({
        status: 'fail',
        message: 'Internal server error',
      });
    }
  }
};

exports.getArea = async (req, res) => {
  try {
    const areaName = capitalizeName(req.params.name);
    const area = await Area.findOne({ name: areaName })
      .populate('langs')
      .populate('techs');

    if (!area) {
      throw new Error('Not Found');
    }

    return res.status(200).json({
      status: 'success',
      data: { area },
    });
  } catch (err) {
    if (err.message === 'Not Found') {
      return res.status(404).json({
        status: 'fail',
        message: 'Resource not found!',
      });
    } else {
      return res.status(500).json({
        status: 'fail',
        message: 'Internal server error',
      });
    }
  }
};

exports.updateArea = async (req, res) => {
  try {
    const areaName = capitalizeName(req.params.name);
    const updatedArea = await Area.findOneAndUpdate(
      { areaName },
      { $set: req.body },
      { new: true },
    );

    if (!updatedArea) {
      throw new Error('Not Found');
    }

    return res.status(200).json({
      status: 'success',
      message: 'Resource updated successfully!',
      data: { updatedArea },
    });
  } catch (err) {
    if (err.name === 'ValidationError') {
      return res.status(400).json({
        status: 'fail',
        message: 'Bad request!'
      });
    } else if (err.message === 'Not Found') {
      return res.status(404).json({
        status: 'fail',
        message: 'Resource not found!',
      });
    } else {
      return res.status(500).json({
        status: 'fail',
        message: 'Internal server error',
      });
    }
  }
};

exports.deleteArea = async (req, res) => {
  try {
    const areaName = capitalizeName(req.params.name);
    const deletedArea = await Area.findOneAndDelete({ areaName });

    if (!deletedArea) {
      throw new Error('Not Found');
    }

    return res.status(200).json({
      status: 'success',
      message: 'Resource deleted successfully!',
    });
  } catch (err) {
    if (err.message === 'Not Found') {
      return res.status(404).json({
        status: 'fail',
        message: 'Error! Resource was not found or has already been deleted!',
      });
    } else {
      return res.status(500).json({
        status: 'fail',
        message: 'Internal server error',
      });
    }
  }
};

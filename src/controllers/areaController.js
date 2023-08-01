const Area = require('../models/Area');
const { capitalizeName } = require('../utils/capitalizer');
const AppError = require('../utils/appError');

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
    return next(err)
  }
};

exports.getAllAreas = async (req, res) => {
  try {
    const areas = await Area.find();

    if (areas.length === 0) {
      throw new AppError('Resource not found!', 404);
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
    next(err);
  }
};

exports.getArea = async (req, res) => {
  try {
    const areaName = capitalizeName(req.params.name);
    const area = await Area.findOne({ name: areaName })
      .populate('langs')
      .populate('techs');

    if (!area) {
      throw new AppError('Resource not found!', 404);
    }

    return res.status(200).json({
      status: 'success',
      data: { area },
    });
  } catch (err) {
    next(err);
  }
};

exports.updateArea = async (req, res) => {
  try {
    const areaName = capitalizeName(req.params.name);
    const updatedArea = await Area.findOneAndUpdate(
      { name: areaName },
      { $set: req.body },
      { new: true },
    );

    if (!updatedArea) {
      throw new AppError('Resource not found!', 404);
    }

    return res.status(200).json({
      status: 'success',
      message: 'Resource updated successfully!',
      data: { updatedArea },
    });
  } catch (err) {
    next(err);
  }
};

exports.deleteArea = async (req, res) => {
  try {
    const areaName = capitalizeName(req.params.name);
    const deletedArea = await Area.findOneAndDelete({ name: areaName });

    if (!deletedArea) {
      throw new AppError('Resource does not exist or has already been deleted!', 404);
    }

    return res.status(200).json({
      status: 'success',
      message: 'Resource deleted successfully!',
    });
  } catch (err) {
    next(err);
  }
};

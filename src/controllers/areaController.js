const Area = require('../models/Area');
const AppError = require('../utils/appError');
const APIfeatures = require('../utils/apiFeatures')
const { capitalizeName } = require('../utils/capitalizer');

exports.aliasTopAreas = (req, res, next) => {
  req.query.limit = '5';
  req.query.sort = '-popularity';
  req.query.fields = 'name, popularity, description';
  next();
}

exports.createArea = async (req, res, next) => {
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
    } = req.body;

    const newArea = new Area({
      name,
      description,
      imgURL,
      keyFeatures,
      useCases,
      popularity,
      langs,
      techs,
    });

    const savedArea = await newArea.save();

    return res.status(201).json({
      status: 'success',
      message: 'Resource created successfully!',
      data: { newArea: savedArea },
    });
  } catch (err) {
    return next(err);
  }
};

exports.getAllAreas = async (req, res, next) => {
  try {
    const features = new APIfeatures(Area.find(), req.query)
      .filter()
      .sort(req)
      .limitFields(req)
      .paginate();
    
    const areas = await features.query;

    return res.status(200).json({
      status: 'success',
      results: areas.length,
      data: { areas },
    });
  } catch (err) {
    console.log(err)
  }
};

exports.getArea = async (req, res, next) => {
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

exports.updateArea = async (req, res, next) => {
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

exports.deleteArea = async (req, res, next) => {
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

exports.getAreaStats = async (req, res, next) => {
  try {
    const stats = Area.aggregate([
      {
        $match: { popularityAvarage: { $gte: 4.5 } }
      },
      {
        $group: {
          _id: null,
          numAreas: { $sum: 1},
          avgPopularity: { $avg: '$popularityAvarage' },

        }
      }
    ])

  } catch (err) {
    next(err)
  }
}
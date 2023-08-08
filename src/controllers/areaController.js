const Area = require('../models/Area');
const AppError = require('../utils/appError');
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
    return next(err)
  }
};

exports.getAllAreas = async (req, res) => {
  try {
    const queryObj = { ...req.query };
    const excludedFields = ['page', 'sort', 'limit', 'field'];
    excludedFields.forEach(field => delete queryObj[field]);
    
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);

    let query = Area.find(JSON.parse(queryStr));

    if (req.query.sort) {
      const sortBy = req.query.sort.split(',').join(' ')
      query = query.sort(sortBy)
    } else {
      query = query.sort('-createdAt')
    }

    if (req.query.fields) {
      const fields = req.query.fields.split(',').join(' ')
      query = query.select(fields)
    } else {
      query = query.select('-__v')
    }

    const areas = await query;
    
    // if (areas.length === 0) {
    //   throw new AppError('Resource not found!', 404);
    // }
    //
    // const areasList = areas.map(area => ({
    //   name: area.name,
    //   description: area.description,
    //   imgURL: area.imgURL
    // }));

    return res.status(200).json({
      status: 'success',
      data: { areas },
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

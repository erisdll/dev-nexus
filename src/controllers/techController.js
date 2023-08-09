const Tech = require('../models/Tech');
const AppError = require('../utils/appError');
const { capitalizeName } = require('../utils/capitalizer')

exports.createTech = async (req, res, next) => {
  try {
    const {
      name,
      description,
      imgURL,
      keyFeatures,
      advantages,
      disadvantages,
      popularity,
      Techs,
      areas,
    } = req.body

    const newTech = new Tech({
      name,
      description,
      imgURL,
      keyFeatures,
      advantages,
      disadvantages,
      popularity,
      Techs,
      areas,
    })

    const savedTech = await newTech.save();

    return res.status(201).json({
      status: 'success',
      message: 'Resource created successfully!',
      data: { savedTech },
    });
  } catch (err) {
    next(err);
  }
};

exports.getAllTechs = async (req, res, next) => {
  try {
    const queryObj = { ...req.query };
    const excludedFields = ['page', 'sort', 'limit', 'field'];
    excludedFields.forEach(field => delete queryObj[field]);

    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);

    let query = Tech.find(JSON.parse(queryStr));

    if (req.query.sort) {
      const sortBy = req.query.sort.split(',').join(' ');
      query = query.sort(sortBy);
    } else {
      query = query.sort('-createdAt');
    }

    if (req.query.fields) {
      const fields = req.query.fields.split(',').join(' ');
      query = query.select(fields);
    } else {
      query = query.select('-__v');
    }

    const page = req.query.page * 1 || 1;
    const limit = req.query.limit * 1 || 20;
    const skip = (page - 1) * limit;
    query = query.skip(skip).limit(limit);

    if (req.query.page) {
      const numTechs = await Tech.countDocuments();
      if (skip >= numTechs) throw new Error('This page does not exist!');
    }

    const techs = await query;

    return res.status(200).json({
      status: 'success',
      data: { techs },
    });
  } catch (err) {
    next(err);
  }
};

exports.getTech = async (req, res, next) => {
  try {
    const techName = capitalizeName(req.params.name);
    const tech = await Tech.findOne({ name: techName })
      .populate('Techs')
      .populate('areas');

    if (!tech) {
      throw new AppError('Resource not found!', 404);
    }

    return res.status(200).json({
      status: 'success',
      data: { tech },
    });
  } catch (err) {
    next(err);
  }
};

exports.updateTech = async (req, res, next) => {
  try {
    const techName = capitalizeName(req.params.name);
    const updatedtech = await Tech.findOneAndUpdate(
      { name: techName },
      { $set: req.body },
      { new: true },
    );

    if (!updatedtech) {
      throw new AppError('Resource not found!', 404);
    }

    return res.status(200).json({
      status: 'success',
      message: 'Resource updated successfully!',
      data: { updatedtech },
    });
  } catch (err) {
    next(err);
  }
};

exports.deleteTech = async (req, res, next) => {
  try {
    const techName = capitalizeName(req.params.name);
    const deletedtech = await Tech.findOneAndDelete({ name: techName });

    if (!deletedtech) {
      throw new AppError('Resource not found!', 404);
    }

    return res.status(200).json({
      status: 'success',
      message: `Resource named ${deletedtech.name} was deleted successfully!`,
    });
  } catch (err) {
    next(err);
  }
};
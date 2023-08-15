const Lang = require('../models/Lang');
const AppError = require('../utils/appError');
const APIfeatures = require('../utils/apiFeatures');
const { capitalizeName } = require('../utils/capitalizer');

exports.aliasTopLangs = (req, res, next) => {
  req.query.limit = '5';
  req.query.sort = '-popularity';
  req.query.fields = 'name, keyFeatures, advantages, popularity';
  next();
};

exports.createLang = async (req, res, next) => {
  try {
    const {
      name,
      description,
      imgURL,
      keyFeatures,
      advantages,
      disadvantages,
      designedBy,
      yearCreated,
      popularity,
      areas,
      techs,
    } = req.body

    const newLang = new Lang({
      name,
      description,
      imgURL,
      keyFeatures,
      advantages,
      disadvantages,
      designedBy,
      yearCreated,
      popularity,
      areas,
      techs,
    })

    const savedLang = await newLang.save();

    return res.status(201).json({
      status: 'success',
      message: 'Resource created successfully!',
      data: { savedLang },
    });
  } catch (err) {
    next(err);
  }
};

exports.getAllLangs = async (req, res, next) => {
  try {
    const features = new APIfeatures(Lang.find(), req.query)
      .filter()
      .sort(req)
      .limitFields(req)
      .paginate();

    const langs = await features.query;

    return res.status(200).json({
      status: 'success',
      results: langs.length,
      data: { langs },
    });
  } catch (err) {
    next(err);
  }
};

exports.getLang = async (req, res, next) => {
  try {
    const langName = capitalizeName(req.params.name);
    const lang = await Lang.findOne({ name: langName })
      .populate('areas')
      .populate('techs');

    if (!lang) {
      throw new AppError('Resource not found!', 404);
    }

    return res.status(200).json({
      status: 'success',
      data: { lang },
    });
  } catch (err) {
    next(err);
  }
};

exports.updateLang = async (req, res, next) => {
  try {
    const langName = capitalizeName(req.params.name);
    const updatedlang = await Lang.findOneAndUpdate(
      { name: langName },
      { $set: req.body },
      { new: true },
    );

    if (!updatedlang) {
      throw new AppError('Resource not found!', 404);
    }

    return res.status(200).json({
      status: 'success',
      message: 'Resource updated successfully!',
      data: { updatedlang },
    });
  } catch (err) {
    next(err);
  }
};

exports.deleteLang = async (req, res, next) => {
  try {
    const langName = capitalizeName(req.params.name);
    const deletedlang = await Lang.findOneAndDelete({ name: langName });

    if (!deletedlang) {
      throw new AppError('Resource not found!', 404);
    }

    return res.status(200).json({
      status: 'success',
      message: `Resource named ${deletedlang.name} was deleted successfully!`,
    });
  } catch (err) {
    next(err);
  }
};

// Other Operations

exports.getLangsByFeatures = async (req, res, next) => {
  try {
    const { tags } = req.query;

    if (!tags || typeof tags !== 'string') {
      throw new AppError('Invalid request! The "tags" parameter is empty.', 400)
    }

    // This splits the 'tags' string into an array, replaces the '+' separator with '_'.
    const featureArray = tags.split('+').map((tag) => tag.replace(/-/g, '_'));

    // Uses the MongoDB '$in' operator to find docs that have at least one matching value
    const matchingLangs = await Lang.find({
      keyFeatures: { $in: featureArray },
    })

    res.status(200).json({
      status: 'success',
      data: {
        languages: matchingLangs,
      },
    });
  } catch (err) {
    next(err);
  }
};

exports.getLangStats = async (req, res, next) => {
  try {
    const stats = Lang.aggregate([
      {
        $match: { popularityAvarage: { $gte: 4.5 } },
      },
      {
        $group: {
          _id: null,
          numAreas: { $sum: 1 },
          avgPopularity: { $avg: '$popularityAvarage' },
        },
      },
    ]);
  } catch (err) {
    next(err);
  }
};
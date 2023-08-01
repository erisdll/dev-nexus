const Lang = require('../models/Lang');
const { capitalizeName } = require('../utils/capitalizer');
const AppError = require('../utils/appError');

exports.createLang = async (req, res) => {
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

exports.getAllLangs = async (req, res) => {
  try {
    const langs = await Lang.find();

    if (langs.length === 0) {
      throw new AppError('Resource not found!', 404);
    }

    const langsList = langs.map(lang => ({
      name: lang.name,
      description: lang.description,
      imgURL: lang.imgURL
    }));

    return res.status(200).json({
      status: 'success',
      data: { langsList },
    });
  } catch (err) {
    next(err);
  }
};

exports.getLang = async (req, res) => {
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

exports.updateLang = async (req, res) => {
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

exports.deleteLang = async (req, res) => {
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

exports.getLangsByFeatures = async (req, res) => {
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

const Tech = require('../models/Tech');
const AppError = require('../utils/appError');
const APIfeatures = require('../utils/apiFeatures');
const { capitalizeName } = require('../utils/capitalizer')

exports.aliasTopTechs = (req, res, next) => {
  req.query.limit = '5';
  req.query.sort = 'popularity';
  req.query.fields = 'name, keyFeatures, advantages, popularity';
  next();
};


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
    const features = new APIfeatures(Tech.find(), req.query)
      .filter()
      .sort(req)
      .limitFields(req)
      .paginate();

    const techs = await features.query;

    return res.status(200).json({
      status: 'success',
      results: techs.length,
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

exports.getTechStats = async (req, res, ) => {
  try {
    const stats = Tech.aggregate([
      {
        $match: { popularityAvarage: { $gte: 4.5 } },
      },
      {
        $group: {
          _id: null,
          numTechs: { $sum: 1 },
          avgPopularity: { $avg: '$popularityAvarage' },
        },
      },
    ]);
  } catch (err) {
    next(err);
  }
};
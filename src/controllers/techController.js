const Tech = require('../models/Tech');
const AppError = require('../utils/appError');
const { capitalizeName } = require('../utils/capitalizer')

exports.createTech = async (req, res) => {
  try {
    const {
      name,
      description,
      imgURL,
      keyFeatures,
      advantages,
      disadvantages,
      popularity,
      langs,
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
      langs,
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

exports.getAllTechs = async (req, res) => {
  try {
    const techs = await Tech.find();

    if (techs.length === 0) {
      throw new AppError('Resource not found!', 404);
    }

    const techsList = techs.map(tech => ({
      name: tech.name,
      description: tech.description,
      imgURL: tech.imgURL
    }));

    return res.status(200).json({
      status: 'success',
      data: { techsList },
    });
  } catch (err) {
    next(err);
  }
};

exports.getTech = async (req, res) => {
  try {
    const techName = capitalizeName(req.params.name);
    const tech = await Tech.findOne({ name: techName })
      .populate('langs')
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

exports.updateTech = async (req, res) => {
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

exports.deleteTech = async (req, res) => {
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
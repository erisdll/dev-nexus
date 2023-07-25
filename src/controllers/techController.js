const Tech = require('../models/Tech');
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
    return res.status(500).json({
      status: 'fail',
      message: 'Internal server error',
    });
  }
};

exports.getAllTechs = async (req, res) => {
  try {
    const techs = await Tech.find();

    if (techs.length === 0) {
      throw new Error('Not Found');
    }

    const techsList = langs.map(tech => ({
      name: tech.name,
      description: tech.description,
      imgURL: tech.imgURL
    }));

    return res.status(200).json({
      status: 'success',
      data: { techsList },
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

exports.getTech = async (req, res) => {
  try {
    const techName = capitalizeName(req.params.name);
    const tech = await Tech.findOne({ name: techName })
      .populate('langs')
      .populate('areas');

    if (!tech) {
      throw new Error('Not Found');
    }

    return res.status(200).json({
      status: 'success',
      data: { tech },
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

exports.updateTech = async (req, res) => {
  try {
    const techName = capitalizeName(req.params.name);
    const updatedtech = await Tech.findOneAndUpdate(
      { techName },
      { $set: req.body },
      { new: true },
    );

    if (!updatedtech) {
      throw new Error('Not Found');
    }

    return res.status(200).json({
      status: 'success',
      message: 'Resource updated successfully!',
      data: { updatedtech },
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

exports.deleteTech = async (req, res) => {
  try {
    const techName = capitalizeName(req.params.name);
    const deletedtech = await Tech.findOneAndDelete({ techName });

    if (!deletedtech) {
      throw new Error('Not Found');
    }

    return res.status(200).json({
      status: 'success',
      message: `Resource named ${deletedtech.name} was deleted successfully!`,
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
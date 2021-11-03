const Car = require("./cars-model");
const vinValidator = require("vin-validator");
const db = require("../../data/db-config.js");

const checkCarId = async (req, res, next) => {
  try {
    const id = req.params.id;
    const check = await Car.getById(id);
    if (!check) {
      res.status(404).json({ message: `car with id ${id} is not found` });
    } else {
      next();
    }
  } catch (error) {
    next(error);
  }
};

const checkCarPayload = (req, res, next) => {
  const { vin, make, model, mileage } = req.body;
  if (!vin) {
    res.status(400).json({ message: "vin is missing" });
  } else if (!make) {
    res.status(400).json({ message: "make is missing" });
  } else if (!model) {
    res.status(400).json({ message: "model is missing" });
  } else if (!mileage) {
    res.status(400).json({ message: "mileage is missing" });
  } else {
    next();
  }
};

const checkVinNumberValid = (req, res, next) => {
  const vin = req.body.vin;
  const check = vinValidator.validate(vin);
  if (!check) {
    res.status(400).json({ message: `vin ${vin} is invalid` });
  } else {
    next();
  }
};

const checkVinNumberUnique = async (req, res, next) => {
  const vin = req.body.vin;
  const check = await db("cars").where({ vin }).first();
  if (check) {
    res.status(400).json({ message: `vin ${vin} already exists` });
  } else {
    next();
  }
};

module.exports = {
  checkCarId,
  checkCarPayload,
  checkVinNumberValid,
  checkVinNumberUnique,
};

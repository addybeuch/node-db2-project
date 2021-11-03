const db = require("../../data/db-config.js");

const getAll = () => {
  return db("cars");
};

const getById = (id) => {
  return db("cars").where({ id }).first();
};

const create = async (car) => {
  const [id] = await db("cars").insert(car, [
    "id",
    "vin",
    "make",
    "model",
    "mileage",
    "title",
    "transmission",
  ]);
  const post = await getById(id);
  return post;
};

module.exports = {
  getAll,
  getById,
  create,
};

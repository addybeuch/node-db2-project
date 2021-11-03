exports.up = async function (knex) {
  await knex.schema.createTable("cars", (table) => {
    table.increments("id");
    table.text("vin", 17).unique().notNullable();
    table.text("make").notNullable();
    table.text("model").notNullable();
    table.integer("mileage").notNullable();
    table.text("title").defaultTo(null);
    table.text("transmission").defaultTo(null);
  });
};

exports.down = async function (knex) {
  await knex.schema.dropTableIfExists("cars");
};

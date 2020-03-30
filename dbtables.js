const { Model, knex } = require("./initdb.js");

class Table extends Model {
  static get tableName() {
    return "tablename";
  }
}

module.exports = {
  Model,
  knex,

  Table
};

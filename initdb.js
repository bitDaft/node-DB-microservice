const { Model } = require("objection");
const Knex = require("knex");

const config = require("./config.json");

data = config[config.env];

const knex = Knex(data.dbconfig);

Model.knex(knex);

module.exports = { 
    Model, 
    knex 
};

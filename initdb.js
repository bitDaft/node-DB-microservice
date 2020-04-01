const { Model } = require("objection");
const Knex = require("knex");

let config = require("./config.json");

config = config[config.env];

const knex = Knex(config.dbconfig);

Model.knex(knex);

module.exports = { 
    Model, 
    knex 
};

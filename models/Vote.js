const { Model, DataTypes } = require(`sequelize`);
const sequelize = require(`../config/connection`);
const { truncate } = require("./User");

class Vote extends Model {}

Vote.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: truncate,
    },
    //
  }
)
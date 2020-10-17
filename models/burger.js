module.exports = function(sequelize, DataTypes) {
    const Burger = sequelize.define("burger", {
      name: {type: DataTypes.STRING,allowNull: false},
      devoured: {type: DataTypes.BOOLEAN,allowNull: false}
    });
    return Burger;
  };
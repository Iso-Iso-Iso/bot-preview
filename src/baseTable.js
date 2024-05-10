const { Sequelize } = require("sequelize-typescript");
const { DataTypes } = require("sequelize");

module.exports = {
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.fn("NOW"),
    },
    updatedAt: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.fn("NOW"),
    },
    deletedAt: DataTypes.DATE,
};

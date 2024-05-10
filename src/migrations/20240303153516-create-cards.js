"use strict";

const { DataTypes } = require("sequelize");
const baseTable = require("../baseTable");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface) {
        await queryInterface.createTable("cards", {
            currency: {
                type: DataTypes.ENUM,
                values: ["UAH"],
            },
            name: { type: DataTypes.ENUM, values: ["monobank", "privatbank", "abank"] },
            value: DataTypes.STRING(16),
            ...baseTable,
        });
    },

    async down(queryInterface) {
        await queryInterface.dropTable("cards");
    },
};

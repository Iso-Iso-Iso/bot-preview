"use strict";

const { DataTypes } = require("sequelize");
const baseTable = require("../baseTable");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("matches", {
            type: {
                type: DataTypes.ENUM,
                values: ["DICE"],
            },
            result: DataTypes.INTEGER,
            userId: {
                type: DataTypes.INTEGER.UNSIGNED,
                references: {
                    key: "id",
                    model: "users",
                },
            },
            ...baseTable,
        });
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable("matches");
    },
};

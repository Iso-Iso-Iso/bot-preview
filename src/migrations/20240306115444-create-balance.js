"use strict";

const { DataTypes } = require("sequelize");
const baseTable = require("../baseTable");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface) {
        await queryInterface.createTable("balances", {
            hold: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false, defaultValue: 0 },

            active: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false, defaultValue: 0 },

            withdrawing: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false, defaultValue: 0 },

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

    async down(queryInterface) {
        await queryInterface.dropTable("balances");
    },
};

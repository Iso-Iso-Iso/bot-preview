"use strict";

const { DataTypes } = require("sequelize");

const baseTable = require("../baseTable");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface) {
        await queryInterface.createTable("deposits", {
            cardNumber: DataTypes.STRING(16),

            value: DataTypes.INTEGER.UNSIGNED,

            status: {
                type: DataTypes.ENUM,
                values: ["PROCESSED", "READY", "PENDING", "DENY"],
            },

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
        await queryInterface.dropTable("deposits");
    },
};

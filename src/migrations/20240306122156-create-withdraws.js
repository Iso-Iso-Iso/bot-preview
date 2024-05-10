"use strict";

const { DataTypes } = require("sequelize");
const baseTable = require("../baseTable");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("withdraws", {
            isCrypto: DataTypes.BOOLEAN,

            to: DataTypes.STRING(255),

            network: DataTypes.STRING(255),

            value: DataTypes.INTEGER.UNSIGNED,

            status: {
                type: DataTypes.ENUM,
                values: ["PROCESSED", "READY", "PENDING", "DENY"],
                defaultValue: "PENDING",
            },

            userId: {
                type: DataTypes.INTEGER.UNSIGNED,
                references: {
                    model: "users",
                    key: "id",
                },
            },

            ...baseTable,
        });
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable("withdraws");
    },
};

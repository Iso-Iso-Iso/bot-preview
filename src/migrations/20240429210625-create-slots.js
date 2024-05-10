"use strict";

const { DataTypes } = require("sequelize");
const baseTable = require("../baseTable");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("slots", {
            userId: {
                type: DataTypes.INTEGER.UNSIGNED,
                references: {
                    key: "id",
                    model: "users",
                },
            },
            strategy: {
                type: DataTypes.ENUM,
                values: [
                    "AXE",
                    "GOLD",
                    "CHERRY",
                    "FRUITS",
                    "SLOT_WIN",
                    "CLOSE_AXE",
                    "CLOSE_GOLD",
                    "CLOSE_CHERRY",
                    "CLOSE_FRUITS",
                    "CLOSE_SLOT_WIN",
                    "LOSE",
                ],
            },
            ...baseTable,
        });
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable("slots");
    },
};

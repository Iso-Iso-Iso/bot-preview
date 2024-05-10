"use strict";

const { DataTypes } = require("sequelize");
const baseTable = require("../baseTable");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface) {
        await queryInterface.createTable("users", {
            telegramId: DataTypes.BIGINT.UNSIGNED,
            firstName: DataTypes.STRING(255),
            lastName: DataTypes.STRING(255),
            fullName: DataTypes.STRING(255),
            userName: DataTypes.STRING(255),
            isBot: DataTypes.BOOLEAN,
            languageCode: DataTypes.STRING(24),
            ...baseTable,
        });
    },

    async down(queryInterface) {
        await queryInterface.dropTable("users");
    },
};

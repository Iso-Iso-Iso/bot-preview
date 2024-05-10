"use strict";

const { DataTypes } = require("sequelize");
const baseTable = require("../baseTable");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("invoices", {
            invoiceApiId: {
                type: DataTypes.INTEGER.UNSIGNED,
                unique: true,
                allowNull: false,
            },

            userId: {
                type: DataTypes.INTEGER.UNSIGNED,
                references: {
                    key: "id",
                    model: "users",
                },
            },

            amount: DataTypes.INTEGER.UNSIGNED,

            chatApiId: DataTypes.INTEGER.UNSIGNED,

            status: {
                type: DataTypes.ENUM,
                values: ["WAITING", "PAID", "ERRORED", "DECLINED"],
                defaultValue: "WAITING",
            },
            ...baseTable,
        });
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable("invoices");
    },
};

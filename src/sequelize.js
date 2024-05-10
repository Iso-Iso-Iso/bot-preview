const dotenv = require("dotenv");
const path = require("node:path");

const envPath = {
    development: path.resolve("src", "env", ".env.development"),
    production: path.resolve("src", "env", ".env.production"),
};

dotenv.config({
    path: envPath[process.env.NODE_ENV],
});

module.exports = {
    development: {
        dialect: "mysql",
        host: process.env.DB_HOST,
        port: +process.env.DB_PORT,
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_SCHEMA_NAME,
    },
};

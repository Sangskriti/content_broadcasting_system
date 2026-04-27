const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
    process.env.DB_NAME || 'railway', 
    process.env.DB_USER || 'root', 
    process.env.DB_PASS, 
    {
        host: process.env.DB_HOST,
        port: 46601, 
        dialect: 'mysql',
        logging: false,
        dialectOptions: {
            ssl: {
                rejectUnauthorized: false
            }
        }
    }
);

module.exports = sequelize;
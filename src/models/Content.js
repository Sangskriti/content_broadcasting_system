const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

module.exports = sequelize.define('Content', {
    title: { type: DataTypes.STRING, allowNull: false },
    subject: { type: DataTypes.STRING, allowNull: false },
    file_path: { type: DataTypes.STRING, allowNull: false },
    status: { type: DataTypes.ENUM('uploaded', 'pending', 'approved', 'rejected'), defaultValue: 'pending' },
    rejection_reason: { type: DataTypes.STRING },
    uploaded_by: { type: DataTypes.INTEGER, allowNull: false },
    start_time: { type: DataTypes.DATE },
    end_time: { type: DataTypes.DATE },
    duration: { type: DataTypes.INTEGER, defaultValue: 5 }
});
const {DataTypes} = require('sequelize');
const { db } = require('../database/db');


const Reviews = db.define('reviews', {
    id: {
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        type: DataTypes.INTEGER
    },
    userId:{
        type: DataTypes.INTEGER,
        allowNull: false,
    },

    coment: {
        type: DataTypes.STRING,
        allowNull: false
    },
    restaurantId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    rating: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    status: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    }
});

module.exports = Reviews;

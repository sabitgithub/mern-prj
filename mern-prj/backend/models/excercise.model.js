const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const exerciseSchema = new Schema({
        username: {type: String, required: true,},
        descriptions: {type: String, required: true,},
        duration: {type: String, required: true,},
        date: {type: Date, required: true,},
    },
    {
        timestamps: true,
    });

const Exercise = mongoose.model('Excercise', exerciseSchema);
module.exports = Exercise;
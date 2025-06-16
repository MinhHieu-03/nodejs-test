const mongoose = require('mongoose');
const Schema = require('mongoose').Schema;

const Course = new Schema({
    name: { type: String},
    description: { type: String},
    image: { type: String},
    slug: { type: String},
    videoID: { type: String},
    CreatedAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Course', Course);

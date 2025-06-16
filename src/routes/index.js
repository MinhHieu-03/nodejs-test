// src/routes/index.js
const express = require('express');
const courseRoutes = require('./course');
const CourseController = require('../app/controllers/CourseController');
const authRoutes = require('./auth');


module.exports = function (app) {
    // Middleware to handle JSON requests
    app.use('/auth', authRoutes); 
    app.use('/courses', courseRoutes); 
    app.get('/', CourseController.index);
};

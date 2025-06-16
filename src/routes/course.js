// src/routes/course.js
const express = require('express');
const CourseController = require('../app/controllers/CourseController');
const router = express.Router();

router.get('/create', CourseController.create);
router.post('/store', CourseController.store); 
router.get('/edit/:slug', CourseController.edit);
router.put('/update/:slug', CourseController.update);
router.delete('/delete/:slug', CourseController.delete);
router.get('/search', CourseController.search);  
router.get('/:slug', CourseController.show);     

module.exports = router;

const express = require('express');
const router = express.Router();
const Course = require('../models/Course');

// GET /api/courses
router.get('/courses', async (req, res) => {
  try {
    const courses = await Course.find().lean(); // dùng .lean() để trả về object thường
    res.json(courses); // trả JSON cho API
  } catch (err) {
    res.status(500).json({ error: 'Lỗi server khi lấy danh sách khóa học' });
  }
});

module.exports = router;

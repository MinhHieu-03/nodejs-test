const express = require('express');
const router = express.Router();
const Course = require('../models/Course');
const users = require('../models/User'); // Giả sử bạn có một file users.js chứa dữ liệu người dùng
const { useResolvedPath } = require('react-router-dom');
const User = require('../models/User');

// GET /api/courses
router.get('/courses', async (req, res) => {
  try {
    const courses = await Course.find().lean(); // dùng .lean() để trả về object thường
    res.json(courses); // trả JSON cho API
  } catch (err) {
    res.status(500).json({ error: 'Lỗi server khi lấy danh sách khóa học' });
  }
});

router.get('/users', async (req, res) => {
  try {
    const users = await User.find().lean(); // dùng .lean() để trả về object thường
    res.json(users); // trả JSON cho API
  } catch (err) {
    res.status(500).json({ error: 'Lỗi server khi lấy danh sách người dùng' });
  }
})

module.exports = router;

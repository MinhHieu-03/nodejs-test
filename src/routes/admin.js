const express = require('express');
const router = express.Router();
const requireAdmin = require('../middleware/requireAdmin');
router.get('/dashboard', requireAdmin, (req, res) => {
  res.send('Trang quản trị admin');
});

module.exports = router;

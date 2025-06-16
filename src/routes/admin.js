const express = require('express');
const router = express.Router();
const AdminController = require('../app/controllers/AdminController');
const requireAdmin = require('../middleware/requireAdmin');

router.get('/dashboard', requireAdmin, AdminController.dashboard);

module.exports = router;

const express = require('express');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();
const {
  registerUser,
  loginUser,
  getUser,
} = require('../controller/userControllers');
router.route('/').post(registerUser);
router.route('/login').post(loginUser);
// router.route('/id').get(getUser);
router.get('/id', protect, getUser);

module.exports = router;

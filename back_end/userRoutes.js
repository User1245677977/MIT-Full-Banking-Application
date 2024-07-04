const express = require('express');
const { authUser, registerUser, getUserProfile } = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/login', authUser);
router.route('/profile').get(protect, getUserProfile);
router.route('/').post(registerUser);

module.exports = router;

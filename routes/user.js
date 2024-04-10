const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authenticate = require('../middleware/authMiddleware');

router.post('/update',authenticate, userController.updateUser);
router.post('/changeEmail',authenticate, userController.changeEmail);
router.post('/resendConfirmationEmail',authenticate, userController.resendConfirmationEmail);

module.exports = router;

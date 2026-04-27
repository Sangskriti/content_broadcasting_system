const express = require('express');
const router = express.Router();
const contentCtrl = require('../controllers/contentController');
const { verifyToken, isPrincipal, isTeacher } = require('../middlewares/authMiddleware');
const upload = require('../utils/upload');
const authCtrl = require('../controllers/authController');

router.post('/register', authCtrl.register);
router.post('/login', authCtrl.login);
router.post('/upload', verifyToken, isTeacher, upload.single('file'), contentCtrl.uploadContent);
router.patch('/review/:id', verifyToken, isPrincipal, contentCtrl.reviewContent);
router.get('/live/:teacherId', contentCtrl.getLiveContent);

module.exports = router;
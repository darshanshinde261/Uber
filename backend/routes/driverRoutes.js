const express = require('express');
const router = express.Router();
const driverController = require('../controllers/driverController');
const {body} = require('express-validator')
const authMiddleware = require('../middlewares/auth');

router.post('/register',[
    body('email').isEmail().withMessage('Invalid Email'),
    body('fullname.firstname').isLength({min:3}).withMessage('first name must be at least 3 characters long'),
    body('password').isLength({min:6}).withMessage('password must be at least 6 characters long'),
    body('vehicle.color').isLength({min:3}).withMessage('color must be at least 3 characters long'),
    body('vehicle.plate').isLength({min:3}).withMessage('plate must be at least 3 characters long'),
    body('vehicle.capacity').isLength({min:1}).withMessage('capa must be at least 1 characters long'),
    body('vehicle.vehicleType').isIn(['car','motorcycle','auto']).withMessage('Invalid type of vehicle')
    ],
    driverController.registerDriver
);

router.post('/login',[
    body('email').isEmail().withMessage('Invalid Email'),
    body('password').isLength({min:6}).withMessage('password must be at least 6 characters long'),
    ],
    driverController.loginDriver
);
router.get('/profile',authMiddleware.authDriver, driverController.getDriverProfile);
router.get('/logout', authMiddleware.authDriver, userController.logoutDriver);

module.exports = router;
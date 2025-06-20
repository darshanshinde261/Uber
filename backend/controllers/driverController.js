const Driver = require('../models/driverModel');
const driverService = require('../services/driverService');
const {validationResult} = require('express-validator')
const BlackListToken = require('../models/blackListTokenModel');

module.exports.registerCaptain = async(req,res,next) =>{
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
    
    const { fullname, email, password,vehicle } = req.body;
    
    const isDriver = await Driver.findOne({email});
    if(isDriver){
        return res.status(400).json({Message:"already exits"});
    }
    const hashPassword = await Driver.hashPassword(password);
    
    const driver = await driverService.createUser({
        firstname:fullname.firstname,
        lastname:fullname.lastname,
        email,
        password: hashPassword,
        color:vehicle.color,
        capacity:vehicle.capacity,
        plate:vehicle.plate,
        vehicleType:vehicle.vehicleType,
    });

    const token = driver.generateToken();

    res.status(201).json({token,driver})
}

module.exports.loginDriver = async(req,res,next) =>{
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    };
    const { email, password } = req.body;
    const driver = await Driver.findOne({email}).select('+password');
    if(!driver) {
        return res.status(401).json({message: 'Invalid email or password'});
    }
    const isMatch = await driver.comparePassword(password);

    if(!isMatch) {
        return res.status(401).json({message: 'Invalid email or password'});
    }

    const token = driver.generateAuthToken();

    res.cookie('token', token, {
        httpOnly: true,
    });
    res.status(200).json({
        driver,
        token
    });
}


module.exports.getDriverProfile = async(req,res,next) =>{
    res.status(200).json(req.driver);
}

module.exports.logoutDriver = async(req,res,next) =>{
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];

    await BlackListToken.create({token});
    res.clearCookie('token');

    res.status(200).json({message:'log out successfully'});
}
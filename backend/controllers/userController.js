const User = require('../models/userModel');
const userService = require('../services/userService');
const { validationResult } = require('express-validator');
const BlackListToken = require('../models/blackListTokenModel');

module.exports.registerUser = async(req,res,next) =>{
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { fullname, email, password } = req.body;

    const isUser = await User.findOne({email});
    if(isUser){
        return res.status(400).json({Message:"already exits"});
    }
    const hashPassword = await User.hashPassword(password);

    const user = await userService.createUser({
        firstname:fullname.firstname,
        lastname:fullname.lastname,
        email,
        password: hashPassword
    });

    const token = user.generateAuthToken();
    res.status(201).json({
        user,
        token
    });
}

module.exports.loginUser = async(req,res,next) =>{
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    };
    const { email, password } = req.body;
    const user = await User.findOne({email}).select('+password');
    if(!user) {
        return res.status(401).json({message: 'Invalid email or password'});
    }
    const isMatch = await user.comparePassword(password);

    if(!isMatch) {
        return res.status(401).json({message: 'Invalid email or password'});
    }

    const token = user.generateAuthToken();

    res.cookie('token', token, {
        httpOnly: true,
    });
    res.status(200).json({
        user,
        token
    });
}

module.exports.getUserProfile = async(req,res,next) =>{
    res.status(200).json(req.user);
}

module.exports.logoutUser = async(req,res,next) =>{
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];

    await BlackListToken.create({token});
    res.clearCookie('token');

    res.status(200).json({message:'log out successfully'});
}
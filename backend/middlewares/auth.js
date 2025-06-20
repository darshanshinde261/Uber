const User = require('../models/userModel');
const Driver = require('../models/driverModel')
const jwt = require('jsonwebtoken');
const blackListToken = require('../models/blackListTokenModel');


// Middleware to authenticate user
module.exports.authUser = async (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization.authorization?.split(' ')[1];

    if(!token){
        return res.status(401).json({ message: 'Authentication token is missing' });
    }

    const isBlackListed = await blackListToken.findOne({token:token})

    if(isBlackListed) {
        return res.status(401).json({message:'Unauthorized'});
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id);
        if (!user) {
            return res.status(401).json({ message: 'User not found' });
        }
        req.user = user;
        return next();
    }catch (error) {
        return res.status(401).json({ message: 'Invalid authentication token' });
    }
}

module.exports.authDriver = async (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization.authorization?.split(' ')[1];

    if(!token){
        return res.status(401).json({ message: 'Authentication token is missing' });
    }

    const isBlackListed = await blackListToken.findOne({token:token})

    if(isBlackListed) {
        return res.status(401).json({message:'Unauthorized'});
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const driver = await Driver.findById(decoded.id);
        if (!driver) {
            return res.status(401).json({ message: 'User not found' });
        }
        req.driver = driver;
        return next();
    }catch (error) {
        return res.status(401).json({ message: 'Invalid authentication token' });
    }
}
const Driver = require('../models/driverModel');

module.exports.createDriver = async({
    firstname,lastname,email,password,
    color,plate,capacity,vehicleType
}) =>{
    if(!firstname || !email || !password || !color || !vehicleType || !plate || !capacity){
        throw new Error('All Fields are required');
    }

    const driver = Driver.create({
        fullname:{
            firstname,
            lastname
        },
        email,
        password,
        vehicle:{
            color,
            plate,
            capacity,
            vehicleType
        },
    })
    return driver;
}


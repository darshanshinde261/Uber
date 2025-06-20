const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

const driverSchema = new mongoose.Schema({
    fullName:{
        firstName:{
            type:String,
            require:true,
            minlength:[3,'First name must be at least 3 characters long'],
        },
        lastName:{
            type:String,
            minlength:[3,'last name must be at least 3 characters long'],
        }
    },
    email:{
        type:String,
        require:true,
        unique:true,
        lowercase:true,
        minlength:[5,'email must be at least 3 characters long'],
    },
    password:{
        type:String,
        require:true,
        select:false,
    },
    socketId:{
        type:String,
    },
    status:{
        type:String,
        enum:['active','inactive'],
        default:'inactive'
    },
    vehicle:{
        color:{
            type:String,
            require:true,
        },
        plate:{
            type:String,
            require:true
        },
        capacity:{
            type:Number,
            require:true,
            min:[1,'Capacity must be at least 1']
        },
        vehicleType:{
            type:String,
            require:true,
            enum:['car','motorcycle','auto']
        }
    },
    location:{
        lat:{
            type:Number
        },
        long:{
            type:Number
        }
    }
})

driverSchema.methods.generateAuthToken = function() {
    const token = jwt.sign(
        { _id: this._id },
        process.env.JWT_SECRET,
        { expiresIn: '24h' }
    );
    return token;
}

driverSchema.methods.comparePassword = async function (password){
    return await bcrypt.compare(password,this.password);
}

driverSchema.static.hashPassword = async function (password){
    return await bcrypt.hash(password,10);
}

module.exports = mongoose.model('Driver', driverSchema);
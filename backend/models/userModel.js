const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
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
        minlength:[5,'email must be at least 3 characters long'],
    },
    password:{
        type:String,
        require:true,
        select:false,
    },
    socketId:{
        type:String
    }
});

userSchema.methods.generateAuthToken = function() {
    const token = jwt.sign({_id:this._id},process.env.JWT_SECRET);
    return token;
}

userSchema.methods.comparePassword = async function (password){
    return await bcrypt.compare(password,this.password);
}

userSchema.static.hashPassword = async function (password){
    return await bcrypt.hash(password,10);
}

module.exports = mongoose.model('User',userSchema);
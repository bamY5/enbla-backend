const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")
const jwt = require('jsonwebtoken')

const UserModel = new mongoose.Schema({
    name: {
        type: String,
        required: [true,'Please add a name']
    },
    username: {
        type: String,
        required: [true,'Please add a username'],
    },
    phone: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: [true,'Please add a password'],
        minlength: 6,
        select: false
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
    email: {
        type: String,
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?)*(\.\w{2,3})+$/,
            'Please add a valid email'
        ]
    },
    bio: {
        type: String,
        maxlength: 200,
    },
    profile_image_url: {
        type: String,
    },
    birthday: {
        type: String
    },
    social_profile: {
        twitter: {type: String},
        facebook: {type: String},
        instagram: {type: String}
    },
    public_metrics: {
        follower_count: Number,
        following_count: Number,
    },
    verified: {
        type: Boolean,
        default: false,
    } , 
},{timestamps:{created_at: "created_at", modified_at: "modified_at"}})

// Encrypt password using bcrypt
UserModel.pre("save", async function(next){
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password,salt)
})

// JWT token generate
UserModel.methods.signWithJWT = function(){
    return jwt.sign({id: this._id, username: this.username},process.env.JWT_SECRET)
}

// Password match
UserModel.methods.matchPassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password)
}

module.exports = mongoose.model('UserModel',UserModel);
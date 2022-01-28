const mongoose = require("mongoose")

const UserModel = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true
    },
    password: {type: String, required: true},
    location: {
        type: String,
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
        email: {type: String},
        twitter: {type: String},
        facebook: {type: String},
        instagram: {type: String},
        tiktok: {type: String},
    },
    public_metrics: {
        follower_count: Number,
        following_count: Number,
    },
    verified: {
        type: Boolean,
        default: false,
    }    
},{timestamps:{created_at: "created_at", modified_at: "modified_at"}})


module.exports = mongoose.model('UserModel',UserModel);
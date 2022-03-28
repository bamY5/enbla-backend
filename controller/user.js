const User = require('../model/userModel');
const ErrorResponse = require('../util/errorResponse');
const matchUser = require('../util/matchUser');
const isValidateProfile = require('../util/validateProfile');

exports.getUser = async (req,res,next)=>{
    const id = req.params.id;
    const user = await User.findById(id);
    let usr;

    if(!user){
        return next(new ErrorResponse("User not found",400))
    }

    usr = {
        id: user.id,
        name: user.name,
        username: user.username,
        bio: user.bio,
        public_metrics: user.public_metrics,
        profile_img: user.profile_image_url,
        verified: user.verified,
        createdAt: user.createdAt

    }

    res.status(200).json({
        success: true,
        data: usr
    })


    
}

exports.updateUser = async (req,res,next)=>{
    const id = req.params.id;
    const userFields = {};
 
    const {errors, isValid} = isValidateProfile(req.body);

    if(!isValid){
        return next(new ErrorResponse(errors,400))
    }

    if(req.body.name) userFields.name = req.body.name;

    if(req.body.email) userFields.email = req.body.email;

    if(req.body.bio) userFields.bio = req.body.bio;

    // Social profiles
    userFields.social_profile = {};

    if(req.body.twitter) userFields.social_profile.twitter = req.body.twitter;

    if(req.body.facebook) userFields.social_profile.facebook = req.body.facebook;

    if(req.body.instagram) userFields.social_profile.instagram = req.body.instagram;

    const user = await User.findOneAndUpdate({id:id},userFields,{new:true})

    if(!user){
        next(new ErrorResponse("Update Failed",400))
    }

    res.status(200).json({
        success: true,
        data: user
    });
}
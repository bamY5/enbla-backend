const User = require('../model/userModel')
const ErrorResponse = require('../util/errorResponse')
const matchUser = require('../util/matchUser')


exports.getUser = async (req,res,next)=>{
    const id = req.params.id
    const user = await User.findById(id)
    let usr

    if(!user){
        return next(new ErrorResponse("User not found",400))
    }

    if(!matchUser(req,id)){
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
    }else{
        usr = user
    }

    res.status(200).json({
        success: true,
        user: usr
    })


    
}

exports.updateUser = (req,res,next)=>{
    var body = req.body;
    console.log(body);

    res.json({
        success: true
    });

}
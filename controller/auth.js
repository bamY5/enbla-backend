const User = require('../model/userModel')
const ErrorResponse = require('../util/errorResponse')
const validateInput = require('../util/validateRegisterInput')

exports.signin = async(req,res,next)=>{
    const username = req.body.username
    const password = req.body.password
    if(!username || !password){
        next(new ErrorResponse("Please enter username and password",404))
    }

    var user = await User.findOne({username}).select("+password")

    if(!user){
        return next(new ErrorResponse("Invalid Credential", 401))
    }

    // Check if password matches 
    const isMatch = await user.matchPassword(password)
    
    if (!isMatch){
        return next(new ErrorResponse(`Invalid Credential`,401))
    }else{
        const token = await user.signWithJWT()
        res.json({
            success: true,
            token
        })
        
    }
}




exports.register = async (req,res,next)=>{
    data = req.body
    if(!validateInput(data)){
        return next(new ErrorResponse("Invalid input",400))
    }

    obj = {
        name: data.name, 
        username: data.username, 
        phone: data.phone, 
        password: data.password,
        email: data.email || "",
        avatar: data.avatar || "",
        bio: data.bio || "",
        profile_image_url: data.profile_image || "",
        birthday: data.birthday || "",
        social_profile: {
            twitter: data.twitter || "",
            facebook: data.facebook || "",
            instagram: data.instagram || "",
        },
        public_metrics: {
            follower_count: 0,
            following_count: 0
        }
    }



    user = await User.findOne({username: data.username});

    if(user){
        return next(new ErrorResponse("User already exist",400))
    }else{
        newUser = await User.create(obj)
        // Create token
        const token = newUser.signWithJWT();

        res.json({
            success: true,
            token
        })

    }
}


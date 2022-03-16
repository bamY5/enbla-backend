const User = require('../model/userModel')
const ErrorResponse = require('../util/errorResponse')


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
    body = req.body

    user = await User.create({name: body.name, username: body.username, phone: body.phone, password: body.password})

    // Create token
    const token = user.signWithJWT();

    res.json({
        success: true,
        token
    })


}
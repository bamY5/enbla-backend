var fs = require("fs")
const Liemat = require("../model/liematModel")
exports.getLiemat = (req,res,next)=>{
    
    var result = fs.readFileSync("_data/meal.json","utf-8")
    var data = JSON.parse(result)

    res.json({
        success:true,
        data:data
    })
}

exports.createLiemat = async (req,res,next) =>{
    body = req.body
    liemat = {
        creator: body.creator,
        phoneNumber: body.phone,
        location: {coordinates: [body.longitude,body.latitude]},
        time:body.time,
        joiners:[],
        title: body.title,
        description: body.title,
        numberOfJoiners: body.numberOfJoiners
    }
    result = await Liemat.create(liemat)


    res.json({
        success: true,
        data: result
    })
}


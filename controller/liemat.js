var fs = require("fs")

exports.getLiemat = (req,res,next)=>{
    
    var result = fs.readFileSync("_data/meal.json","utf-8")
    var data = JSON.parse(result)

    res.json({
        success:true,
        data:data
    })
}

exports.createLiemat = (req,res,next) =>{
    

    res.json({
        success: true
    })
}


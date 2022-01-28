

exports.getMeal = (req,res,next)=>{

    res.json({
        success: true,
        data: {
            "creator": "enblaUser",
            "text": "delicious meal"
        }
    })
}

exports.createMeal = (req,res,next)=>{

    const body = req.json
    console.log(body);
    
    res.json({
        success: true
    })
}
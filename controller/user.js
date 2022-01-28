

exports.getUser = (req,res,next)=>{

    res.json({
        success: true,
        data: {
            "name": "enbala user",
            "username": "enbalUser"
        }
    });
}

exports.createUser = (req,res,next)=>{
    var body = req.body;
    console.log(body);

    res.json({
        success: true
    });

}
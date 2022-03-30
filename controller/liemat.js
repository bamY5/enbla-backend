var fs = require("fs")
const Liemat = require("../model/liematModel");
const ErrorResponse = require("../util/errorResponse");

exports.getLiemat = async (req,res,next)=>{
    const liemat = await Liemat.find();

    res.json({
        success:true,
        data:liemat
    })
}

exports.createLiemat = async (req,res,next) =>{
    const data = {
        creator: req.user.id,
        phoneNumber: req.user.phone,
        place: req.body.place,
        time:req.body.time,
        joiners:[],
        title: req.body.title,
        description: req.body.description,
        numberOfJoiners: req.body.numberOfJoiners
    }
    const liemat = await Liemat.create(data)

    if(!liemat){
        return next(new ErrorResponse("Operation was unsuccessful"))
    }

    res.json({
        success: true,
        data: liemat
    })
}

exports.joinLiemat = async (req,res,next)=>{
    const id = req.params.id;
    const liemat = await Liemat.findById(id);

    if(!liemat){
        return next(new ErrorResponse("Liemat not found",400))
    }

    const updatedLiemat = await Liemat.findByIdAndUpdate(id,{$push: {joiners: req.user.id}}, {new: true})

    if(!updatedLiemat){
        return next(new ErrorResponse("Server error",500))
    }

    res.status(200).json({
        success: true,
        data: updatedLiemat
    })
}

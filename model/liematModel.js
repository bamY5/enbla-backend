const mongoose = require("mongoose")

const LiematSchema = new mongoose.Schema({
    creator: {type: String,required: true},
    phoneNumber: {type: String,required: true},
    where: {type: "Point", coordinate:{type: [Number],index: "2dsphere", required}},
    when: {type: String, required: true},
    joiners: {
        type: [mongoose.Schema.ObjectId],
        ref:"UserModel",
    },
    title: {type: String, required: true},
    description: {
        type: String,
        maxlength: 200,
    },
    closed: {type: Boolean, default:false},
    numberOfJoiners: {type: Number, required: true}
})

module.exports = mongoose.Schema("Liemat", LiematSchema);
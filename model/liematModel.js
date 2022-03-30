const mongoose = require("mongoose")

const LiematSchema = new mongoose.Schema({
    creator: {
      type: mongoose.Schema.ObjectId,
      ref:"UserModel",
      required: true
    },
    phoneNumber: {type: String,required: true},
    place: {
        type: String,
        maxlength: 50, 
      },
    time: {type: String, required: true},
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

module.exports = mongoose.model("Liemat", LiematSchema);
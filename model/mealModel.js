const mongoose = require("mongoose");

const MealSchema = new mongoose.Schema({
    creator: {
        type: mongoose.Schema.ObjectId,
        required: true
    },
    text: {type: String},
    public_metrices: {
        reply_count: {type: Number},
        like_count: {type: Number},
    },

})

module.exports = mongoose.Schema("Meal", MealSchema);
const mongoose = require("mongoose");
const { Schema } = mongoose;

const reviewSchema = new Schema({
    text: {
        type: String
    },
    rating: {
        type: Number
    },
    date: {
        type: Date,
        default: Date.now()
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    authorname: {
        type: String
    },
    productId: {
        type: Schema.Types.ObjectId,
        ref: "Product"
    },
    // authorImage: {
    //     type: String,
    //     default: ""
    // }
})

module.exports = mongoose.model("Review", reviewSchema);
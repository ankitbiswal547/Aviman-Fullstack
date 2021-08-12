const mongoose = require("mongoose");
const { Schema } = mongoose;

const addressSchema = new Schema({
    country: {
        type: String,
        default: "India",
        required: true
    },
    fullname: {
        type: String,
        required: true
    },
    mobileNumber: {
        type: Number,
        required: [true, "MobileNumber is required is track order."]
    },
    pincode: {
        type: Number,
        required: true
    },
    addressLineOne: {
        type: String,
        required: true
    },
    addressLineTwo: {
        type: String,
        required: true
    },
    landmark: {
        type: String,
    },
    city: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    addresstype: {
        type: String,
        enum: ["Home", "Office"],
        required: true
    }
})

module.exports = mongoose.model("Address", addressSchema);
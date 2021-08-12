const express = require("express");
const router = express.Router();
const passport = require("passport");
const User = require("../models/user");
const catchAsync = require("../utils/catchAsync");
const ExpressError = require("../utils/ExpressError");
const Address = require("../models/address");
// const Joi = require("joi");
const { Joi } = require("../utils/joiWrapper");
const { isLoggedIn, isUserPageOwner } = require("../middlewares");


// view all
router.get("/user/:id/addresses", catchAsync(async (req, res, next) => {
    const addresses = await Address.find({});
    res.render("user/address", { addresses });
}))


// add a new address
// router.get("user/:id/addresses/new", (req, res) => {
//     res.render("user/addressform");
// })

// adding a new address
router.post("/user/:id/addresses", isLoggedIn, isUserPageOwner, catchAsync(async (req, res, next) => {
    const addressSchemaJoi = Joi.object({
        country: Joi.string().required().escapeHTML(),
        fullname: Joi.string().required().escapeHTML(),
        mobileNumber: Joi.number().required().min(0),
        pincode: Joi.number().required().min(0),
        addressLineOne: Joi.string().required().escapeHTML(),
        addressLineTwo: Joi.string().required().escapeHTML(),
        city: Joi.string().required().escapeHTML(),
        state: Joi.string().required().escapeHTML(),
        addresstype: Joi.string().valid("Home", "Office").required().escapeHTML()
    })

    const { country = "India", fullname, mobileNumber, pincode, addressLineOne, addressLineTwo, landmark, city, state, addresstype } = req.body;
    const newAddress = {
        country,
        fullname,
        mobileNumber,
        pincode,
        addressLineOne,
        addressLineTwo,
        city,
        state,
        addresstype
    }


    const { error } = addressSchemaJoi.validate(newAddress);

    if (error) {
        const msg = error.details.map(el => el.message).join(',');
        // throw new ExpressError(msg, 400);
        req.flash("error", msg);
        return res.redirect("back");
    }
    newAddress.landmark = landmark;
    const user = await User.findById(req.params.id);
    if (!user) {
        return next(new ExpressError("User Not Found", 404));
    }

    const address = await Address.create(newAddress);
    user.addresses.push(address);
    // console.log(address);

    await user.save();
    // console.log(user);
    req.flash("success", "New address added successfully.")
    res.redirect(`/user/${req.params.id}`);
}))

// edit route
router.patch("/user/:id/addresses/:addressId/edit", isLoggedIn, isUserPageOwner, catchAsync(async (req, res, next) => {
    // res.send("update route hit");
    const addressSchemaJoi = Joi.object({
        country: Joi.string().required().escapeHTML(),
        fullname: Joi.string().required().escapeHTML(),
        mobileNumber: Joi.number().required().min(0),
        pincode: Joi.number().required().min(0),
        addressLineOne: Joi.string().required().escapeHTML(),
        addressLineTwo: Joi.string().required().escapeHTML(),
        city: Joi.string().required().escapeHTML(),
        state: Joi.string().required().escapeHTML(),
        addresstype: Joi.string().valid("Home", "Office").required().escapeHTML()
    })

    const { country = "India", fullname, mobileNumber, pincode, addressLineOne, addressLineTwo, landmark, city, state, addresstype } = req.body;
    const editAddress = {
        country,
        fullname,
        mobileNumber,
        pincode,
        addressLineOne,
        addressLineTwo,
        city,
        state,
        addresstype
    }

    const { error } = addressSchemaJoi.validate(editAddress);
    if (error) {
        const msg = error.details.map(el => el.message).join(',');
        // throw new ExpressError(msg, 400);
        req.flash("error", msg);
        return res.redirect("back");
    }

    editAddress.landmark = landmark;
    const updatedAddress = await Address.findByIdAndUpdate(req.params.addressId, editAddress, { new: true });

    // console.log(updatedAddress);
    req.flash("success", "Address has been updated successfully.")
    res.redirect(`/user/${req.params.id}`);

}))

// delete
router.delete("/user/:id/addresses/:addressId", isLoggedIn, isUserPageOwner, catchAsync(async (req, res, next) => {
    const { id, addressId } = req.params;

    await User.findByIdAndUpdate(id, { $pull: { addresses: addressId } });
    await Address.findByIdAndDelete(addressId);

    req.flash("success", "Address has been deleted successfully.")
    res.redirect(`/user/${req.params.id}`);
}))

module.exports = router;
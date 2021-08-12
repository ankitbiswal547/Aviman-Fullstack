const express = require("express");
// const Joi = require("joi");
const { Joi } = require("../utils/joiWrapper");
const router = express.Router();
const passport = require("passport");
const User = require("../models/user");
const Secretcode = require("../models/secretCode");
const catchAsync = require("../utils/catchAsync");
const ExpressError = require("../utils/ExpressError");
const { isLoggedIn, isUserPageOwner, deleteProfileImageBeforeUpdate } = require('../middlewares');
const { profileImageStorage, cloudinary } = require("../Cloudinary/config");
const crypto = require("crypto");
const { sendMail } = require("../utils/sendMail");
const sanitizeHtml = require('sanitize-html');

const multer = require("multer");
const Product = require("../models/product");
const upload = multer({ storage: profileImageStorage });


router.get('/user/:id', catchAsync(async (req, res, next) => {
    const user = await User.findById(req.params.id).populate('reviews').populate('addresses');
    // console.log(user);
    if (!user) {
        return next(new ExpressError("User Not Found", 404));
    }
    // console.log(req.baseUrl);
    res.render("user/usershow", { user });
}))

// user update route
router.post('/user/:id', isLoggedIn, isUserPageOwner, catchAsync(async (req, res, next) => {

    const UserSchemaJoi = Joi.object({
        fullName: Joi.string().required().escapeHTML(),
        email: Joi.string().email().required().escapeHTML(),
        description: Joi.string().escapeHTML()
    })
    let { fullName, email, description = "" } = req.body;
    description = sanitizeHtml(description, {
        allowedTags: [],
        allowedAttributes: {}
    });

    const { error } = UserSchemaJoi.validate({
        fullName,
        email
    })

    if (error) {
        const msg = error.details.map(el => el.message).join(',');
        req.flash("error", msg);
        return res.redirect(`/user/${req.params.id}`);
        // throw new ExpressError(msg, 400);
    }

    const user = await User.findById(req.params.id);
    if (!user) {
        return next(new ExpressError("User Not Found", 404));
    }
    user.fullName = fullName.trim();
    user.email = email.trim();
    user.description = description.trim();
    await user.save();
    req.flash("success", "Personal details has been successfully updated.")
    res.redirect(`/user/${req.params.id}`);
}))

router.post('/user/:id/profileImage', isLoggedIn, isUserPageOwner, catchAsync(deleteProfileImageBeforeUpdate), upload.single('profileImage'), catchAsync(async (req, res, next) => {

    const { path, filename } = req.file;
    let updatedPath = path.replace(/(jpg|jpeg|png|webp)/g, "webp");

    const user = await User.findById(req.params.id);

    user.profileImage.url = updatedPath;
    user.profileImage.filename = filename

    await user.save();
    req.flash("success", "Profile image updated successfully.")
    res.redirect("back");
}))

// delete profile image
router.delete('/user/:id/profileImage', isLoggedIn, isUserPageOwner, catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const user = await User.findById(id);
    const filename = user.profileImage.filename;
    if (filename == "") {
        return res.redirect("back");
    }
    try {
        await cloudinary.uploader.destroy(filename);
    } catch (e) {
        req.flash("error", "Check your internet connectivity.");
        // console.log(e);
        return res.redirect("back");
    }
    user.profileImage = {
        url: "",
        filename: ""
    }
    await user.save();

    req.flash("success", "Profile image has been removed successfully.")
    res.redirect("back");
}))

router.get('/register', (req, res) => {
    res.render("signup");
})

router.post('/register', catchAsync(async (req, res, next) => {
    try {
        const { username, fullName, email } = req.body;
        const user = {
            username,
            fullName,
            email,
            isAdmin: false
        }
        const newUser = await User.register(user, req.body.password);
        req.login(newUser, async (err) => {
            if (err) {
                return next(err);
            }
            try {
                const result = await crypto.randomBytes(48);
                const token = result.toString("hex");

                const secretcode = {
                    userId: newUser._id,
                    code: token,
                }
                const newSecretCode = await Secretcode.create(secretcode);
                // console.log(newSecretCode);
                // console.log("=========================");
                const response = await sendMail(newUser, newSecretCode, req, res);
                // console.log(response);

                if (response.mailStatus === "failed") {
                    req.flash("warning", `Welcome ${user.fullName}, your account has been successfully created. But we are unable to send the verification mail. Please try generating a new verification link through your user account.`)
                } else {
                    req.flash("success", `Welcome ${fullName}, your account has been successfully created. Email verification link has been sent to your email address. Please do look upto the spam folders if the mail is not in the inbox and then click on the link to verify.`);
                }
            } catch (e) {
                return next(e);
            }


            // console.log(newUser);
            res.redirect('/');
        })

    } catch (e) {
        req.flash("error", "User with that username already exists.");
        res.redirect('/register');
    }
}))

router.get('/login', (req, res) => {
    res.render("login");
})

router.post('/login', passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), (req, res) => {
    req.flash("success", "Welcome Back!!!");
    res.redirect('/');
})

router.get('/logout', (req, res) => {
    req.logOut();
    req.flash("success", "Successfully logged you out. See you soon!!");
    res.redirect('/');
})



// email verification route
router.get('/auth/verification/:userId/:secretCodeId/:authtoken', catchAsync(async (req, res, next) => {
    const user = await User.findById(req.params.userId);

    const secretcode = await Secretcode.findById(req.params.secretCodeId);

    if (secretcode.code == req.params.authtoken && secretcode.userId.equals(req.params.userId)) {
        user.verified = "verified";
        await user.save();
        // console.log(user);
        req.flash("success", "Email id verified");
        return res.redirect('back');
    } else {
        req.flash("error", "Not verified");
        res.redirect("back");
    }
}))

// link generation route
router.get('/auth/verification/generatelink/:id', isLoggedIn, isUserPageOwner, catchAsync(async (req, res, next) => {

    const user = await User.findById(req.params.id);
    if (!user) {
        req.flash("error", "User not found");
        res.redirect("/");
    }

    const result = await crypto.randomBytes(48);
    const token = result.toString("hex");

    const secretcode = {
        userId: user._id,
        code: token,
    }
    const newSecretCode = await Secretcode.create(secretcode);
    await newSecretCode.save();
    const response = await sendMail(user, newSecretCode, req, res);

    if (response.mailStatus === "failed") {
        req.flash("warning", `Unable to send mail. Please try after some time.`)
    } else {
        req.flash("info", "Verification link has been sent to yout mail id. Please look up to the spam folders for the mail and verify.");
    }
    res.redirect('back');
}))



// add to cart

router.get("/cart/:id", isLoggedIn, isUserPageOwner, async (req, res, next) => {
    const user = await User.findById(req.params.id).populate({
        path: 'cart',
        populate: {
            path: 'productId'
        }
    });

    // console.log(user);
    let totalPrice = 0;
    let totalQuantity = 0;
    let totalDiscountedPrice = 0;
    let onSale = false;
    for (let i = 0; i < user.cart.length; i++) {
        totalPrice += (user.cart[i].productId.price * user.cart[i].quantity);
        totalQuantity += user.cart[i].quantity;
        if (user.cart[i].productId.isOnSale) {
            onSale = true;
            totalDiscountedPrice += (user.cart[i].productId.discountPrice * user.cart[i].quantity);
        }
    }

    totalDiscountedPrice = totalDiscountedPrice.toFixed(2);
    if (totalDiscountedPrice == 0 && onSale) {
        totalDiscountedPrice = totalPrice;
    }
    res.render("user/cart", { user, totalPrice, totalQuantity, totalDiscountedPrice, onSale });
})

router.post('/addtocart/:id/:productId', isLoggedIn, catchAsync(async (req, res, next) => {
    const { id, productId } = req.params;

    const user = await User.findById(id);

    if (!user) {
        req.flash("warning", "User not found. Don't try to tamper the data.");
        return res.redirect("/");
    }
    const product = await Product.findById(productId)
    if (!product) {
        req.flash("warning", "Product not found. Don't try to tamper the data.");
        return res.redirect("/");
    }

    for (let i = 0; i < user.cart.length; i++) {
        if (user.cart[i].productId == productId) {
            user.cart[i].quantity = req.body.quantity;
            await user.save();
            // console.log("for loop", user);
            req.flash("info", "We noticed the product was already there in the cart so we have updated it with the current quantity.");
            return res.redirect("back");
        }
    }

    user.cart.push({
        productId: product._id,
        quantity: req.body.quantity
    })

    // console.log(user.cart)

    await user.save();
    // console.log(user);

    req.flash("success", "Product added to the cart.");
    res.redirect("back");
}))

// delete item from cart
router.delete('/addtocart/:id/:productId', isLoggedIn, isUserPageOwner, catchAsync(async (req, res, next) => {
    const { id, productId } = req.params;

    const user = await User.findByIdAndUpdate(id, { $pull: { cart: { productId: productId } } }, { new: true });
    // console.log(user);
    req.flash("success", "Item removed from the cart.");
    res.redirect("back");
}))

module.exports = router;
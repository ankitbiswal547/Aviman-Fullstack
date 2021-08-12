const User = require("./models/user");
const { cloudinary } = require("./Cloudinary/config");

const isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    } else {
        req.flash("error", "You are not logged in currently");
        res.redirect('/login');
    }
}

const isAdmin = (req, res, next) => {
    if (req.user.isAdmin) {
        return next();
    }
    req.flash("error", "Unauthorised Access Denied.")
    res.redirect('/');
}

const isUserPageOwner = (req, res, next) => {
    if (req.user._id.equals(req.params.id)) {
        return next();
    }

    req.flash("error", "Unauthorised Access Denied.");
    res.redirect(`/user/${req.params.id}`);
}

const deleteProfileImageBeforeUpdate = async (req, res, next) => {

    const user = await User.findById(req.user._id);
    const filename = user.profileImage.filename;

    if (filename == "") {
        return next();
    }

    try {
        const result = await cloudinary.uploader.destroy(filename);
    } catch (e) {
        req.flash("error", "Check your internet connectivity.");
        console.log(e);
        return res.redirect("back");
    }

    user.profileImage = {
        url: "",
        filename: ""
    }
    await user.save();

    return next();
}

module.exports = {
    isLoggedIn,
    isAdmin,
    isUserPageOwner,
    deleteProfileImageBeforeUpdate
}
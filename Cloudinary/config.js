const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");


cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET
})

const profileImageStorage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: "Aviman/Users",
        allowedFormats: ["jpeg", 'jpg', 'png', 'webp']
    }
})

const productImageStorage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: "Aviman/Products",
        allowedFormats: ["jpeg", 'jpg', 'png', 'webp']
    }
})

module.exports = {
    cloudinary,
    profileImageStorage,
    productImageStorage
}
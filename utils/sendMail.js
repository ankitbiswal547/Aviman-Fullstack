const nodemailer = require("nodemailer");
const ExpressError = require("./ExpressError");
const getHtml = require("./emailVerificationHtml");

const sendMail = async (user, code, req, res) => {
    // console.log(user);
    // console.log(" Mail sent");

    try {
        let transporter = nodemailer.createTransport({
            service: "hotmail.com",
            port: 587,
            secure: false,  // true for 465, false for other ports
            auth: {
                user: process.env.EMAIL_HOST,
                pass: process.env.EMAIL_PASSWORD,
            },
            tls: {
                rejectUnauthorized: false
            }
        });

        let info = await transporter.sendMail({
            from: `"Ankit Biswal" <${process.env.EMAIL_HOST}>`, // sender address
            to: `${user.email}`, // list of receivers
            subject: "Email verification", // Subject line
            text: `Click on the link to verify your email address. \n\n ${req.baseUrl}/auth/verification/${user._id}/${code._id}/${code.code}`,
            html: getHtml(user.fullName, user._id, code._id, code.code)
            // html: `Click on the link to verify your email address. \n\n ${req.baseUrl}/auth/verification/${user._id}/${code._id}/${code.code}`
        });

        // console.log("Message sent: %s", info.messageId);
        return {
            mailStatus: "success"
        };
    } catch (e) {
        return {
            mailStatus: "failed"
        };
        // throw new ExpressError("Unable to sent email. Check your internet connectivity.", 400);
    }
}


module.exports = {
    sendMail
}
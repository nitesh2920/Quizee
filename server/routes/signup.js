const router = require('express').Router();
const User = require("../modles/Users");
const CryptoJS = require("crypto-js");

router.post('/signup', async (req, res) => {
    const { username, email, password } = req.body;
   // console.log("username :",username)
    // Encrypt the password using AES
    const encryptedPassword = CryptoJS.AES.encrypt(
        password,
        process.env.SecretPassKey
    ).toString();
    const newUser = new User({
        username,
        email,
        password: encryptedPassword,
    });
    try {
        const savedUser = await newUser.save();
        console.log("Saved user:", savedUser);
        // Respond with status 201 (Created) and the saved user object
        res.status(201).json(savedUser);
    } catch (err) {
        console.error("Error saving user:", err);
        // Respond with status 500 (Internal Server Error) and a generic error message
        res.status(500).json({ error: "Failed to create user" });
    }
});
module.exports = router;

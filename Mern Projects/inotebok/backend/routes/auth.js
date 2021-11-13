const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser');

const JWT_SECRET = 'Hrikbanisagoodboy';

// For Creating users and pushing the creds to the database using POST
router.post('/createuser', [
    body('email', 'Enter a valid Email').isEmail(),
    body('name', 'Enter a valid Name').isLength({ min: 3 }),
    body('password', 'Password needs to be atleast 5 characters').isLength({ min: 5 })
], async (req, res) => {
    let success = false;
    // If there are errors the return bad request and errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success, errors: errors.array() });
    }

    try {
        let user = await User.findOne({ email: req.body.email })
        if (user) {
            return res.status(400).json({ success, error: "This user exists already." })
        }
        // Using salt
        const salt = await bcrypt.genSalt(10);
        const securedPass = await bcrypt.hash(req.body.password, salt);
        // Creating a new User
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: securedPass,
        });

        const data = {
            user: {
                id: user.id,
            }
        };
        const authToken = jwt.sign(data, JWT_SECRET);
        console.log(`Token: ${authToken}`);

        let success = true;
        res.json({ success, authToken });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some Error Occured");
    }
});

// Matcing Users' credentials in database and let the login using POST
router.post('/', [
    body('email', 'Enter a valid Email').isEmail(),
    body('password', 'Password caonnot be blank').exists(),
], async (req, res) => {
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ success, error: "Please try to login with correct email." });
        }
        const passwordComparison = await bcrypt.compare(password, user.password);
        if (!passwordComparison) {
            return res.status(400).json({ success, error: "Please try to login with correct password." });
        }
        const data = {
            user: {
                id: user.id,
            }
        }
        const authToken = jwt.sign(data, JWT_SECRET);
        success = true;
        res.json({ success, authToken });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some Internal Error Occured");
    }
});

// Get Logged in User details
router.post('/getuser', fetchuser, async (req, res) => {
    try {
        userId = req.user.id;
        const user = await User.findById(userId).select("-password");
        res.send(user);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some Internal Error Occured");
    }
});

module.exports = router;
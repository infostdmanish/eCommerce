
const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

var fetchuser = require('../middleware/fetchuser');
const JWT_SECRET = "Manishisagoodboy";

//ROUTE 1: create a User using: POST "api/auth/createuser" Doesnot require login 
router.post('/createuser', [
    body('fname', 'Enter a valid First Name').isLength({ min: 2 }),
    body('lname', 'Enter a valid Last Name').isLength({ min: 2 }),
    body('email', 'Enter a valid email').isEmail(),
    body('contactno', 'Enter a  contact Number').isLength({ min: 5 }),
    body('password', 'Password must be aleast 5 characters').isLength({ min: 5 })
],
    async (req, res) => {
        let success= false;
        //If there are errors, return bad request and the errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ success ,errors: errors.array() });
        }
        // Check whether the user with this email exist already
        try {
            let user = await User.findOne({ email: req.body.email });
            if (user) {
                return res.status(400).json({ success,error: "Sorry error already exist!" })

            }
            const salt = await bcrypt.genSalt(10);
            secPass = await bcrypt.hash(req.body.password, salt);
            //create a user
            user = await User.create({
                fname: req.body.fname,
                lname: req.body.lname,
                email: req.body.email,
                contactno: req.body.contactno,
                password: secPass,
            })
            const data = {
                user: {
                    id: user.id
                }
            }
            const authToken = jwt.sign(data, JWT_SECRET);
            success = true;
            res.json({ success, authToken })

        } catch (error) {
            console.error(error.message);
            res.status(500).send('Internal Server Error');
        }

    })

//ROUTE 2: Authenticate a User using: POST "api/auth/login" No login required 
router.post('/login', [
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password Cannot be blank').exists(),
],
    async (req, res) => {
        let success = false;
        //If there are errors, return bad request and the errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, password } = req.body;
        try {
            let user = await User.findOne({ email });
            if (!user) {
                return res.status(500).json({success, error: "Please try to login with correct Credentials" })
            }
            const passwordCompare = await bcrypt.compare(password, user.password)
            if (!passwordCompare) {
                success=false;
                return res.status(500).json({ success, error: "Please try to login with correct Credentials" });
            }
            const data = {
                user: {
                    id: user.id
                }
            }
            const authToken = jwt.sign(data, JWT_SECRET);
            success=true;
            res.send({ success, authToken });
        } catch (error) {
            console.error(error.message);
            res.status(500).send('Internal Server Error');
        }
    }
)
//ROUTE e: GET Loggedin User details using: POST "api/auth/getuser"  login required
router.post('/getuser', fetchuser, async (req, res) => {
      
        try {
            const userId= req.user.id;
            const user = await User.findById(userId).select("-password");
            res.send(user);

        } catch (error) {
            console.error(error.message);
            res.status(500).send('Internal Server Error');
        }
    }
)

        module.exports = router;

        
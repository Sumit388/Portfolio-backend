import express from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/user.js';
import bodyParser from "body-parser";


const user = express.Router();
const jsonParser = bodyParser.json();

user.post('/register', jsonParser ,async (req, res) => {
    try {
        const user = new User(req.body);
        await user.save();
        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

user.post('/login', jsonParser ,async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }
        const isMatch = await user.matchPassword(password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }
        //const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ "message": "Logged in successfully" });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

export default user;

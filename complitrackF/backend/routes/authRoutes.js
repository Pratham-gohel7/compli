const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const rateLimit = require("express-rate-limit");
const User = require("../model/User");
require("dotenv").config();

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "1h";

// Rate limiting for auth endpoints
const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // limit each IP to 5 requests per windowMs
    message: "Too many attempts, please try again later"
});

// POST: Register User
router.post("/register", authLimiter, async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: "Email and password are required" });
        }

        // Optional: Password strength validation
        if (password.length < 8) {
            return res.status(400).json({ error: "Password must be at least 8 characters" });
        }

        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(409).json({ error: "User already exists" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = await User.create({ 
            email, 
            password: hashedPassword 
        });

        // Don't send back the hashed password
        const userResponse = {
            id: newUser.id,
            email: newUser.email,
            createdAt: newUser.createdAt
        };

        res.status(201).json({ 
            message: "User registered successfully", 
            user: userResponse 
        });
    } catch (error) {
        console.error("Error registering user:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

// POST: Login User
router.post("/login", authLimiter, async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: "Email and password are required" });
        }

        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(401).json({ error: "Invalid email or password" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ error: "Invalid email or password" });
        }

        const token = jwt.sign({ userId: user.id }, JWT_SECRET, { 
            expiresIn: JWT_EXPIRES_IN 
        });

        // Optionally set cookie instead of returning token in body
        res.json({ 
            message: "Login successful", 
            token,
            expiresIn: JWT_EXPIRES_IN
        });
    } catch (error) {
        console.error("Error logging in user:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

// Middleware for protected routes
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    
    if (!token) {
        return res.status(401).json({ error: "Access denied. No token provided." });
    }

    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).json({ error: "Invalid or expired token" });
        }
        req.user = decoded;
        next();
    });
};

// GET: Protected Route Example
router.get("/protected", authenticateToken, (req, res) => {
    // Add security headers
    res.setHeader("X-Content-Type-Options", "nosniff");
    res.setHeader("X-Frame-Options", "DENY");
    
    res.json({ 
        message: "You have access to this protected route", 
        user: req.user 
    });
});

module.exports = router;
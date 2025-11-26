const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const twilio = require('twilio');
const userController = require('../controllers/userController');
const auth = require('../middleware/auth'); // Assuming auth middleware is in middleware/auth.js
const nodemailer = require('nodemailer');
const { google } = require('googleapis');

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = "https://developers.google.com/oauthplayground";
const REFRESH_TOKEN = process.env.REFRESH_TOKEN;

const oauth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
);

oauth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

async function createTransporter() {
  const accessToken = await oauth2Client.getAccessToken();

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: "arsalantech277@gmail.com",  // your Gmail
      clientId: CLIENT_ID,
      clientSecret: CLIENT_SECRET,
      refreshToken: REFRESH_TOKEN,
      accessToken: accessToken.token
    }
  });

  return transporter;
}


// Initialize Twilio client only if credentials are available
let twilioClient = null;
if (process.env.TWILIO_ACCOUNT_SID && process.env.TWILIO_AUTH_TOKEN) {
  twilioClient = twilio(
    process.env.TWILIO_ACCOUNT_SID,
    process.env.TWILIO_AUTH_TOKEN
  );
}




// Signup route
router.post('/signup', async (req, res) => {
  try {
    const { fullName, email, phoneNumber, password } = req.body;

    const existingUser = await User.findOne({
      $or: [{ email }, { phoneNumber }]
    });

    if (existingUser) {
      return res.status(400).json({
        message: 'User with this email or phone number already exists'
      });
    }

    // const otp = Math.floor(1000 + Math.random() * 9000).toString();

    // const transporter = await createTransporter();

    // await transporter.sendMail({
    //   from: "arsalantech277@gmail.com",
    //   to: email,
    //   subject: "OTP for Signup",
    //   text: `Your OTP for signup is: ${otp}`
    // });

    const user = new User({
      fullName,
      email,
      phoneNumber,
      password,
    });

    await user.save();

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, role: user.role || 'user' },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '7d' }
    );

    res.status(201).json({
      message: "User created successfully.",
      token,
      user: {
        id: user._id,
        fullName,
        email,
        phoneNumber,
      },
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error sending email" });
  }
});


router.post('/verify-otp', async (req, res) => {
  try {
    const { email, otp } = req.body;
    const user = await User.findOne({ $or: [{ email }, { otp: { code: otp } }] });

    console.log(user, otp);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (user.otp.code !== otp) {
      return res.status(400).json({ message: 'Invalid OTP' });
    }


    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, role: user.role || 'user' },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '7d' }
    );

    user.status = 'active';
    user.otp = {
      code: null,
      expiresAt: null
    };
    await user.save();

    res.json({
      message: 'OTP verified successfully. Account activated.', token, user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        phoneNumber: user.phoneNumber
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Login route
router.post('/login', async (req, res) => {
  try {
    const { email, phoneNumber, password } = req.body;

    // Dummy admin login
    if (email === 'admin@gmail.com' && password === 'admin123') {
      // Generate a dummy token
      const token = jwt.sign(
        { userId: 'admin', role: 'admin' },
        process.env.JWT_SECRET || 'your-secret-key',
        { expiresIn: '7d' }
      );
      return res.json({
        message: 'Login successful',
        token,
        user: {
          id: 'admin',
          fullName: 'Admin User',
          email: 'admin@gmail.com',
          phoneNumber: ''
        }
      });
    }

    // Find user by email or phone number
    let user = null;
    if (email) {
      user = await User.findOne({ email });
    } else if (phoneNumber) {
      user = await User.findOne({ phoneNumber });
    }
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Check password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, role: user.role || 'user' },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '7d' }
    );

    res.json({
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        phoneNumber: user.phoneNumber
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Request OTP for password reset
router.post('/forgot-password', async (req, res) => {
  try {
    const { phoneNumber } = req.body;

    const user = await User.findOne({ phoneNumber });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Generate 4-digit OTP
    const otp = Math.floor(1000 + Math.random() * 9000).toString();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    // Save OTP to user document
    user.resetPasswordOTP = {
      code: otp,
      expiresAt
    };
    await user.save();

    // Only send OTP if Twilio is configured
    if (twilioClient) {
      await twilioClient.messages.create({
        body: `Your Local Connect password reset OTP is: ${otp}`,
        to: phoneNumber,
        from: process.env.TWILIO_PHONE_NUMBER
      });
      res.json({ message: 'OTP sent successfully' });
    } else {
      // For development/testing, just return the OTP
      res.json({
        message: 'OTP generated successfully (Twilio not configured)',
        otp: otp // Only include this in development
      });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Verify OTP and reset password
router.post('/reset-password', async (req, res) => {
  try {
    const { phoneNumber, otp, newPassword } = req.body;

    const user = await User.findOne({ phoneNumber });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if OTP exists and is valid
    if (!user.resetPasswordOTP ||
      user.resetPasswordOTP.code !== otp ||
      user.resetPasswordOTP.expiresAt < new Date()) {
      return res.status(400).json({ message: 'Invalid or expired OTP' });
    }

    // Update password and clear OTP
    user.password = newPassword;
    user.resetPasswordOTP = undefined;
    await user.save();

    res.json({ message: 'Password reset successful' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put('/profile', auth, userController.updateProfile);

module.exports = router; 
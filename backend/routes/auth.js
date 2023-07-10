const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fetchuser = require('../middlewares/fetchuser');

const JWT_SECRET = 'iagsoasdoahoiho1293192!&@&@&';

// create user
router.post(
  '/createUser',
  [
    body('name', 'Enter a valid name').isLength({ min: 3 }),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password must be of 5 characters length').isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    let success = false;

    // if there are any validation errors send bad request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      // check for existing user
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        success = false;
        return res
          .status(400)
          .json({ success, error: 'Sorry, User Already Exists.' });
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);

      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
      });

      const data = {
        user: {
          id: user.id,
        },
      };
      const authToken = jwt.sign(data, JWT_SECRET);
      success = true;
      res.json({ success, authToken, user });
    } catch (error) {
      res.status(500).send({
        success,
        message: 'some error occured while creating user',
        error: error.message,
      });
    }
  }
);

// user login
router.post(
  '/login',
  [
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password cannot be empty').exists(),
  ],
  async (req, res) => {
    // if there are any validation errors send bad request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      let user = await User.findOne({ email: email });
      let success = false;
      if (!user) {
        success = false;
        return res
          .status(400)
          .json({ success, error: 'Please enter correct credentials.' });
      }

      const comparePassword = await bcrypt.compare(password, user.password);
      if (!comparePassword) {
        success = false;
        return res
          .status(400)
          .json({ success, error: 'Please enter correct credentials.' });
      }

      const data = {
        user: {
          id: user.id,
        },
      };
      const authToken = jwt.sign(data, JWT_SECRET);
      success = true;
      res.json({ success, authToken });
    } catch (error) {
      res.status(500).json({
        message: 'some error occured while logging user',
        error: error.message,
      });
    }
  }
);

// fetch user details
router.get('/getUser', fetchuser, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.send(user);
  } catch (error) {
    res.status(500).json({
      message: 'some error occured while logging user',
      error: error.message,
    });
  }
});

module.exports = router;

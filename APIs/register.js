require("dotenv").config();
const express = require("express");
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserDataModel = require("../db/schema/userSchema");
  
  router.post('/signup', async (req, res) => {
    try {
      var { email, password, phone_number, name } = req.body;
      console.log("email ---->",email, "password ------>", password);

       // Check if the user already exists
    const existingUser = await UserDataModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email already exists. Please log in." });
    }
      
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = new UserDataModel({ email, password: hashedPassword, phone_number, name });
      await user.save();
      console.log("signup successful, saved user >>>", user);
      res.status(201).json({ message: 'signup successful' });
    } catch (error) {
      console.log("error in signup API", error);
      res.status(500).json({ error: error.message });
    }
  });
  
  router.post('/login', async (req, res) => {
    try {
      var { email, password } = req.body;
      const user = await UserDataModel.findOne({ email });
      if (!user) return res.status(400).json({ message: 'User not found' });
      console.log("userdata ------>",user, "email ---->",email, "password ------>", password);
      
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });
  
      let accesstoken = jwt.sign(
        { email: email },
        process.env.ACCESS_TOKEN_SECRET //token will only be sent once, and if the  re-logins, new jwt is created
      );
console.log("Access Token ---->", accesstoken);

      //set the token in client side
      res.setHeader("Authorization", `Bearer ${accesstoken}`)
      res.json({ message: ' login successful' });
    } catch (error) {
      console.log("error in login API", error);
      res.status(500).json({ error: error.message });
    }
  });

  module.exports = router;
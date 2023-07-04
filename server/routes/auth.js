const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

//REGISTER
router.post("/register", async (req, res) => {

  try {
    // Get user input
    const { username, email, password } = req.body;

    // Validate user input
    if (!(email && password && username)) {
      res.status(400).send("All input is required");
    }

    // check if user already exist
    // Validate if user exist in our database
    else {
      const oldUser = await User.findOne({ email });

      if (oldUser) {
        return res.status(409).send("Email already created please login");
      }

      else {
        //Encrypt user password
        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(req.body.password, salt);

        // Create user in our database
        const newUser = new User({
          username: req.body.username,
          email: req.body.email,
          password: hashedPass,
        });

        const user = await newUser.save();
        res.status(200).json(user);
      }
    }
  } catch (err) {
    res.status(500).json(err);
  }

    // try {
    //   const salt = await bcrypt.genSalt(10);
    //   const hashedPass = await bcrypt.hash(req.body.password, salt);
    //   const newUser = new User({
    //     username: req.body.username,
    //     email: req.body.email,
    //     password: hashedPass,
    //   });
    //     const user = await newUser.save();
    //     res.status(200).json(user);
    // } catch (err) {
    //   res.status(500).json(err);
    // }
  });

  //LOGIN
router.post("/login", async (req, res) => {
    try {
      const { email, password } = req.body;
      if (!(email && password)) {
        res.status(400).send("All input is required");
      }
      else {
        const user = await User.findOne({ email: req.body.email });
        if(!user) {
          res.status(400).json("Wrong credentials!");
        }
        else {
          const validated = await bcrypt.compare(req.body.password, user.password);
          if(!validated) {
            res.status(400).json("Wrong credentials!");
          }
          else {
            const { password, ...others } = user._doc;
            res.status(200).json(others);
          }
        }
      }
    } catch (err) {
      res.status(500).json(err);
    }
  });

  module.exports = router;
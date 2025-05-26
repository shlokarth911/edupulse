import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const signup = async (req, res) => {
  try {
    //Destructuring
    const { name, email, password } = req.body;

    //Checking for available feilds
    if (!email || !password || !name) {
      return res.status(400).send("Please fill all feilds");
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).send("User already exists");
    }

    //Hashing password
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    // Create User
    const user = await User.create({
      name,
      email,
      password: passwordHash,
    });

    //Verify User
    if (!process.env.JWT_SECRET) {
      console.error("⚠️  No JWT_SECRET in .env!");
      return res.status(500).send("Eror in Server Configuration");
    }

    //Sign a JWT
    const token = jwt.sign(
      {
        id: user._id.toString(),
        email: user.email,
      },

      process.env.JWT_SECRET,

      { expiresIn: "7d" }
    );

    // Return Success
    return res.status(200).send({
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },

      token,
    });
  } catch (error) {
    console.error("Error in login controller : ", error);
    res.status(400).send("Internal server Error", error);
  }
};

export const login = async (req, res) => {
  try {
    //Destructuring
    const { email, password } = req.body;

    //Find User
    const user = await User.findOne({ email });

    if (!user) {
      return res.send(404).send("Please fill all feilds correctly");
    }

    //Compare Passwords

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).send("Please fill all feilds correctly");
    }

    //Verify secret
    if (!process.env.JWT_SECRET) {
      console.error("⚠️  No JWT_SECRET in .env!");
      return res.status(500).send("Internal server error");
    }

    // Sign Token
    const token = jwt.sign(
      {
        id: user._id.toString(),
        email: user.email,
      },

      process.env.JWT_SECRET,

      { expiresIn: "7d" }
    );

    // Return Success
    return res.status(200).send({
      user: {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
      },

      token,
    });
  } catch (error) {
    console.error("Error in login controller : ", error);
    res.status(500).send("Internal Server Error");
  }
};

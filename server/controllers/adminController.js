// controllers/adminController.js
import User from "../models/Users.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const registerAdmin = async (req, res) => {
  try {
    const { name, email, password, district } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashedPassword, role: 'admin', district });
    await user.save();
    res.status(201).json({ message: "Admin registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Registration failed", error });
  }
};

export const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email, role: 'admin' });
    if (!user) return res.status(400).json({ message: "Admin not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user._id, role: user.role, district: user.district }, process.env.JWT_SECRET, { expiresIn: '2h' });

    res
      .cookie("token", token, {
        httpOnly: true,
        maxAge: 2 * 60 * 60 * 1000,
        secure: process.env.NODE_ENV === "production",
        sameSite: "none"
      })
      .json({ message: "Login successful", role: user.role });
  } catch (err) {
    res.status(500).json({ message: "Login failed", err });
  }
};

export const createUserByAdmin = async (req, res) => {
    try {
      const { name, email, password, district } = req.body;
  
      const existingUser = await User.findOne({ email });
      if (existingUser) return res.status(400).json({ message: "User already exists" });
  
      const hashedPassword = await bcrypt.hash(password, 10);
  
      const newUser = new User({
        name,
        email,
        password: hashedPassword,
        district,
        role: 'employee',
        isVerified: true,
      });
  
      await newUser.save();
  
      const msg = {
        to: email,
        from: process.env.SENDER_EMAIL,
        subject: "Your Employee Account is Created",
        text: `Hi ${name},\n\nYour employee account has been created by admin.\n\nLogin using:\nEmail: ${email}\nPassword: ${password}\n\nThanks.`
      };
  
      await sgMail.send(msg);
  
      res.status(201).json({ message: "Employee created and email sent" });
    } catch (error) {
      res.status(500).json({ message: "Failed to create employee", error });
    }
  };

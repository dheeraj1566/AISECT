import User from "../models/Users.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import sgMail from "@sendgrid/mail";
import dotenv from "dotenv";
dotenv.config();


sgMail.setApiKey(process.env.SENDGRID_API_KEY);
// console.log(process.env.SENDGRID_API_KEY)

// export const registerHeadAdmin = async (req, res) => {
//   const { name, email, password } = req.body;
//   const existingUser = await User.findOne({ role: 'admin' });
//   if (existingUser) return res.status(400).json({ message: "Admin already exists" });

//   const hashedPassword = await bcrypt.hash(password, 10);
//   const user = new User({ name, email, password: hashedPassword, role: 'admin', isVerified: true });
//   await user.save();

//   res.json({ message: "Head Admin registered successfully" });
// };

export const registerUser = async (req, res) => {
  const { name, email, password, role, district } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({ name, email, password: hashedPassword, role, district });
  await user.save();

  const msg = {
    to: email,
    from: process.env.SENDER_EMAIL,
    subject: "Verify Your Account",
    text: `Hello ${name}, your account has been created. Use username: ${email} and password: ${password}`
  };
  await sgMail.send(msg);

  res.json({ message: "User registered and verification email sent" });
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ message: "User not found" });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

  const token = jwt.sign({ id: user._id, role: user.role, district: user.district }, process.env.JWT_SECRET, { expiresIn: '2h' });

  res
    .cookie("token", token, {
      httpOnly: true,
      maxAge: 2 * 60 * 60 * 1000,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict"
    })
    // console.log(token)
    .json({ message: "Login successful", role: user.role});
};

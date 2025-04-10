import jwt from "jsonwebtoken";
const SECRET_KEY = process.env.JWT_SECRET;

export const checkAuth = (tokenKey) => (req, res, next) => {
  const token =
    tokenKey === "admin" ? req.cookies.adminToken : req.cookies.userToken;

  console.log("token", token);
  if (!token)
    return res
      .status(401)
      .json({ message: "Access denied. No token provided." });

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.decoded = decoded;
    next();
  } catch (error) {
    res.status(403).json({ message: "Invalid or expired token." });
  }
};


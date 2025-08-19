import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import cookieParser from "cookie-parser";

export const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    if (!token) {
      return res.status(401).json({
        status: "failed",
        message: "Unauthorized",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      return res.status(401).json({
        status: "failed",
        message: "Unauthorized - Invalid Token",
      });
    }
    const user = await User.findById(decoded.userId).select("-password"); // select("-password"); is used to exclude the password field from the user object
    if (!user) {
      return res.status(401).json({
        status: "failed",
        message: "Unauthorized - User not found",
      });
    }

    req.user = user; // this user object is now available in the next middleware or controller
    next();
  } catch (err) {
    res.status(401).json({
      status: "failed",
      message: "Unauthorized",
    });
  }
};

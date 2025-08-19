import jwt from "jsonwebtoken";

export const generateToken = (userId, res) => {
  //creating jwt
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

  //sending jwt in cookie
  res.cookie("jwt", token, {
    maxAge: 24 * 60 * 60 * 1000,
    httpOnly: true, //To prevent XSS attacks cross-site scripting attacks ( token won't be accessible via javascript)
    sameSite: "strict", //To prevent CSRF attacks cross-site request forgery ( token won't be accessible via other domains)
    secure: process.env.NODE_ENV !== "production" ? false : true, //To prevent MITM attacks man-in-the-middle ( token won't be accessible via http)
  });

  return token;
};

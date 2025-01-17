import jwt from "jsonwebtoken";
import rateLimit from "express-rate-limit";

export const generateToken = (user) => {
  const payload = { ...user._doc, userPassword: undefined };
  const token = jwt.sign(
    { payload },
    "Xn5&v9@z#G%hJq!Rk1tW*Z^a4Lb$NcP+Ym2o8Us0pTc7EdF",
    {
      expiresIn: 60 * 60 * 24 * 30 * 6,
    }
  );
  console.log("TTTTTTTTTTTTTTTTTTTOOOKKEENEE");
  return { token: token, payload: payload };
};
export const jwtCookieOptions = {
  httpOnly: true,
  secure: true,
  maxAge: 1000 * 60 * 60 * 1,
};

export const verifyToken = async (req, res, next) => {
  console.log("TOKEN........");

  try {
    const token = req.headers.authorization?.split(" ")[1] || req.cookies.token;
    console.log(token);

    if (!token) throw new Error("Token not Exist");

    const data = jwt.verify(
      token,
      "Xn5&v9@z#G%hJq!Rk1tW*Z^a4Lb$NcP+Ym2o8Us0pTc7EdF"
    );

    if (!data) throw new Error("Token Not Valid");

    req.user = data.payload;
    next();
  } catch (error) {
    res.status(403).json({
      success: false,
      msg: "Auth NOT success",
      error: error.msg || error,
    });
  }
};

export const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  message: {
    status: 429,
    msg: "Too many requests, please try again later.",
  },
  standardHeaders: true,
  legacyHeaders: false,
});

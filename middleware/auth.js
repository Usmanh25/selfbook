import jwt from "jsonwebtoken";

export const verifyToken = async (req, res, next) => {
  try {
    let token = req.header("Authorization");

    console.log("Incoming Authorization header:", token);

    if (!token) {
      console.log("No token found in request headers");
      return res.status(403).json({ message: "Access Denied" });
    }

    if (token.startsWith("Bearer ")) {
      token = token.slice(7).trimLeft();
    }

    console.log("Token after Bearer removal:", token);
    console.log("JWT_SECRET in backend:", process.env.JWT_SECRET);

    const verified = jwt.verify(token, process.env.JWT_SECRET);

    console.log("Verified JWT payload:", verified);

    req.user = verified;
    next();
  } catch (err) {
    console.error("JWT verification error:", err);
    res.status(401).json({ message: "Invalid or expired token" });
  }
};

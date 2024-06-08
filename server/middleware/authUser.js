import jwt from "jsonwebtoken";
import { User } from "../model/user.model.js";

const verifyJWT = async (req, res, next) => {
  let token=null;
  if (req.headers.authorization) {
    try {
      // console.log(req.headers.authorization)
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select("-password");
      next();
    } catch (error) {
      console.log("Not authorized,token failed");
    }
  }
  if (!token) {
    res.status(401);
    console.log("Not authorized,no token");
  } 
};

export { verifyJWT };

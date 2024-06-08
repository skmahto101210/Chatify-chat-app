import express from "express";
import {
  loginUser,
  registerUser,
  fetchAllUsers,
} from "../controller/user.controller.js";
import { verifyJWT } from "../middleware/authUser.js";

const router = express.Router();

router
  .post("/login", loginUser)
  .post("/register", registerUser)
  .get("/fetchAll", verifyJWT, fetchAllUsers);

export const userRouter = router;

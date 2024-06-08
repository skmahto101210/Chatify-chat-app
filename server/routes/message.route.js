import express from "express";
import { verifyJWT } from "../middleware/authUser.js";
import { allMessages, sendMessage } from "../controller/message.controller.js";

const router = express.Router();

router
  .get("/:chatId", verifyJWT, allMessages)
  .post("/", verifyJWT, sendMessage);

export const messageRouter = router;
 
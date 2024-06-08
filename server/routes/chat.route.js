import express from "express";
import { verifyJWT } from "../middleware/authUser.js";
import {
  accessChat,
  addSeltToGroup,
  createGroupChat,
  fetchChats,
  fetchGroups,
  groupExit,
} from "../controller/chat.controller.js";

const router = express.Router();

router
  .post("/", verifyJWT, accessChat)
  .get("/", verifyJWT, fetchChats)
  .post("/createGroup", verifyJWT, createGroupChat)
  .get("/fetchGroups", verifyJWT, fetchGroups)
  .put("/groupExit", verifyJWT, groupExit)
  .put("/groupExit", verifyJWT, addSeltToGroup);

export const chatRouter = router;

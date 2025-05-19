import express from "express";
import { getAllFriends } from "../controllers/FriendsController.js";

const friendsRouter = express.Router();

friendsRouter.get("/friends", getAllFriends);

export default friendsRouter;
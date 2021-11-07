/*
    Path: api/messages
*/
import { Router } from "express";
import { createChannel, getChannel, getChannels, getUserName } from "../controllers/ChannelController";
import { validateJWT } from "../middlewares/auth";

const router = Router();


router.post("/", validateJWT, createChannel);
router.get("/:name", validateJWT, getChannel);
router.get("/", validateJWT, getChannels);
router.get("/users/:id", validateJWT, getUserName);




export {router as channelRouter};
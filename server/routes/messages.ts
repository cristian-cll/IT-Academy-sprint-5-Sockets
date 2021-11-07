/*
    Path: api/messages
*/
import { Router } from "express";
import { getPersonalConversation, getChannelConversation } from "../controllers/MessageController";
import { validateJWT } from "../middlewares/auth";

const router = Router();


router.get('/personal/:from', validateJWT, getPersonalConversation );
router.get('/channel/:from', validateJWT, getChannelConversation );




export {router as messagesRouter};
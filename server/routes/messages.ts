/*
    Path: api/messages
*/
import { Router } from "express";
import { getConversation } from "../controllers/MessageController";
import { validateJWT } from "../middlewares/auth";

const router = Router();


router.get('/:from', validateJWT, getConversation );




export {router as messagesRouter};
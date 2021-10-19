/*
    path: api/login
*/
import { Router } from "express";
import { check } from "express-validator";

// Controllers
import { createUser, login, renewToken, GoogleLogin } from "../controllers/AuthController";
import { checkFields } from "../middlewares/checkFields";
import { validateJWT } from "../middlewares/auth";



const router = Router();

router.post('/google', GoogleLogin );

// Crear nuevos usuarios
router.post( '/new', [
    check('firstName', 'El first name es obligatorio').not().isEmpty(),
    check('lastName', 'El last name es obligatorio').not().isEmpty(),
    check('password', 'El password es obligatorio').not().isEmpty(),
    check('email', 'El email es obligatorio').isEmail(),
    checkFields
], createUser );


// Login
router.post('/',[
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'El password es obligatorio').not().isEmpty(),
    checkFields
], login );

// Revalidar Token
router.get('/renew', validateJWT, renewToken );


export {router as authRouter};
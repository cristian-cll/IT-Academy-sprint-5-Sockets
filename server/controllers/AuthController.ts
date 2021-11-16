import { response, request } from "express";
import { genSaltSync, hashSync, compareSync } from "bcrypt";
import { User } from "../models/user";
import { getToken } from "../helpers/jwt";
import { getProfileInfo } from "../utils/google";
import { ERROR_MESSAGES } from "../utils/errorConstants";

export const GoogleLogin = async(req: any, res = response) => {

    try {

        const code = req.body.code;
        const profile: any = await getProfileInfo(code);

        const {email_verified, email, sub} = profile;

        if(!email_verified) return res.status(400).json(ERROR_MESSAGES.GOOGLE_LOGIN);

        const userDB: any = await User.findOne({ email });

        // If the found user has the same google id, we create token

        if(userDB && userDB.auth.id === sub ) {

            const token = await getToken( userDB._id );

            return res.json({
                ok: true,
                user: userDB,
                token
            });

        };

        
        // If the user does not exist in the database, we create it

        const user: any = new User( {
            firstName: profile.given_name,
            lastName: profile.family_name,
            email: profile.email,
            avatar: profile.picture,
            auth: {
                type: "Google",
                id: profile.sub
            }
        } );

        await user.save();

        // Generar el JWT
        const token = await getToken( user.id );


        res.json({
            ok: true,
            user,
            token
        });

    } catch (error:any) {
        res.status(401).json({
            ok: false,
            msg: error.message
        });
    }

}




export const createUser = async(req: any, res = response) => {
    

    try {
        
        const { email, password } = req.body;
        
        // Check if the user exists with the email
        const userDB = await User.findOne({ email });
        if ( userDB ) {
            return res.status(400).json(ERROR_MESSAGES.EMAIL_EXISTS);
        }

        const user: any = new User( req.body );

        // Encrypt password
        const salt = genSaltSync();
        user.password = hashSync( password, salt );

        // Save user in DB
        await user.save();
        
        // Get Token
        const token = await getToken( user.id );
        
        res.json({
            ok: true,
            user,
            token
        });

    } catch (error:any) {

        res.status(500).json({
            ok: false,
            msg: error.message
        });
    }

    
}


// login
export const login = async(req: any, res: any) => {

    const {  email, password } = req.body;

    try {
        
        // Check if the user exists with the email
        const userDB: any = await User.findOne({ email });
        if ( !userDB ) {
            return res.status(404).json(ERROR_MESSAGES.EMAIL_NOT_FOUND);
        }

        // Validate password
        const validPassword = compareSync( password, userDB.password );
        
        if ( !validPassword ) {
            return res.status(404).json(ERROR_MESSAGES.UNAUTHORIZED);
        }

        // Get Token
        const token = await getToken( userDB.id );


        res.json({
            ok: true,
            user: userDB,
            token
        });


    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Internal Error'
        });
    }

}


// renewToken
export const renewToken = async(req: any, res: any) => {

    const uid = req.uid;

    // Get a new Token
    const token = await getToken( uid );

    // Get user by Uid
    const user = await User.findById( uid );

    res.json({
        ok: true,
        user,
        token,
    })
}


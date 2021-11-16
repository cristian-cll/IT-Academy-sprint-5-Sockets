import { verify } from "jsonwebtoken";

interface UserPayload {
    uid: string;
}

export const validateJWT = ( req: any, res: any, next: any ) => {

    try {
        
        const token = req.header('x-token');

        if ( !token ) {
            return res.status(401).json({
                ok: false,
                msg: 'No token provided'
            });
        }

        const payload = verify( token,
            process.env.JWT_KEY as string
          ) as UserPayload;

        req.uid = payload.uid;

        next();

    } catch (e) {
        return res.status(401).json({
            ok: false,
            msg: 'Invalid Token'
        });
    }



}


























/* import VerifyAccessToken from "../src/shared/application/security/VerifyAccessToken";
import User from "../src/users/domain/User";
import { Request } from 'express';

interface RequestWithUser extends Request {
    user: User;
  }

export default (dependencies: { Authentication: any; }) => {

   
    // Dependencies
    const { Authentication } = dependencies;
    
    // Injecting dependencies
    const verifyAccessCommand = VerifyAccessToken(Authentication);



    // Individual authorization for user
    const authSingle = async (req:any, res:any, next:any) => {

        // Extract authorization header, token and playerId

        const cookies = req.cookies;

        if (!cookies && !cookies.Authorization) return res.status(403).json("Access denied.");

        const token = cookies.Authorization;



        // Call use case
        try {
            const userDecoded = await verifyAccessCommand(token);
            req.user = userDecoded;
            //if (!userDecoded) return res.status(403).json("This token is not valid for this ID.");
            next();
        } catch (error) {
            next(error);
        }
    }

    

    return {
        authSingle
    };
} */


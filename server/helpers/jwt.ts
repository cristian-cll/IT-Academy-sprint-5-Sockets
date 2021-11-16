import { sign, verify, Secret} from "jsonwebtoken";


export const getToken = ( uid: string ) => {

    return new Promise(  ( resolve, reject ) => {

        const payload = { uid };

        sign( payload, process.env.JWT_KEY as string, {
            expiresIn: '24h'
        }, ( err, token ) => {

            if ( err ) {
                console.log(err);
                reject('Cannot generate JWT');
            } else {
                resolve( token );
            }

        });
    });
    
}

interface UserPayload {
    uid: string;
}

export const checkToken = ( token: string    ) => {

    try {
    
        const payload = verify( token,
            process.env.JWT_KEY as string
          ) as UserPayload;

        return [ true, payload.uid ];

    } catch (error : any) {
        console.log("err", error.message, token);
        return [ false, null ];
    }

}
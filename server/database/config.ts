import { connect } from "mongoose";

export const dbConnection = async() => {

    try {
        
        await connect( process.env.MONGO_URL as string );

        console.log('Db connexion successfully.');

    } catch (error) {
        console.log(error);
        throw new Error('Error connecting database');
    }

}
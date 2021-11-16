import { Schema, model } from "mongoose";


const UserSchema = new Schema({

    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: false,
    },
    online: {
        type: Boolean,
        default: false
    },
    avatar: {
        type: String,
        required: true
    },
    auth: {
        type: Object,
        required: false
    }

});


UserSchema.method('toJSON', function() {
    const { __v, _id, password, ...object } = this.toObject();
    object.uid = _id;
    return object;
});


export const User = model('User', UserSchema );

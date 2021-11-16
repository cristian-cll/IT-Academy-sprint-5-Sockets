import { Schema, model } from "mongoose";


const ChannelSchema = new Schema({

    name: {
        type: String,
        minlength: 2,
        maxlength: 20,
    },
    type: {
        type: String,
    },
},{
    timestamps: true
});


ChannelSchema.method('toJSON', function() {
    const { __v, _id, ...object } = this.toObject();
    object.uid = _id;
    return object;
});


export const Channel = model('Channel', ChannelSchema );

import { Message } from "../models/message";

export const getConversation = async( req: any, res: any ) => {

    const myId = req.uid;
    const messageFrom = req.params.from;

    const last10 = await Message.find({
        $or: [
            { from: myId, to: messageFrom },
            { from: messageFrom, to: myId },
        ]
    })
    .sort({ createdAt: -1 })
    .limit(10);



    res.json({
        ok: true,
        messages: last10
    });


}
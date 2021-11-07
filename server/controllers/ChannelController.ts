import { Channel } from "../models/channel";
import { User } from "../models/user";


export async function createChannel(payload: any) {
		try {

			const { name } = payload;

			const isChannelExist = await Channel.findOne({ name });
	
			if (isChannelExist) {
				console.log("Name already in use");
				return;
			}
	
			const channel:any = new Channel({name});
			channel.type = "channel";
			await channel.save();
	
			return channel;
		} catch (err) {
			console.log(err);
			return false;
		}
}

export async function getUserName(req: any, res: any) {
		try {
			const id = req.params.id;
			const user = await User.findById(id);
			if (!user) {
				return res.status(404).json({ ok: false, msg: "User not found" });
			}
	
			return res.json({
				ok: true,
				user,
			});
		} catch (err) {
			console.log(err);
			return res.status(500).json(err);
		}
	}
	
export const getChannels = async () => {
		const channels = await Channel.find();
		return channels;
};
	
export async function getChannel(req: any, res: any) {
		try {
			const name = req.params.name;
	
			const existingChannel = await Channel.findOne({ name });
			if (existingChannel) {
				return res.json({
					ok: false,
					message: name,
				});
			} else {
				return res.json({
					ok: true,
					message: name,
				});
			}
		} catch (err) {
			console.log(err);
			res.status(500).json({ ok: false, msg: "Something went wrong" });
			return false;
		}
	}

	export const channelsList = async () => {
		try {
			const channels = await Channel.find();
			return channels;
		} catch (err) {
			console.log(err);
		}
	};
import React, { useState, useContext } from "react";
import Swal from "sweetalert2";
import { socketEvents } from "../../config/socketEvents";

import { SocketContext } from "../../context/SocketContext";
import { fetchWithToken } from "../../helpers/fetch";

export const CreateChannel = () => {
	const [name, setName] = useState("");

	const { socket } : any = useContext( SocketContext );

	const onChange = ({ target } : { target: any }) => {
		setName(target.value);
	};

	const onSubmit = async (ev: { preventDefault: () => void; }) => {
		ev.preventDefault();
		
		if(name.length < 2 || name.length > 20) return Swal.fire("Error", "Minimum 2 characters and maximum 20 characters" , "error");

		const resp = await fetchWithToken(`channel/${name}`);

		if (!resp.ok) return Swal.fire("Name in use", "Try another name" , "error");

		socket.emit(socketEvents.CLIENT.CHANNEL_CREATED, {
			name,
		});

		setName("");
		
	};

	return (
		<form onSubmit={onSubmit}>
			<div className="input-group mb-3">
				<input
					type="text"
					className="form-control outline-primary"
					style={{"border": "none"}}
					placeholder="Create a channel"
					aria-label="Create a channel"
					aria-describedby="button-addon2"
					value={name}
					onChange={onChange}
				/>
				<button
					className="btn"
					style={{"border": "1px solid #CCCCCC"}}
					type="submit"
					id="button-addon2"
				>
				+
				</button>
			</div>
		</form>
	);
};
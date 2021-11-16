import React from 'react';
import GoogleLogin from 'react-google-login';
import { login } from '../../helpers/googleAuth';

import './googleLogin.css';

export const Google = ({informParent = (f:any) => f}) => {
  
	const responseGoogle = async (authResult:any) => {

		try {
		if (authResult['code']) {
			const result = await login(authResult['code']);

			informParent(result);
		} else {
			throw new Error(authResult);
		}
		} catch (e) {
		console.log(e); 
		}
	};

	return (
		
		<GoogleLogin
			// use your client id here
			clientId={process.env.REACT_APP_GOOGLE_ID as string}
			buttonText="Login with google"
			responseType="code"

			render={(renderProps) => (
			<button
				onClick={renderProps.onClick}
				disabled={renderProps.disabled}
				className="btn btn-danger btn-lg btn-block login-page"
			>
				<i className="fab fa-google p-2"></i>Login with Google
			</button>
			)}
			redirectUri={process.env.REACT_APP_GOOGLE_REDIRECT_URI as string}
			onSuccess={responseGoogle}
			onFailure={responseGoogle}
			cookiePolicy={'single_host_origin'}
		/>
		
	);
};
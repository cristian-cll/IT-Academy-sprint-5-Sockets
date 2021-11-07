declare global {
    namespace NodeJS {
		interface ProcessEnv {
			GOOGLE_CLIENT_ID: string;
			GOOGLE_CLIENT_SECRET: string;
			GOOGLE_REDIRECT_URI: string;
			NODE_ENV: 'development' | 'production';
			PORT?: number | string | undefined;
			MONGO_URL: string;
			JWT_KEY?: any;
		}
    }
}
  
// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {}
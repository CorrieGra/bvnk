declare namespace NodeJS {
	interface ProcessEnv {
		readonly PORT: number;
		readonly REACT_APP_REQUEST_TIMEOUT: number;
		readonly REACT_APP_API_URL: string;
		readonly REACT_APP_MODE: 'development' | 'production';
	}
}

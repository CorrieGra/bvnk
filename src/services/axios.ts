import axios from 'axios';

export const AxiosInstance = axios.create({
	baseURL: 'https://api.sandbox.bvnk.com/api/v1/',
	timeout: 10000,
});

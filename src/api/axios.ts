import axios from "axios";

const BASE_URL = 'http://localhost:8080';

const baseReqApi = axios.create({
  baseURL: BASE_URL,
});

axios.interceptors.response.use(
	(res) => {
		if (res.data.token) {
			localStorage.set({ key: "authToken", persist: false })
		}
    return res;
	},
	(error) => {
    return Promise.reject(error);
	}
);

export default baseReqApi;
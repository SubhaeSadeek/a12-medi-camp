import axios from "axios";

const axiosSecure = axios.create({
	baseURL: "http://localhost:5001",
});

axiosSecure.interceptors.request.use(
	(config) => {
		const token = localStorage.getItem("user-token");
		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
			console.log("Token added to header:", config.headers);
		} else {
			console.log("no token found");
		}
		return config;
	},
	(error) => Promise.reject(error)
);

axiosSecure.interceptors.response.use(
	(response) => response,
	(error) => Promise.reject(error)
);

const useAxiosSecure = () => {
	return axiosSecure;
};

export default useAxiosSecure;

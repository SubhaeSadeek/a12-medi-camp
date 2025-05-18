import axios from "axios";

const axiosPublic = axios.create({
	baseURL: "https://a12-server-lyart.vercel.app",
});

const useAxiosPublic = () => {
	return axiosPublic;
};

export default useAxiosPublic;

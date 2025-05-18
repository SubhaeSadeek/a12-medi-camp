import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import Loading from "../components/shared/Loading";
import { AuthContext } from "../providers/AuthProvider";

const PrivateRoute = ({ children }) => {
	const { user, loading } = useContext(AuthContext);
	const location = useLocation();
	if (loading) {
		return <Loading></Loading>;
	}
	if (user && user?.email) {
		return children;
	}
	return <Navigate state={location.pathname} to={"/logIn"}></Navigate>;
};

export default PrivateRoute;

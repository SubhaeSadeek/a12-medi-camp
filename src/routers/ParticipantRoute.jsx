import { Navigate, useLocation } from "react-router-dom";
import Loading from "../components/shared/Loading";
import useAdmin from "../hooks/useAdmin";
import useAuth from "../hooks/useAuth";

const ParticipantRoute = ({ children }) => {
	const { user, loading } = useAuth();
	const [isAdmin, isAdminLoading] = useAdmin();
	const location = useLocation();
	if (loading || isAdminLoading) {
		return <Loading></Loading>;
	}
	if (user && !isAdmin) {
		return children;
	}
	return <Navigate state={location.pathname} to={"/"}></Navigate>;
};

export default ParticipantRoute;

import { Toaster } from "react-hot-toast";
import { Outlet, useLocation } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const Layout = () => {
	const location = useLocation();

	const noHeaderFooter =
		location.pathname.includes("login") ||
		location.pathname.includes("register");
	return (
		<div>
			<Toaster></Toaster>
			{noHeaderFooter || <Navbar></Navbar>}
			<Outlet></Outlet>
			{noHeaderFooter || <Footer></Footer>}
		</div>
	);
};

export default Layout;

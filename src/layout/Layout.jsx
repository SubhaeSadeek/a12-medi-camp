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
		<>
			<Toaster></Toaster>
			{noHeaderFooter || <Navbar></Navbar>}
			<div className="container mx-auto min-h-dvh mt-1">
				<Outlet></Outlet>
			</div>
			{noHeaderFooter || <Footer></Footer>}
		</>
	);
};

export default Layout;

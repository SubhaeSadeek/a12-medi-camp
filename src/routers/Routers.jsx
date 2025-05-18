import { createBrowserRouter } from "react-router-dom";
import CampDetails from "../components/CampDetail";
import Error from "../components/Error";
import Layout from "../layout/Layout";
import AvailableCamp from "../pages/AvailableCamp";
import Home from "../pages/Home";
import Login from "../pages/Login";
import OurMission from "../pages/OurMission";
import Register from "../pages/Register";

const Routers = createBrowserRouter([
	{
		path: "/",
		element: <Layout></Layout>,
		errorElement: <Error></Error>,
		children: [
			{
				path: "",
				element: <Home></Home>,
			},
			{
				path: "camp-details/:id",
				element: <CampDetails></CampDetails>,
			},

			{
				path: "login",
				element: <Login></Login>,
			},
			{
				path: "available-camps",
				element: <AvailableCamp></AvailableCamp>,
			},
			{
				path: "register",
				element: <Register></Register>,
			},
			{
				path: "our-mission",
				element: <OurMission></OurMission>,
			},
		],
	},
]);
export default Routers;

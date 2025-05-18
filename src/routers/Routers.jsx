import { createBrowserRouter } from "react-router-dom";
import CampDetails from "../components/CampDetail";
import Error from "../components/Error";
import Layout from "../layout/Layout";
import Home from "../pages/Home";
import Login from "../pages/Login";
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
				path: "register",
				element: <Register></Register>,
			},
		],
	},
]);
export default Routers;

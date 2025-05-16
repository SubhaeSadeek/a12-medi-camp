import { createBrowserRouter } from "react-router-dom";
import Error from "../components/Error";
import Layout from "../layout/Layout";
import Home from "../pages/Home";
import Login from "../pages/Login";

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
				path: "login",
				element: <Login></Login>,
			},
		],
	},
]);
export default Routers;

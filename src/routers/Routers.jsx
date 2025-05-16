import { createBrowserRouter } from "react-router-dom";
import Error from "../components/Error";
import Layout from "../layout/Layout";
import Home from "../pages/Home";

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
		],
	},
]);
export default Routers;

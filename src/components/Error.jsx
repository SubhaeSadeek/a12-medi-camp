import { Link, useRouteError } from "react-router-dom";
import errorImg from "../assets/page-not-found.png";

const Error = () => {
	const error = useRouteError();

	return (
		<div className="flex justify-center items-center min-h-screen">
			<div className="w-2/3 flex flex-col justify-center items-center">
				<img src={errorImg} alt="" />
				<h1 className="text-base md:text-2xl text-themeText font-semibold">
					Oh Snap - Where the Page Gone, Buddy??
				</h1>
				<h3 className="text-sm md:text-xl text-fuchsia-700">
					Error Status: {error.status}
				</h3>
				<h3 className="text-amber-600">{error.data}</h3>

				<Link to={"/"}>
					<button className="btn btn-accent text-white">Returning Home</button>
				</Link>
			</div>
		</div>
	);
};

export default Error;

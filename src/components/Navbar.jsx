import { Link, NavLink, useNavigate } from "react-router-dom";

import useAuth from "../hooks/useAuth";

const Navbar = () => {
	const { user, isAdmin, logOut } = useAuth();
	console.log(user);

	const navigate = useNavigate();
	const signOutUsers = () => {
		logOut()
			.then(() => {
				console.log("signed out successfully");
			})
			.catch((error) => {
				console.log("Error while signed out", error);
			});
		navigate("");
	};
	const navigationLink = (
		<>
			<li>
				<NavLink
					to={"/"}
					style={({ isActive }) => {
						return {
							fontWeight: isActive ? "bold" : "",
							color: isActive ? "red" : "",
							textDecoration: isActive ? "underline" : "",
							marginRight: "1rem",
						};
					}}
				>
					Home
				</NavLink>
			</li>
			<li>
				<NavLink
					to={"/available-camps"}
					style={({ isActive }) => {
						return {
							fontWeight: isActive ? "bold" : "",
							color: isActive ? "red" : "",
							textDecoration: isActive ? "underline" : "",
							marginRight: "1rem",
						};
					}}
				>
					Available Camps
				</NavLink>
			</li>
			{user ? (
				isAdmin ? (
					<>
						<li>
							<NavLink
								to={"/dashboard/organizer-profile"}
								style={({ isActive }) => {
									return {
										fontWeight: isActive ? "bold" : "",
										color: isActive ? "red" : "",
										textDecoration: isActive ? "underline" : "",
										marginRight: "1rem",
									};
								}}
							>
								Profile
							</NavLink>
						</li>
						<li>
							<NavLink
								to={"/dashboard/organizer-overview"}
								style={({ isActive }) => {
									return {
										fontWeight: isActive ? "bold" : "",
										color: isActive ? "red" : "",
										textDecoration: isActive ? "underline" : "",
										marginRight: "1rem",
									};
								}}
							>
								Overview
							</NavLink>
						</li>
					</>
				) : (
					<>
						<li>
							<NavLink
								to={"/dashboard/participant-profile"}
								style={({ isActive }) => {
									return {
										fontWeight: isActive ? "bold" : "",
										color: isActive ? "red" : "",
										textDecoration: isActive ? "underline" : "",
										marginRight: "1rem",
									};
								}}
							>
								Profile
							</NavLink>
						</li>
						<li>
							<NavLink
								to={"/dashboard/participant-overview"}
								style={({ isActive }) => {
									return {
										fontWeight: isActive ? "bold" : "",
										color: isActive ? "red" : "",
										textDecoration: isActive ? "underline" : "",
										marginRight: "1rem",
									};
								}}
							>
								Overview
							</NavLink>
						</li>
					</>
				)
			) : (
				""
			)}
		</>
	);
	return (
		<div className="navbar bg-indigo-600/60 shadow-sm">
			<div className="navbar-start">
				<div className="dropdown">
					<div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="h-5 w-5"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							{" "}
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d="M4 6h16M4 12h8m-8 6h16"
							/>{" "}
						</svg>
					</div>
					<ul
						tabIndex={0}
						className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
					>
						{navigationLink}
					</ul>
				</div>
				<NavLink
					to={"/"}
					className="text-xl font-bold cursor-pointer hover:scale-110  hover:bg-white/30 hover:p-2 hover:rounded-badge duration-500"
				>
					MediCamp
				</NavLink>
			</div>
			<div className="navbar-center hidden lg:flex">
				<ul className=" menu-horizontal px-1">{navigationLink}</ul>
			</div>
			<div className="navbar-end gap-1.5">
				{user ? (
					<div className="dropdown dropdown-end">
						<div
							tabIndex={0}
							role="button"
							className="btn btn-ghost btn-circle avatar"
						>
							<div className="w-10 rounded-full">
								<img referrerPolicy="no-referrer" alt="" src={user?.photoURL} />
							</div>
						</div>
						<ul
							tabIndex={0}
							className="menu menu-sm font-semibold dropdown-content rounded-box mt-3 space-y-2 w-40 p-2 text-xl shadow z-50"
						>
							<button disabled className="text-start ml-3">
								<a>{user?.displayName}</a>
							</button>
							{user && isAdmin && (
								<li>
									<Link
										className="text-xl"
										to={"/dashboard/organizer-overview"}
									>
										Dashboard
									</Link>
								</li>
							)}
							{user && !isAdmin && (
								<li>
									<Link
										className="text-xl"
										to={"/dashboard/participant-overview"}
									>
										Dashboard
									</Link>
								</li>
							)}
							<li>
								<button className="text-xl uppercase" onClick={signOutUsers}>
									Sign Out
								</button>
							</li>
						</ul>
					</div>
				) : (
					<Link to={"/logIn"} className="btn bg-primary font-bold">
						Join Us
					</Link>
				)}
			</div>
		</div>
	);
};

export default Navbar;

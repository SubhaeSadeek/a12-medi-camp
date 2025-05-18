import { FaBars } from "react-icons/fa";
import {
	FaCreditCard,
	FaList,
	FaListCheck,
	FaPlus,
	FaUser,
} from "react-icons/fa6";
import { ImStatsBars } from "react-icons/im";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import useAdmin from "../hooks/useAdmin";
import useAuth from "../hooks/useAuth";
const Dashboard = () => {
	const [isAdmin] = useAdmin();
	const { logOut } = useAuth();
	const navigate = useNavigate();
	const navLinkStyles = ({ isActive }) =>
		`flex justify-start pl-2 btn btn-ghost mb-3 font-bold uppercase ${
			isActive ? "text-primary" : "text-white"
		}`;
	const handleLogOut = () => {
		logOut();
		navigate("/");
	};
	return (
		<div className="drawer lg:drawer-open">
			<input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
			<div className="drawer-content flex flex-col lg:px-10 dark:bg-[#121212] dark:text-white">
				<Outlet></Outlet>
				<label
					htmlFor="my-drawer-2"
					className="lg:hidden fixed top-1 left-1 z-50"
				>
					<FaBars className="text-3xl" />
				</label>
			</div>
			<div className="drawer-side">
				<label
					htmlFor="my-drawer-2"
					aria-label="close sidebar"
					className="drawer-overlay"
				></label>
				<ul className="menu bg-slate-800 min-h-screen w-70 p-4">
					<Link
						to={"/"}
						className="flex items-center  gap-2 text-2xl font-bold text-amber-500"
					>
						<img className="mt-4 w-1/6  drop-shadow-xl" src={logo} alt="" />
						<p>MediCamp</p>
					</Link>
					<div className="divider divider-info mb-10"></div>
					{/* Sidebar content here */}
					{isAdmin ? (
						<>
							<li>
								<NavLink
									to={"/dashboard/organizer-overview"}
									className={navLinkStyles}
								>
									<ImStatsBars className="text-3xl" /> Overview
								</NavLink>
							</li>
							<li>
								<NavLink
									to={"/dashboard/organizer-profile"}
									className={navLinkStyles}
								>
									<FaUser className="text-3xl" />
									Profile
								</NavLink>
							</li>
							<li>
								<NavLink to={"/dashboard/add-camp"} className={navLinkStyles}>
									<FaPlus className="text-3xl" /> Add A Camp
								</NavLink>
							</li>
							<li>
								<NavLink
									to={"/dashboard/manage-camps"}
									className={navLinkStyles}
								>
									<FaList className="text-3xl" />
									Manage Camps
								</NavLink>
							</li>
							<li>
								<NavLink
									to={"/dashboard/manage-registered-camps"}
									className={navLinkStyles}
								>
									<FaListCheck className="text-3xl" />
									Manage Registered Camps
								</NavLink>
							</li>
						</>
					) : (
						<>
							<li>
								<NavLink
									to={"/dashboard/participant-general"}
									className={navLinkStyles}
								>
									<ImStatsBars className="text-3xl" /> Overview
								</NavLink>
							</li>
							<li>
								<NavLink
									to={"/dashboard/participant-profile"}
									className={navLinkStyles}
								>
									<FaUser className="text-3xl" /> Profile
								</NavLink>
							</li>
							<li>
								<NavLink
									to={"/dashboard/registered-camps"}
									className={navLinkStyles}
								>
									<FaListCheck className="text-3xl" />
									Registered Camps
								</NavLink>
							</li>
							<li>
								<NavLink
									to={"/dashboard/payment-history"}
									className={navLinkStyles}
								>
									<FaCreditCard className="text-3xl" /> Payment History
								</NavLink>
							</li>
						</>
					)}
					<>
						<li className="absolute bottom-20">
							<NavLink
								to={"/"}
								className="btn btn-ghost text-primary text-xl uppercase font-semibold"
							>
								Home
							</NavLink>
						</li>
						<li className="absolute bottom-6" onClick={handleLogOut}>
							<NavLink className="btn btn-ghost border-none text-primary  text-xl uppercase font-semibold">
								Logout
							</NavLink>
						</li>
					</>
				</ul>
			</div>
		</div>
	);
};

export default Dashboard;

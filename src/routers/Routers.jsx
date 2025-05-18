import { createBrowserRouter } from "react-router-dom";
import CampDetails from "../components/CampDetail";
import Error from "../components/Error";
import OrganizerOverview from "../dashboard/organiser/OrganizerOverview";
import OrganizerProfile from "../dashboard/organiser/OrganizerProfile";
import ParticipantCampEntry from "../dashboard/partcipant/ParticipantCampEntry";
import ParticipantGeneral from "../dashboard/partcipant/ParticipantGeneral";
import ParticipantProfile from "../dashboard/partcipant/ParticipantProfile";
import Dashboard from "../layout/Dashboard";
import Layout from "../layout/Layout";
import AvailableCamp from "../pages/AvailableCamp";
import Home from "../pages/Home";
import Login from "../pages/Login";
import OurMission from "../pages/OurMission";
import Register from "../pages/Register";
import AdminRoute from "./AdminRoute";
import ParticipantRoute from "./ParticipantRoute";
import PrivateRoute from "./PrivateRoute";

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
	/* dashboard routes */
	{
		path: "dashboard",
		element: (
			<PrivateRoute>
				<Dashboard></Dashboard>
			</PrivateRoute>
		),
		errorElement: <Error></Error>,
		children: [
			{
				path: "participant-general",
				element: (
					<ParticipantRoute>
						<ParticipantGeneral></ParticipantGeneral>
					</ParticipantRoute>
				),
			},
			{
				path: "participant-profile",
				element: (
					<ParticipantRoute>
						<ParticipantProfile></ParticipantProfile>
					</ParticipantRoute>
				),
			},
			{
				path: "registered-camps",
				element: (
					<ParticipantRoute>
						<ParticipantCampEntry></ParticipantCampEntry>
					</ParticipantRoute>
				),
			},
			{
				path: "organizer-profile",
				element: (
					<AdminRoute>
						<OrganizerProfile></OrganizerProfile>
					</AdminRoute>
				),
			},
			{
				path: "organizer-overview",
				element: (
					<AdminRoute>
						<OrganizerOverview></OrganizerOverview>
					</AdminRoute>
				),
			},
		],
	},
]);
export default Routers;

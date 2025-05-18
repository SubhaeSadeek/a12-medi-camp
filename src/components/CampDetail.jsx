import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import moment from "moment";
import { Helmet } from "react-helmet-async";
import { FaCalendarAlt, FaClock, FaDollarSign, FaUsers } from "react-icons/fa";
import { FaLocationDot, FaUserDoctor } from "react-icons/fa6";
import { useParams } from "react-router-dom";
import JoinCampModal from "../../components/Modal/JoinCampModal";
import useAuth from "../../hooks/useAuth";

const CampDetails = () => {
	const { user } = useAuth();
	const { id } = useParams();
	const { data: camp = [], refetch } = useQuery({
		queryKey: ["camp", id],
		queryFn: async () => {
			const res = await axios.get(
				`https://medi-camp-server-opal.vercel.app/camp/${id}`
			);
			return res.data;
		},
	});
	const {
		_id,
		campName,
		image,
		campFees,
		dateTime,
		location,
		healthcareProfessionalName,
		participantCount,
		description,
	} = camp;
	const formatedDate = moment(dateTime).format("L");
	const formatedTime = moment(dateTime).format("LT");
	return (
		<section className="my-16 max-w-7xl mx-auto px-2">
			<Helmet>
				<title>MediCamp | Camp Details</title>
			</Helmet>
			<div className="card rounded-none flex bg-white dark:bg-slate-900 shadow-card-shadow p-6">
				<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
					<div>
						<figure>
							<img className="" src={image} alt="camp" />
						</figure>
					</div>
					<div>
						<div className="flex-1 text-2xl font-semibold space-y-4 pt-0">
							<h2 className="card-title text-secondary dark:text-primary text-4xl">
								{campName}
							</h2>
							<p className="flex items-center gap-1">
								<FaCalendarAlt />
								Date:{" "}
								<span className="font-medium text-description dark:text-gray-200">
									{formatedDate}
								</span>
							</p>
							<p className="flex items-center gap-1">
								<FaClock />
								Time:{" "}
								<span className="font-medium text-description dark:text-gray-200">
									{formatedTime}
								</span>
							</p>
							<p className="flex items-center gap-1">
								<FaLocationDot />
								Location:{" "}
								<span className="font-medium text-description dark:text-gray-200">
									{location}
								</span>
							</p>
							<p className="font-semibold flex items-center">
								<FaDollarSign className="text-[28px]" />
								Camp Fee:
								<span className="font-medium text-description dark:text-gray-200 ml-1">
									${campFees}/per person
								</span>
							</p>

							<p className="flex items-center gap-1">
								<FaUserDoctor />
								Medic:{" "}
								<span className="font-medium text-description dark:text-gray-200">
									{healthcareProfessionalName}
								</span>
							</p>
							<p className="flex items-center gap-1">
								<FaUsers />
								Participant:{" "}
								<span className="font-medium text-description dark:text-gray-200">
									{participantCount}
								</span>
							</p>
						</div>
						<div className="flex justify-end px-6">
							<JoinCampModal camp={camp} refetch={refetch}></JoinCampModal>
						</div>
					</div>
				</div>
				<div className="divider px-5"></div>
				<div>
					<p className="text-3xl font-semibold">Description:</p>
					<p className="text-description dark:text-gray-200 text-xl mt-2">
						{description}
					</p>
				</div>
			</div>
		</section>
	);
};

export default CampDetails;

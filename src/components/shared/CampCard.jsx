import moment from "moment";

import { FaCalendar, FaDollarSign, FaUserClock } from "react-icons/fa";
import { FaMapLocation, FaPerson, FaUserDoctor } from "react-icons/fa6";
import { Link } from "react-router-dom";
import BtnPrime from "./BtnPrime";

const CampCard = ({ item }) => {
	const {
		_id,
		title,
		imageUrl,
		fees,
		dateTime,
		location,
		assignedDoctor,
		participantCount,
		description,
	} = item || {};
	const date = moment(dateTime).format("L");
	const time = moment(dateTime).format("LT");
	return (
		<div className="card h-[100%] flex shadow-card-shadow">
			<div className="">
				<figure>
					<img
						className="aspect-video object-cover w-full mb-2"
						src={imageUrl}
						alt="camp"
					/>
				</figure>
			</div>
			<div className="card-body  p-6 flex-1 space-y-1 pt-0 ">
				<div className="flex justify-around">
					<p className="flex items-center gap-1 text-gray-500">
						<FaCalendar className="text-indigo-600" /> {date}
					</p>
					<p className="flex items-center justify-end gap-1 text-gray-500">
						<FaUserClock className="text-indigo-600" /> {time}
					</p>
				</div>

				<h2 className=" text-xl font-semibold text-indigo-400">{title}</h2>
				{/* <div className="divider divider-info"></div> */}
				<p className="flex items-center gap-1 text-gray-800 font-bold ">
					<FaUserDoctor className="text-indigo-600" />
					{assignedDoctor}
				</p>
				<p className="flex items-center gap-1  text-gray-700 font-semibold">
					<FaPerson className="text-indigo-600" />
					{participantCount}
				</p>
				<p className="flex items-center   gap-1  text-gray-700 font-semibold">
					<FaDollarSign className="text-indigo-600" />
					{fees}
				</p>
				<p className=" flex items-center gap-1">
					<FaMapLocation className="text-indigo-600" /> {location}
				</p>
				<p className="">{description.slice(0, 150)}...</p>
			</div>
			<div className="flex justify-end px-6 pb-6">
				<Link to={`/camp-details/${_id}`}>
					<BtnPrime btnText={"Detail"}></BtnPrime>
				</Link>
			</div>
		</div>
	);
};

export default CampCard;

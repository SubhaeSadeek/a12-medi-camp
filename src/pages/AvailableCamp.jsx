import { useQuery } from "@tanstack/react-query";
import moment from "moment";
import { useState } from "react";
import {
	FaCalendar,
	FaDollarSign,
	FaTh,
	FaThLarge,
	FaUserClock,
} from "react-icons/fa";
import { FaMapLocation, FaPerson, FaUserDoctor } from "react-icons/fa6";
import { Link } from "react-router-dom";
import Select from "react-select";
import Search from "../components/Search";
import BtnPrime from "../components/shared/BtnPrime";
import Loading from "../components/shared/Loading";
import useAxiosPublic from "../hooks/useAxiosPublic";

const AvailableCamp = () => {
	const [search, setSearch] = useState("");
	const [sortBy, setSortBy] = useState("byAlphabet");
	const [layout, setLayout] = useState("three-columns");
	const axiosPublic = useAxiosPublic();

	const { data: camps, isLoading } = useQuery({
		queryKey: ["camps"],
		queryFn: async () => {
			const res = await axiosPublic.get("/camps");
			return res.data;
		},
	});

	if (isLoading) return <Loading></Loading>;

	const campSorted = Array.isArray(camps)
		? camps.sort((a, b) => {
				if (sortBy === "byAlphabet") {
					return a.title?.localeCompare(b.title) || 0;
				}
				if (sortBy === "topRegisteredCamps") {
					const aParticipants = a.participantCount || 0;
					const bParticipants = b.participantCount || 0;
					return bParticipants - aParticipants;
				}
				if (sortBy === "fees") {
					const aFees = a.fees || 0;
					const bFees = b.fees || 0;
					return aFees - bFees;
				}
				return 0;
		  })
		: [];

	const filteredCamps = search
		? campSorted.filter(
				(camp) =>
					camp.title?.toLowerCase().includes(search.toLowerCase()) ||
					camp.location?.toLowerCase().includes(search.toLowerCase())
		  )
		: campSorted;

	const options = [
		{ value: "byAlphabet", label: "A - Z" },
		{ value: "topRegisteredCamps", label: "Most Registered" },
		{ value: "fees", label: "Fees" },
	];

	const handleSortChange = (selectedOption) => {
		setSortBy(selectedOption.value);
	};

	const toggleLayout = () => {
		setLayout(layout === "three-columns" ? "two-columns" : "three-columns");
	};

	return (
		<div className="max-w-screen-xl mx-auto my-8 px-4 min-h-screen">
			<div className="flex flex-col md:flex-row items-center justify-between mb-6">
				<div className="mt-4 w-full md:w-2/4">
					<Search onSearch={setSearch} />
				</div>
				<div className="hidden md:flex flex-1 justify-end mb-6 mr-4 mt-6">
					<button
						onClick={toggleLayout}
						className="py-2 px-4 bg-primary text-white rounded-md hover:bg-accent"
					>
						{layout === "three-columns" ? (
							<FaTh className="text-xl" />
						) : (
							<FaThLarge className="text-xl" />
						)}
					</button>
				</div>
				<Select
					value={options.find((option) => option.value === sortBy)}
					onChange={handleSortChange}
					options={options}
					className="react-select-container"
					classNamePrefix="react-select"
				/>
			</div>

			<div
				className={`grid gap-6 grid-cols-1 ${
					layout === "three-columns" ? "md:grid-cols-3" : "md:grid-cols-2"
				}`}
			>
				{filteredCamps.length === 0 ? (
					<p className="col-span-full text-center text-4xl">
						No camps found based on your search criteria.
					</p>
				) : (
					filteredCamps.map((camp) => (
						<div
							key={camp._id}
							className="shadow-lg rounded-md overflow-hidden flex flex-col"
						>
							<img
								src={camp.imageUrl}
								alt={camp.title}
								className="w-full h-48 object-cover"
							/>
							<div className="card-body  p-6 flex-1 space-y-1 pt-0 ">
								<div className="flex justify-around">
									<p className="flex items-center gap-1 text-gray-500">
										<FaCalendar className="text-indigo-600" />{" "}
										{moment(camp.dateTime).format("L")}
									</p>
									<p className="flex items-center justify-end gap-1 text-gray-500">
										<FaUserClock className="text-indigo-600" />{" "}
										{moment(camp.dateTime).format("LT")}
									</p>
								</div>

								<h2 className=" text-xl font-semibold text-indigo-400">
									{camp.title}
								</h2>
								{/* <div className="divider divider-info"></div> */}
								<p className="flex items-center gap-1 text-gray-800 font-bold ">
									<FaUserDoctor className="text-indigo-600" />
									{camp.assignedDoctor}
								</p>
								<p className="flex items-center gap-1  text-gray-700 font-semibold">
									<FaPerson className="text-indigo-600" />
									{camp.participantCount}
								</p>
								<p className="flex items-center   gap-1  text-gray-700 font-semibold">
									<FaDollarSign className="text-indigo-600" />
									{camp.fees}
								</p>
								<p className=" flex items-center gap-1">
									<FaMapLocation className="text-indigo-600" /> {camp.location}
								</p>
								<p className="">{camp.description.slice(0, 150)}...</p>
							</div>
							<div className="flex justify-end px-6 pb-6">
								<Link to={`/camp-details/${camp._id}`}>
									<BtnPrime btnText={"Detail"}></BtnPrime>
								</Link>
							</div>
						</div>
					))
				)}
			</div>
		</div>
	);
};

export default AvailableCamp;

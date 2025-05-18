import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { BiX } from "react-icons/bi";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import FeedbackModal from "../../components/modal/feedbackModal";
import SectionTitle from "../../components/shared/SectionTitle";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useTitle from "../../hooks/useTitle";

const ParticipantCampEntry = () => {
	useTitle("All Registered Entries");
	const { user } = useAuth();
	const axiosSecure = useAxiosSecure();

	const [page, setPage] = useState(1);
	const [limit] = useState(10);
	const [search, setSearch] = useState("");

	const {
		data: campEntres = [],

		refetch,
	} = useQuery({
		queryKey: ["campEntres", `${user?.email}`, page, limit, search],
		queryFn: async () => {
			const res = await axiosSecure.get(
				`/registered-camps/${user?.email}?page=${page}&limit=${limit}&search=${search}`
			);
			return res.data;
		},
	});

	const handleDelete = (id) => {
		Swal.fire({
			title: "Are you sure?",
			text: "You won't be able to revert this!",
			icon: "warning",
			showCancelButton: true,
			confirmButtonColor: "#3085d6",
			cancelButtonColor: "#d33",
			confirmButtonText: "Yes, delete it!",
		}).then(async (result) => {
			if (result.isConfirmed) {
				const res = await axiosSecure.delete(`/registered-camps/${id}`);
				if (res.data.deletedCount > 0) {
					Swal.fire({
						title: "Deleted!",
						text: `Camp has been deleted.`,
						icon: "success",
						showCancelButton: false,
						timer: 1500,
					});
					refetch();
				}
			}
		});
	};

	return (
		<div className="p-1 mb-8 mt-16">
			<SectionTitle
				title={"Registered Camps"}
				subTitle={"All camp entries your Registered"}
			></SectionTitle>
			{campEntres?.result?.length > 0 ? (
				<>
					<div className="flex justify-end mb-2">
						<label className="input input-bordered flex items-center gap-2 dark:bg-slate-900 dark:text-white">
							<input
								value={search}
								onChange={(e) => setSearch(e.target.value)}
								type="text"
								className="grow"
								placeholder="Search"
							/>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 16 16"
								fill="currentColor"
								className="h-4 w-4 opacity-70 "
							>
								<path
									fillRule="evenodd"
									d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
									clipRule="evenodd"
								/>
							</svg>
						</label>
					</div>
					<div className="overflow-x-auto shadow-card-shadow dark:shadow-none dark:bg-slate-900">
						<table className="table">
							{/* head */}
							<thead>
								<tr className="bg-primary text-secondary">
									<th></th>
									<th>Camp Name</th>
									<th>Camp Fees</th>
									<th>Participant Name</th>
									<th>Payment Status</th>
									<th>Confirmation Status</th>
									<th>Cancel</th>
									<th>Feedback</th>
								</tr>
							</thead>
							<tbody>
								{/* row 1 */}
								{campEntres.result?.map((camp, idx) => (
									<tr key={camp._id} className="dark:border-gray-600">
										<th>{idx + 1}</th>
										<td>{camp.title}</td>
										<td>${camp.fees}</td>
										<td>{camp.participantName}</td>
										<td>
											<Link
												disabled={camp.paymentStatus === "paid"}
												to={{ pathname: "/dashboard/payment" }}
												state={{
													title: camp.title,
													fees: camp.fees,
													entryCampId: camp._id,
													campId: camp.campId,
													confirmationStatus: camp.confirmationStatus,
												}}
												className={`btn dark:text-gray-500`}
											>
												{camp.paymentStatus === "unpaid" ? "Pay" : "Paid"}
											</Link>
										</td>
										<td>{camp.confirmationStatus}</td>
										<td>
											<button
												disabled={camp.paymentStatus === "paid"}
												className="disabled:text-gray-500 dark:disabled:text-gray-200 text-xl"
												onClick={() => handleDelete(camp._id)}
											>
												<BiX />
											</button>
										</td>
										<td>
											<FeedbackModal camp={camp}></FeedbackModal>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
					<div className="flex justify-center items-center mt-6 space-x-4">
						<button
							className="btn bg-primary border-none px-6 py-2 btn-circle shadow-md hover:bg-primary-hover disabled:opacity-50"
							onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
							disabled={page === 1}
						>
							<span className="text-lg font-semibold">
								<FaChevronLeft />
							</span>
						</button>
						<span className="text-lg btn rounded-none font-bold text-gray-700">
							{page}
						</span>
						<button
							className="btn bg-primary border-none px-6 py-2 btn-circle shadow-md hover:bg-primary-hover disabled:opacity-50"
							onClick={() =>
								setPage((prev) =>
									campEntres.totalPages
										? Math.min(prev + 1, campEntres.totalPages)
										: prev
								)
							}
							disabled={page === campEntres.totalPages}
						>
							<span className="text-lg font-semibold">
								<FaChevronRight />
							</span>
						</button>
					</div>
				</>
			) : (
				<div className="text-3xl sm:text-4xl md:text-5xl font-bold text-red-500 text-center mt-16">
					No data found
				</div>
			)}
		</div>
	);
};

export default ParticipantCampEntry;

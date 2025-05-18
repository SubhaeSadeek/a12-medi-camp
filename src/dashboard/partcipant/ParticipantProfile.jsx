import { useQuery } from "@tanstack/react-query";
import UpdateProfileModal from "../../components/modal/UpdateProfileModal";
import Loading from "../../components/shared/Loading";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useTitle from "../../hooks/useTitle";

const ParticipantProfile = () => {
	useTitle("Participant Profile");
	const { user } = useAuth();
	const axiosSecure = useAxiosSecure();
	const creationDate = new Date(user.metadata.creationTime);
	const formattedDate = creationDate.toLocaleString();
	const {
		data: userData = [],
		isLoading,
		refetch,
	} = useQuery({
		queryKey: ["userData"],
		queryFn: async () => {
			const res = await axiosSecure.get(`/user/${user?.email}`);
			return res.data;
		},
	});
	if (isLoading) {
		return <Loading></Loading>;
	}

	return (
		<div className="px-1">
			<div className="mt-16 shadow-card-shadow dark:shadow-none dark:bg-slate-900 p-10">
				<div className="h-40 bg-gray-200 rounded-t-lg overflow-hidden">
					<img
						src={
							userData.coverPhoto || "https://i.postimg.cc/nLyKfVjd/banner.jpg"
						}
						alt="Cover"
						className="w-full h-full object-cover"
					/>
				</div>

				<div className="flex flex-col md:flex-row items-start md:items-center -mt-16 px-6">
					<div className="avatar mb-4 md:mb-0">
						<div className="ring-primary ring-offset-base-100 w-32 rounded-full ring ring-offset-2">
							<img src={userData.photoURL} alt="Profile" />
						</div>
					</div>
				</div>
				<div className="px-6 pt-2">
					<h2 className="text-2xl font-semibold">{userData.name}</h2>
					<p className="text-gray-600">{userData.email}</p>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8 px-6">
					<div className="space-y-2">
						{userData?.phoneNumber ? (
							<p>
								<span className="font-semibold">Phone:</span>{" "}
								{userData.phoneNumber}
							</p>
						) : (
							<p>
								<span className="font-semibold">Phone:</span> N/A
							</p>
						)}
						{userData?.address ? (
							<p>
								<span className="font-semibold">Address:</span>{" "}
								{userData.address}
							</p>
						) : (
							<p>
								<span className="font-semibold">Address:</span> N/A
							</p>
						)}
					</div>
					<div className="space-y-2">
						<p>
							<span className="font-semibold">Role:</span> Participant
						</p>
						<p>
							<span className="font-semibold">Joined:</span> {formattedDate}
						</p>
					</div>
				</div>

				<div className="mt-8 text-center">
					<UpdateProfileModal refetch={refetch} userData={userData} />
				</div>
			</div>
		</div>
	);
};

export default ParticipantProfile;

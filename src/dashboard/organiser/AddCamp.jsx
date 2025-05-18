import { useState } from "react";
import { useForm } from "react-hook-form";
import { TbFidgetSpinner } from "react-icons/tb";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useTitle from "../../hooks/useTitle";

const _imageHostingKey = import.meta.env.VITE_IBB_IMAGE_UPLOAD_KEY;
const ibbImageHostLink = `https://api.imgbb.com/1/upload?key=${_imageHostingKey}`;
const AddCamp = () => {
	useTitle("Add Camp");
	const { user } = useAuth();
	const axiosSecure = useAxiosSecure();
	const axiosPublic = useAxiosPublic();
	const [loading, setLoading] = useState(false);
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm();
	const onSubmit = async (data) => {
		setLoading(true);
		const imageFile = { image: data.image[0] };
		const res = await axiosPublic.post(ibbImageHostLink, imageFile, {
			headers: {
				"content-type": "multipart/form-data",
			},
		});
		if (res.data.success) {
			const campData = {
				title: data.title,
				fees: parseFloat(data.fees),
				dateTime: data.dateTime,
				participantCount: parseInt(data.participantCount),
				assignedDoctor: data.assignedDoctor,
				location: data.location,
				imageUrl: res.data.data.display_url,
				description: data.description,
				email: user?.email,
			};
			const campRes = await axiosSecure.post("/add-camp", campData);
			if (campRes.data.insertedId) {
				reset();
				setLoading(false);
				Swal.fire({
					title: `Camp is added`,
					icon: "success",
					showCancelButton: false,
					timer: 1500,
				});
			}
		}
	};

	return (
		<div className="flex justify-center items-center min-h-screen w-full max-w-5xl mx-auto text-[#444444] px-1 my-16">
			<div className="card p-4 lg:p-10 w-full border shadow-card-shadow dark:shadow-none dark:bg-slate-900 dark:border-none dark:text-white">
				<h1 className="text-4xl text-center font-bold mb-8">Add A Camp</h1>
				<form onSubmit={handleSubmit(onSubmit)} className="">
					<div className="grid grid-cols-1 md:grid-cols-2 gap-2">
						<div className="form-control">
							<label className="label">
								<span className="text-lg font-semibold">Camp Name</span>
							</label>
							<input
								type="text"
								placeholder="Enter camp name"
								{...register("campName", { required: true })}
								name="campName"
								className="input input-bordered dark:bg-slate-800 dark:text-white"
							/>
							{errors.campName && (
								<span className="text-red-500">Camp Name is required*</span>
							)}
						</div>
						<div className="form-control">
							<label className="label">
								<span className="text-lg font-semibold">Camp Fees</span>
							</label>
							<input
								type="number"
								placeholder="Enter camp Fee"
								{...register("campFees", { required: true })}
								name="campFees"
								min={1}
								className="input input-bordered dark:bg-slate-800 dark:text-white"
							/>
							{errors.campFees && (
								<span className="text-red-500">Camp Fees is required*</span>
							)}
						</div>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-2">
						<div className="form-control">
							<label className="label">
								<span className="text-lg font-semibold">Date & Time</span>
							</label>
							<input
								type="datetime-local"
								placeholder="datetime"
								{...register("dateTime", { required: true })}
								className="input input-bordered dark:bg-slate-800 dark:text-white"
							/>
						</div>
						<div className="form-control">
							<label className="label">
								<span className="text-lg font-semibold">Participant Count</span>
							</label>
							<input
								type="number"
								placeholder="Participant Count"
								{...register("participantCount", {
									required: true,
									valueAsNumber: true,
								})}
								defaultValue={0}
								readOnly
								className="input input-bordered dark:bg-slate-800 dark:text-white"
							/>
						</div>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-2">
						<div className="form-control">
							<label className="label">
								<span className="text-lg font-semibold">
									Healthcare Professional's Name
								</span>
							</label>
							<input
								type="text"
								placeholder="Enter Healthcare Professional Name"
								{...register("healthcareProfessionalName", {
									required: true,
								})}
								className="input input-bordered dark:bg-slate-800 dark:text-white"
							/>
							{errors.healthcareProfessionalName && (
								<span className="text-red-500">
									Healthcare Professional's Name is required*
								</span>
							)}
						</div>
						<div className="form-control">
							<label className="label">
								<span className="text-lg font-semibold">Location</span>
							</label>
							<input
								type="text"
								placeholder="Location"
								{...register("location", { required: true })}
								className="input input-bordered dark:bg-slate-800 dark:text-white"
							/>
							{errors.location && (
								<span className="text-red-500">Location is required*</span>
							)}
						</div>
					</div>
					<div className="form-control">
						<label className="label">
							<span className="text-lg font-semibold">Image</span>
						</label>
						<input
							{...register("image", { required: true })}
							type="file"
							className="file-input p-1 w-full max-w-xs dark:bg-slate-800 dark:text-white"
						/>
						{errors.image && (
							<span className="text-red-500">Image is required*</span>
						)}
					</div>

					<div className="form-control">
						<label className="label">
							<span className="text-lg font-semibold">Description</span>
						</label>
						<textarea
							placeholder="description"
							{...register("description", { required: true })}
							className="textarea h-40 textarea-bordered dark:bg-slate-800 dark:text-white"
						></textarea>

						{errors.description && (
							<span className="text-red-500">Description is required*</span>
						)}
					</div>

					<div className="form-control mt-6">
						<button className="btn rounded-lg font-bold bg-primary mb-2">
							{loading ? (
								<TbFidgetSpinner className="animate-spin m-auto" />
							) : (
								"Add Camp"
							)}
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default AddCamp;

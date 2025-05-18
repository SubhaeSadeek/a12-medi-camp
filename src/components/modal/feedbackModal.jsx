import { Button, Dialog, DialogPanel } from "@headlessui/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { IoClose } from "react-icons/io5";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import Loading from "../shared/Loading";
const FeedbackModal = ({ camp }) => {
	let [isOpen, setIsOpen] = useState(false);
	const { user } = useAuth();
	const axiosPublic = useAxiosPublic();
	const [loading, setLoading] = useState(false);
	const { _id, confirmationStatus, campId, campName } = camp;

	function open() {
		setIsOpen(true);
	}

	function close() {
		setIsOpen(false);
	}
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm();
	const onSubmit = async (data) => {
		setLoading(true);
		const feedback = {
			name: user?.displayName,
			email: user?.email,
			campId: campId,
			campName: campName,
			registeredCampId: _id,
			photo: user?.photoURL,
			rating: parseFloat(data.rating),
			feedback: data.feedback,
		};
		const campRes = await axiosPublic.post(`/feedback`, feedback);
		if (campRes.data.insertedId) {
			reset();
			setIsOpen(false);
			setLoading(false);
			Swal.fire({
				title: `Feedback added`,
				icon: "success",
				showCancelButton: false,
				timer: 1500,
			});
		}
	};
	return (
		<>
			<Button
				onClick={open}
				disabled={confirmationStatus === "pending"}
				className="rounded-md disabled:bg-gray-300 bg-primary dark:text-secondary hover:bg-primary-hover py-2 px-4 text-sm font-medium text-white focus:outline-none  data-[focus]:outline-1 data-[focus]:outline-white"
			>
				Feedback
			</Button>

			<Dialog
				open={isOpen}
				as="div"
				className="relative z-10 focus:outline-none"
				onClose={close}
				__demoMode
			>
				<div className="fixed inset-0 z-10 w-screen overflow-y-auto">
					<div className="flex min-h-full items-center justify-center p-4">
						<DialogPanel
							transition
							className="w-full max-w-2xl rounded-xl bg-white dark:bg-slate-900 dark:text-white drop-shadow-2xl text-black p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
						>
							<div className="flex justify-end text-gray-600">
								<Button className="text-2xl" onClick={close}>
									<IoClose />
								</Button>
							</div>
							{/* Content */}
							<form onSubmit={handleSubmit(onSubmit)} className="">
								<h1 className="text-center text-4xl font-semibold mb-3">
									Rating & Feedback
								</h1>
								<div className="form-control">
									<label className="label">
										<span className="text-lg font-semibold">Rating</span>
									</label>
									<input
										type="number"
										{...register("rating", { required: true })}
										name="rating"
										min="1"
										max="5"
										step="0.1"
										placeholder="Enter rating (1-5)"
										className="input input-bordered dark:bg-slate-800 dark:text-white"
									/>
									{errors.rating && (
										<span className="text-red-500">Rating is required*</span>
									)}
								</div>
								<div className="form-control">
									<label className="label">
										<span className="text-lg font-semibold">Feedback</span>
									</label>
									<textarea
										{...register("feedback", { required: true })}
										className="textarea textarea-bordered dark:bg-slate-800 dark:text-white"
										placeholder="Write your feedback"
									></textarea>
									{errors.feedback && (
										<span className="text-red-500">Feedback is required*</span>
									)}
								</div>

								<div className="form-control mt-6">
									<button className="btn rounded-lg font-bold bg-primary mb-2">
										{loading ? <Loading></Loading> : " Add Rating & Feedback"}
									</button>
								</div>
							</form>
						</DialogPanel>
					</div>
				</div>
			</Dialog>
		</>
	);
};

export default FeedbackModal;

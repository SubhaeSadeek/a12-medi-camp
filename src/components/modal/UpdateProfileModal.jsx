import { Button, Dialog, DialogPanel } from "@headlessui/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaEdit } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { TbFidgetSpinner } from "react-icons/tb";

import toast from "react-hot-toast";
import useAuth from "../../hooks/useAuth";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import useAxiosSecure from "../../hooks/useAxiosSecure";
const _imageHostingKey = import.meta.env.VITE_IBB_IMAGE_UPLOAD_KEY;
const ibbImageHostLink = `https://api.imgbb.com/1/upload?key=${_imageHostingKey}`;
export default function UpdateProfileModal({ userData, refetch }) {
	let [isOpen, setIsOpen] = useState(false);
	const { user, updateUserProfile } = useAuth();
	const axiosSecure = useAxiosSecure();
	const axiosPublic = useAxiosPublic();
	const [loading, setLoading] = useState(false);
	const { phoneNumber, address } = userData;
	function open() {
		setIsOpen(true);
	}

	function close() {
		setIsOpen(false);
	}
	const {
		register,
		handleSubmit,

		formState: { errors },
	} = useForm();
	const onSubmit = async (data) => {
		setLoading(true);
		let imageUrl = user?.photoURL;
		if (data.image && data.image[0]) {
			const formData = new FormData();
			formData.append("image", data.image[0]);
			const imgRes = await axiosPublic.post(ibbImageHostLink, formData, {
				headers: {
					"content-type": "multipart/form-data",
				},
			});
			if (imgRes.data.error) {
				throw new Error("Image upload failed");
			}
			imageUrl = imgRes.data.data.display_url;
		}

		updateUserProfile(data.name, imageUrl);
		const updateProfileInfo = {
			name: data.name,
			email: data.email,
			address: data.address || "",
			phoneNumber: data.phoneNumber || "",
			photoURL: imageUrl,
		};
		const res = await axiosSecure.patch(
			`/update-user/${user?.email}`,
			updateProfileInfo
		);
		if (res.data.modifiedCount > 0) {
			toast.success("Profile Updated");
			refetch();
			setIsOpen(false);
			setLoading(false);
		}
	};
	return (
		<>
			<Button
				disabled={!user}
				onClick={open}
				className="rounded-md btn disabled:bg-gray-300 bg-primary hover:bg-primary-hover py-2 px-4 text-sm font-medium text-secondary focus:outline-none  data-[focus]:outline-1 data-[focus]:outline-white"
			>
				<FaEdit /> Update Profile
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
								<div className="grid grid-cols-1 md:grid-cols-2 gap-2">
									<div className="form-control">
										<label className="label">
											<span className="text-lg font-semibold">Name</span>
										</label>
										<input
											type="text"
											defaultValue={user.displayName}
											{...register("name")}
											placeholder="Enter New Name"
											className="input input-bordered dark:bg-slate-800 dark:text-white"
										/>
									</div>
									<div className="form-control">
										<label className="label">
											<span className="text-lg font-semibold">Image</span>
										</label>
										<input
											type="file"
											{...register("image")}
											placeholder="Enter Your Photo URL"
											className="file-input p-1 w-full max-w-xs dark:bg-slate-800 dark:text-white"
										/>
									</div>
								</div>
								<div className="grid grid-cols-1 md:grid-cols-2 gap-2">
									<div className="form-control">
										<label className="label">
											<span className="text-lg font-semibold">
												Phone Number
											</span>
										</label>
										<input
											type="number"
											defaultValue={phoneNumber}
											{...register("phoneNumber")}
											placeholder="Enter Your Phone Number"
											className="input input-bordered dark:bg-slate-800 dark:text-white"
										/>
									</div>
									<div className="form-control">
										<label className="label">
											<span className="text-lg font-semibold">Adress</span>
										</label>
										<input
											type="text"
											defaultValue={address}
											{...register("address")}
											placeholder="Enter Your Address"
											className="input input-bordered dark:bg-slate-800 dark:text-white"
										/>
									</div>
								</div>

								<div className="form-control mt-6">
									<button className="btn rounded-lg font-bold bg-primary mb-2">
										{loading ? (
											<TbFidgetSpinner className="animate-spin m-auto" />
										) : (
											"Update"
										)}
									</button>
								</div>
							</form>
						</DialogPanel>
					</div>
				</div>
			</Dialog>
		</>
	);
}

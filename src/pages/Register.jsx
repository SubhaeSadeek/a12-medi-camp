import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import registration from "../assets/registration.png";
import SocialLogin from "../components/SocialLogin";
import useAuth from "../hooks/useAuth";
import useAxiosPublic from "../hooks/useAxiosPublic";
import useTitle from "../hooks/useTitle";
const _imageHostingKey = import.meta.env.IBB_IMAGE_UPLOAD_KEY;
const ibbImageHostLink = `https://api.imgbb.com/1/upload?key=${_imageHostingKey}`;
const Register = () => {
	useTitle("Register");
	const axiosPublic = useAxiosPublic();
	const [loading, setLoading] = useState(false);
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm();
	const { createUser, updateUserProfile } = useAuth();
	const navigate = useNavigate();

	const onSubmit = async (data) => {
		setLoading(true);
		const imageFile = { image: data.image[0] };
		const res = await axiosPublic.post(ibbImageHostLink, imageFile, {
			headers: {
				"content-type": "multipart/form-data",
			},
		});

		createUser(data.email, data.password)
			.then((result) => {
				const user = result.user;
				console.log(user);
				updateUserProfile({
					displayName: data.name,
					photoURL: res.data.data.display_url,
				});
				const userInfo = {
					name: data.name,
					email: data.email,
					photoURL: res.data.data.display_url,
					signInTime: user.metadata.lastSignInTime,
				};

				axiosPublic.post("/users", userInfo).then((res) => {
					if (res.data.insertedId) {
						Swal.fire({
							icon: "success",
							title: "User created successfully.",
							showConfirmButton: true,
						});
						navigate("/");
					}
				});
			})
			.catch((error) => console.log(error));
		reset();
	};
	return (
		<div className="max-w-6xl mx-auto flex justify-center items-center min-h-screen text-secondary my-6 px-2">
			<div className="hero-content flex-col shadow-custom-dark md:flex-row shadow-card-shadow">
				<div className="text-center hidden md:block lg:text-left">
					<img src={registration} alt="" />
				</div>
				<div className="card w-full max-w-md shrink-0 ">
					<form onSubmit={handleSubmit(onSubmit)} className="card-body">
						<h2 className="text-center text-[40px] font-bold mb-5 text-secondary">
							Sign Up
						</h2>
						<div className="form-control">
							<label className="label">
								<span className="text-lg font-semibold">Name</span>
							</label>
							<input
								type="text"
								placeholder="Type here"
								{...register("name", { required: true })}
								name="name"
								className="input input-bordered"
							/>
							{errors.name && (
								<span className="text-red-500">Name is required*</span>
							)}
						</div>
						<div className="form-control">
							<label className="label">
								<span className="text-lg font-semibold">Profile Picture</span>
							</label>
							<input
								{...register("image", { required: true })}
								type="file"
								className="file-input p-1 w-full max-w-xs"
							/>
							{errors.photoURL && (
								<span className="text-red-500">
									Profile picture is required*
								</span>
							)}
						</div>
						<div className="form-control">
							<label className="label">
								<span className="text-lg font-semibold">Email</span>
							</label>
							<input
								type="email"
								placeholder="email"
								{...register("email", { required: true })}
								name="email"
								className="input input-bordered"
							/>
							{errors.email && (
								<span className="text-red-500">Email is required*</span>
							)}
						</div>
						<div className="form-control">
							<label className="label">
								<span className="text-lg font-semibold">Password</span>
							</label>
							<input
								type="password"
								placeholder="password"
								{...register("password", {
									required: true,
									minLength: 6,
									maxLength: 20,
									pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/,
								})}
								name="password"
								className="input input-bordered"
							/>
							{errors.password && (
								<span className="text-red-500">
									{errors.password.type === "required"
										? "Password is required*"
										: errors.password.type === "minLength"
										? "Password must be at least 6 characters"
										: errors.password.type === "maxLength"
										? "Password must not be more than 20 characters"
										: errors.password.type === "pattern"
										? "password must have uppercase, one lowercase, one number and one speacial charecter"
										: ""}
								</span>
							)}
						</div>

						<div className="form-control mt-6">
							<button className="btn rounded-lg font-bold bg-primary hover:bg-primary-hover">
								{loading ? (
									<TbFidgetSpinner className="animate-spin m-auto" />
								) : (
									"Sign Up"
								)}
							</button>
						</div>

						<p className="text-center text-lg">
							Already have an account?{" "}
							<Link to={"/logIn"} className="font-semibold underline">
								Sign In
							</Link>
						</p>
						<p className="divider px-6 text-center text-xl font-medium text-[#444444]">
							Or Sign Up With
						</p>
						<SocialLogin></SocialLogin>
					</form>
				</div>
			</div>
		</div>
	);
};

export default Register;

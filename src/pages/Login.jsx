import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import loginImg from "../../src/assets/login.jpg";
import SocialLogin from "../components/SocialLogin";
import useAuth from "../hooks/useAuth";
import useTitle from "../hooks/useTitle";

const Login = () => {
	useTitle("Login");
	const { signInUser } = useAuth();
	const location = useLocation();
	const navigate = useNavigate();
	const [loading, setLoading] = useState(false);
	const [isCredential, setIsCredential] = useState("");
	const from = location.state?.from?.pathname || "/";

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm();
	const onSubmit = (data) => {
		setLoading(true);
		signInUser(data.email, data.password)
			.then((result) => {
				if (result.user) {
					Swal.fire({
						position: "bottom-end",
						icon: "success",
						title: "Logged in successfully.",
						showConfirmButton: false,
						timer: 1100,
					});
				}

				setLoading(false);
				// toast.success("Login Successfully");
				const userInfo = { email: result.user.email };

				console.log(userInfo);
				/* axios
					.post("http://localhost:5001/jwt", userInfo, {
						withCredentials: true,
					})
					.then((data) => {
						console.log(data);
					}); */
				reset();
				navigate(from, { replace: true });
			})
			.catch((error) => {
				if (error) {
					setIsCredential(error.message);
				}
			});
	};

	return (
		<div className="max-w-6xl mx-auto flex justify-center items-center min-h-screen text-secondary px-2">
			<div className="hero-content flex-col shadow-custom-dark md:flex-row shadow-card-shadow">
				<div className="text-center hidden md:block lg:text-left">
					<img src={loginImg} alt="" />
				</div>
				<div className="card w-full max-w-md shrink-0 ">
					<form onSubmit={handleSubmit(onSubmit)} className="card-body">
						<h2 className="text-center text-[40px] font-bold mb-5 text-secondary">
							Sign In
						</h2>
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
								})}
								name="password"
								className="input input-bordered"
							/>
							{errors.password && (
								<span className="text-red-500">
									{errors.password.type === "required"
										? "Password is required*"
										: ""}
								</span>
							)}
						</div>

						<div className="form-control mt-6">
							<button className="btn rounded-lg font-bold bg-primary hover:bg-primary-hover">
								{loading ? "Loading..." : "Sign In"}
							</button>
						</div>

						<p className="text-center text-lg">
							Don&apos;t have an account?{" "}
							<Link to={"/register"} className="font-semibold underline">
								Register...
							</Link>
						</p>
						<>
							{isCredential && (
								<>
									<p className="text-lg text-red-500">
										{isCredential.split("/")[1].slice(0, 18)} : Please Give
										email or password correctly
									</p>
								</>
							)}
						</>
						<p className="px-6 divider text-center text-xl font-medium text-[#444444]">
							Or Sign In with
						</p>
						<SocialLogin></SocialLogin>
					</form>
				</div>
			</div>
		</div>
	);
};

export default Login;

import { useQuery } from "@tanstack/react-query";
import { Zoom } from "react-awesome-reveal";
import { FaArrowCircleRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import CampCard from "../shared/CampCard";
import Loading from "../shared/Loading";
import SectionTitle from "../shared/SectionTitle";

const PopularCamps = () => {
	const axiosPublic = useAxiosPublic();
	const { data: popularCamps = [], isLoading } = useQuery({
		queryKey: ["popularCamp"],
		queryFn: async () => {
			const res = await axiosPublic.get(`/popular-camps`);
			return res.data;
		},
	});
	if (isLoading) {
		return <Loading></Loading>;
	}
	return (
		<section id="popular-camps" className="my-16">
			<SectionTitle
				title={"Popular Medical Camps"}
				subTitle={"Our Highest Participated Camps"}
			></SectionTitle>
			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
				{popularCamps.map((item) => (
					<Zoom cascade damping={0.2} triggerOnce key={item._id}>
						<CampCard item={item}></CampCard>
					</Zoom>
				))}
			</div>
			<div className="flex justify-center">
				<Link to={"/available-camps"} className="mt-4">
					<button className="btn bg-indigo-100 hover:bg-indigo-600/60">
						Available Camps <FaArrowCircleRight className="text-accent" />
					</button>
				</Link>
			</div>
		</section>
	);
};

export default PopularCamps;

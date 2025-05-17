import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";

const Banner = () => {
	const slides = [
		{
			id: 1,
			image: "https://i.ibb.co.com/GQ912Pbp/banner-3.jpg",
			caption: "WE are for Women and Children",
		},
		{
			id: 2,
			image: "https://i.ibb.co.com/xtRSx8q7/banner-2.jpg",
			caption: "Nutriotion is a part of Wellness",
		},
		{
			id: 3,
			image: "https://i.ibb.co.com/nN9Qb16Z/banner-1.jpg",
			caption: "Treatment is Connected With Awareness",
		},
		{
			id: 3,
			image: "https://i.ibb.co.com/VcMf5TK1/banner-4.jpg",
			caption: "Senior Citizen are Esteemed at Our Camp",
		},
	];

	const settings = {
		dots: true,
		infinite: true,
		speed: 500,
		slidesToShow: 1,
		slidesToScroll: 1,
		autoplay: true,
		autoplaySpeed: 5000,
	};

	return (
		<div className="overflow-hidden">
			<Slider {...settings}>
				{slides.map((slide) => (
					<div key={slide.id} className="relative">
						<img
							src={slide.image}
							alt={slide.caption}
							className="w-full object-cover h-96 md:h-[500px]"
						/>
						<div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white bg-black bg-opacity-70 p-4 sm:p-12 rounded-xl text-center">
							<h1 className="text-xl">
								Join our camps for medical assistance or fund us
							</h1>
							<Link
								to="/available-camps"
								className="inline-block bg-blue-500 text-white py-1 px-3 sm:py-2 sm:px-6 rounded-lg hover:bg-blue-600 transition-colors mt-4"
							>
								View Camps
							</Link>
						</div>
						<div className="absolute bottom-4 left-0 right-0 text-center">
							<p className="text-white bg-black bg-opacity-50 py-2 px-4">
								{slide.caption}
							</p>
						</div>
					</div>
				))}
			</Slider>
		</div>
	);
};

export default Banner;

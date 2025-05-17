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

	const sliderOptions = {
		dots: true,
		infinite: true,
		speed: 500,
		slidesToShow: 1,
		slidesToScroll: 1,
		autoplay: true,
		autoplaySpeed: 5000,
		cssEase: "linear",
	};

	return (
		<div className="overflow-hidden">
			<Slider {...sliderOptions}>
				{slides.map((slide) => (
					<div key={slide.id} className="relative">
						<img
							src={slide.image}
							alt={slide.caption}
							className="w-full object-cover h-96 md:h-[500px]"
						/>

						<div className="absolute bottom-4 left-0 right-0 text-center">
							<p className="text-red-400 font-semibold text-2xl w-1/2 bg-black/50 mx-auto py-2 px-4">
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

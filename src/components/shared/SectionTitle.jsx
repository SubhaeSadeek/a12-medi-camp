const SectionTitle = ({ title, subTitle = "" }) => {
	return (
		<div className="text-center mb-8">
			<h1 className="text-2xl md:text-4xl font-medium text-indigo-600/80   mb-4">
				-{title}-
			</h1>
			<div className="badge bg-indigo-600/60 text-white/80 text-lg font-medium">
				{subTitle}
			</div>
		</div>
	);
};

export default SectionTitle;

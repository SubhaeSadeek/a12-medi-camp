const OurMission = () => {
	return (
		<div className="max-w-6xl mx-auto px-4 py-12 space-y-16">
			{/* Hero Section */}
			<div className="text-center">
				<h1 className="text-4xl font-bold text-indigo-600/80 mb-4">
					About MediCamp
				</h1>
				<p className="text-lg text-gray-600 max-w-2xl mx-auto">
					We are committed to organizing efficient, inclusive, and impactful
					medical camps that improve access to healthcare in underserved
					communities.
				</p>
			</div>

			{/* Mission & Vision */}
			<div className="grid md:grid-cols-2 gap-8">
				<div className="p-6 bg-base-100 shadow-lg rounded-2xl border-l-4 border-primary">
					<h2 className="text-2xl font-semibold text-primary mb-2">
						Our Mission
					</h2>
					<p className="text-gray-700">
						To bridge the healthcare gap by enabling seamless management and
						participation in medical camps, making healthcare accessible and
						organized for all.
					</p>
				</div>
				<div className="p-6 bg-base-100 shadow-lg rounded-2xl border-l-4 border-accent">
					<h2 className="text-2xl font-semibold text-accent mb-2">
						Our Vision
					</h2>
					<p className="text-gray-700">
						To become the leading platform for medical outreach, empowering
						organizations to serve communities with compassion, technology, and
						transparency.
					</p>
				</div>
			</div>

			{/* Core Values / What Makes Us Unique */}
			<div className="bg-base-200 rounded-2xl py-10 px-6 text-center shadow-md">
				<h2 className="text-3xl font-bold text-indigo-600/80 mb-6">
					What Makes Us Unique
				</h2>
				<div className="grid md:grid-cols-3 gap-6 text-left">
					<div className="p-4 bg-white rounded-xl shadow">
						<h3 className="text-xl font-semibold text-primary mb-2">
							Community Focused
						</h3>
						<p className="text-gray-700">
							We prioritize the needs of marginalized groups and strive to
							create equitable access to healthcare services.
						</p>
					</div>
					<div className="p-4 bg-white rounded-xl shadow">
						<h3 className="text-xl font-semibold text-primary mb-2">
							Technology Driven
						</h3>
						<p className="text-gray-700">
							Our platform offers efficient camp registration, tracking, and
							analytics powered by modern tools.
						</p>
					</div>
					<div className="p-4 bg-white rounded-xl shadow">
						<h3 className="text-xl font-semibold text-primary mb-2">
							Transparent & Ethical
						</h3>
						<p className="text-gray-700">
							We are committed to ethical practices, transparency, and data
							privacy in all our processes.
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default OurMission;

import {
	FaBaby,
	FaClinicMedical,
	FaHeartbeat,
	FaHospitalUser,
} from "react-icons/fa";
import SectionTitle from "../shared/SectionTitle";

const OurServices = () => {
	return (
		<section className="my-8 lg:my-16">
			<div className="mx-auto">
				<SectionTitle
					title={"What we Do"}
					subTitle={"Our Signature Activities in Camps"}
				/>

				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
					<div className="bg-cyan-600 dark:bg-slate-900 p-6  shadow-card-shadow dark:shadow-none text-center">
						<div className="flex justify-center mb-4">
							<FaClinicMedical className="text-primary text-5xl" />
						</div>
						<h3 className="text-xl font-semibold text-secondary dark:text-primary mb-2">
							Investigations
						</h3>
						<p className="text-description dark:text-gray-200 text-sm">
							Check Diabetes, Blood Pressure, Cervical Healths, STDs in our
							camps
						</p>
					</div>

					<div className="bg-white dark:bg-slate-900 p-6  shadow-card-shadow dark:shadow-none text-center">
						<div className="flex justify-center mb-4">
							<FaHospitalUser className="text-primary text-5xl" />
						</div>
						<h3 className="text-xl font-semibold text-secondary dark:text-primary mb-2">
							Avail Refferels
						</h3>
						<p className="text-description dark:text-gray-200 text-sm">
							We offer best refferal to partner hospitals and a pool of
							conusltant thoe are top in the country
						</p>
					</div>

					<div className="bg-white dark:bg-slate-900 p-6  shadow-card-shadow dark:shadow-none text-center">
						<div className="flex justify-center mb-4">
							<FaHeartbeat className="text-primary text-5xl" />
						</div>
						<h3 className="text-xl font-semibold text-secondary dark:text-primary mb-2">
							Heart Health
						</h3>
						<p className="text-description dark:text-gray-200 text-sm">
							Our specialised and focused camps are organised just for patients
							with heart ailments
						</p>
					</div>

					<div className="bg-white dark:bg-slate-900 p-6  shadow-card-shadow dark:shadow-none text-center">
						<div className="flex justify-center mb-4">
							<FaBaby className="text-primary text-5xl" />
						</div>
						<h3 className="text-xl font-semibold text-secondary dark:text-primary mb-2">
							Infants Wellness
						</h3>
						<p className="text-description dark:text-gray-200 text-sm">
							Great opportunities for infants and babies for their checkups and
							assessment of a balanced growth
						</p>
					</div>
				</div>
			</div>
		</section>
	);
};

export default OurServices;

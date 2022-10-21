import React from 'react';
import Button from './Button';
import { useNavigate } from 'react-router-dom';

const IntroductionPageThree = ({ buttonAction }) => {
	let navigate = useNavigate();

	return (
		<section>
			<h2 className="text-center text-4xl font-black pb-4">
				Bewegingsoefeningen op maat
			</h2>
			<p className="text-text-light">
				Om ervoor te zorgen dat wij de juiste hulp op maat bieden willen we
				weten waar jij de focus op legt:
			</p>

			<form className="flex flex-col introduction-form pt-6">
				<div className="radio">
					<input id="radio-1" name="radio" type="radio" defaultChecked />
					<label htmlFor="radio-1" className="radio-label">
						Revalideren
					</label>
				</div>

				<div className="radio">
					<input id="radio-2" name="radio" type="radio" />
					<label htmlFor="radio-2" className="radio-label">
						Gezondheid stabiliseren
					</label>
				</div>

				<div className="radio">
					<input id="radio-3" name="radio" type="radio" />
					<label htmlFor="radio-3" className="radio-label">
						Gezonder worden / voelen
					</label>
				</div>
			</form>

			<div className="flex justify-end pt-20">
				<Button
					type="primary"
					text="Laat mij beginnen!"
					action={() => navigate('/overview', { replace: true })}
				/>
			</div>
		</section>
	);
};

export default IntroductionPageThree;

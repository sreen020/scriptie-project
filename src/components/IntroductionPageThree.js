import React from 'react';
import Button from './Button';

const IntroductionPageOne = ({ buttonAction }) => {
	return (
		<section>
			<h2 className="text-center text-4xl font-black pb-4">
				Bewegingsoefeningen op maat
			</h2>
			<p className="text-text-light">
				Amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
				labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
				exercitation ullamco laboris nisi.
			</p>
			<div className="flex justify-end pt-20">
				<Button
					type="primary"
					text="Laat mij beginnen!"
					action={() => buttonAction('1')}
				/>
			</div>
		</section>
	);
};

export default IntroductionPageOne;

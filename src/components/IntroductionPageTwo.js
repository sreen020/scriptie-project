import React from 'react';
import Button from './Button';

const IntroductionPageOne = ({ buttonAction }) => {
	return (
		<section>
			<h2 className="text-center text-4xl font-black pb-4">
				Krijg inzicht in jouw progressie
			</h2>
			<p className="text-text-light">
				Amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
				labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
				exercitation ullamco laboris nisi. Amet, consectetur adipiscing elit,
				sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
				enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi.
			</p>
			<div className="flex justify-end pt-20">
				<Button
					type="primary"
					text="Volgende"
					icon={true}
					action={() => buttonAction('3')}
				/>
			</div>
		</section>
	);
};

export default IntroductionPageOne;

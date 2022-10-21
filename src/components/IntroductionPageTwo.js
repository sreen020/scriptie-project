import React from 'react';
import Button from './Button';

const IntroductionPageTwo = ({ buttonAction }) => {
	return (
		<section>
			<h2 className="text-4xl font-black pb-4">
				Krijg inzicht in jouw progressie
			</h2>
			<p className="text-text-light">
				Naast de oefeningen uitvoeren is het natuurlijk belangrijk om inzicht te
				krijgen in jouw progressie. Zo worden alle activiteiten binnen de
				applicatie gemonitord. Deze zijn terug te vinden in het overzicht.
			</p>
			<p className="text-text-light pt-4">
				Alle gegevens worden alleen gedeeld met jouw deskundigen!
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

export default IntroductionPageTwo;

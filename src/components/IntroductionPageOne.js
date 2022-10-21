import React from 'react';
import Button from './Button';

const IntroductionPageOne = ({ buttonAction }) => {
	return (
		<section>
			<h2 className="text-4xl font-black pb-4">Welkom op SO-NUTS</h2>
			<p className="text-text-light">
				Met behulp van SO-NUTS kan je revalideren, fit worden of gezond blijven
				in het gemak van jouw eigen omgeving.
			</p>
			<p className="text-text-light pt-4">
				Onthou goed dat deze applicatie in contact staat met jouw deskundigen.
				Zo kun je ook laten weten hoe jij de oefeningen ervaart.
			</p>
			<p className="text-text-light pt-4">
				Alle gegevens worden alleen gedeeld met jouw deskundigen!
			</p>
			<div className="flex justify-end pt-20">
				<Button
					type="primary"
					text="Volgende"
					icon={true}
					action={() => buttonAction('2')}
				/>
			</div>
		</section>
	);
};

export default IntroductionPageOne;

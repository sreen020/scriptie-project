import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, getDoc, getFirestore } from 'firebase/firestore';
import YouTube from 'react-youtube';
import Button from '../components/Button';
import BackButton from '../components/BackButton';

const StartExercise = () => {
	const { exerciseId } = useParams();
	const [startsign, setStartsign] = useState(false);
	const [exerciseStarted, setExerciseStarted] = useState(false);
	const [exerciseInfo, setExerciseInfo] = useState([]);
	const [paused, setPaused] = useState(false);
	const [startCounter, setStartCounter] = useState(6);
	const [exerciseCounter, setExerciseCounter] = useState(exerciseInfo.time);
	const db = getFirestore();
	const docRef = doc(db, 'exercises', exerciseId);
	let navigate = useNavigate();

	useEffect(() => {
		getDoc(docRef).then((doc) => {
			setExerciseInfo(doc.data());
			setExerciseCounter(doc.data().time);
		});
	}, []);

	const opts = {
		height: '500',
		width: '1000',
		playerVars: {
			autoplay: 1,
		},
	};

	const handleStartCounter = () => {
		setStartsign(true);
		setStartCounter(startCounter - 1);
	};
	const handleExerciseCounter = () => {
		setExerciseStarted(true);
		setExerciseCounter(exerciseCounter - 1);
	};

	useEffect(() => {
		if (startsign) {
			setTimeout(() => {
				startCounter > 0
					? setStartCounter(startCounter - 1)
					: handleExerciseCounter();
			}, 1000);
		}
	}, [startCounter]);

	useEffect(() => {
		if (exerciseStarted && !paused) {
			setTimeout(() => {
				exerciseCounter > 0
					? setExerciseCounter(exerciseCounter - 1)
					: console.log('Eind oefening');
			}, 1000);
		}
	}, [exerciseCounter]);

	const handleStop = () => {
		if (window.confirm('Weet je zeker dat je deze oefening wilt afsluiten?')) {
			navigate(`/eind/${exerciseId}`, { replace: true });
		} else {
			return;
		}
	};

	const handlePause = () => {
		setPaused(!paused);
		if (paused) {
			setExerciseCounter(exerciseCounter - 1);
		}
	};

	return (
		<main className="p-4 sm:p-12">
			<BackButton />
			<section className="pb-12">
				<h1 className="text-4xl font-black pb-4">{exerciseInfo.name}</h1>
			</section>
			<section className="flex flex-col justify-center items-center text-center">
				<YouTube videoId="0tn5K9NlCfo" opts={opts} className="z-10 pb-8" />

				{!exerciseStarted && startsign && (
					<>
						<p className="text-text-light">
							Maak je klaar, de oefening start over
						</p>
						<h2 className="text-primary-blue text-6xl font-bold">
							{startCounter}
						</h2>
						<p className="text-text-light -mt-4">Seconden</p>
					</>
				)}

				{exerciseStarted && (
					<>
						{!paused && (
							<>
								<h2 className="text-primary-blue text-6xl font-bold">
									{exerciseCounter}
								</h2>

								<p className="text-text-light -mt-4">Seconden</p>
							</>
						)}

						{paused && (
							<>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 24 24"
									fill="currentColor"
									className="h-16 w-16 fill-current text-primary-yellow"
								>
									<path
										fillRule="evenodd"
										d="M6.75 5.25a.75.75 0 01.75-.75H9a.75.75 0 01.75.75v13.5a.75.75 0 01-.75.75H7.5a.75.75 0 01-.75-.75V5.25zm7.5 0A.75.75 0 0115 4.5h1.5a.75.75 0 01.75.75v13.5a.75.75 0 01-.75.75H15a.75.75 0 01-.75-.75V5.25z"
										clipRule="evenodd"
									/>
								</svg>

								<p className="text-text-light font-bold text-xl">
									Oefening staat op pauze{' '}
									<span className="text-text-light text-base">
										({exerciseCounter} seconden resterend)
									</span>
								</p>
							</>
						)}

						<div className="flex gap-4 items-center pt-5">
							<button
								onClick={handleStop}
								className="z-10 flex justify-center items-center gap-1 text-white bg-red-600 py-3 px-12 rounded-md uppercase hover:bg-red-400  duration-200 font-medium text-sm"
							>
								Stop
							</button>

							<Button
								type={paused ? 'primary' : 'secondary'}
								text={paused ? 'Ga verder!' : 'Pauze'}
								icon={paused ? true : false}
								action={handlePause}
							/>
						</div>
					</>
				)}

				{!startsign && (
					<button
						onClick={handleStartCounter}
						className="z-10 flex justify-center items-center gap-1 text-white bg-green-600 py-3 px-12 rounded-md uppercase hover:bg-green-400  duration-200 font-medium text-sm"
					>
						Start oefening!
					</button>
				)}
			</section>

			{!exerciseStarted ? (
				<>
					<svg
						className="absolute left-0 bottom-0"
						width="707"
						height="541"
						viewBox="0 0 707 541"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<g clip-path="url(#clip0_167_1346)">
							<path
								d="M-251.539 365.66L-232.765 380.636C-213.971 395.515 -176.424 425.468 -133.906 431.328C-91.2907 437.209 -43.8445 419.17 -1.39716 425.833C40.9314 432.573 78.1424 464.09 117.783 483.344C157.521 502.619 199.591 509.61 241.387 519.304C283.107 528.879 324.434 541.233 366.7 548.266C409.063 555.32 452.267 557.031 495.491 560.076C538.639 563.003 581.73 567.145 603.276 569.216L624.821 571.287L580.72 776.604L559.699 772.088C538.679 767.573 496.638 758.543 454.792 749.555C412.849 740.545 371.199 731.599 329.256 722.59C287.41 713.602 245.369 704.571 203.523 695.583C161.58 686.574 119.93 677.628 77.9866 668.618C36.1411 659.63 -5.90002 650.6 -47.7456 641.611C-89.6889 632.602 -131.339 623.656 -173.282 614.647C-215.128 605.658 -257.169 596.628 -278.189 592.113L-299.21 587.598L-251.539 365.66Z"
								fill="#FCA34D"
							/>
							<path
								d="M-270.229 452.675L-247.738 450.346C-225.248 448.017 -180.267 443.36 -138.043 450.588C-95.7008 457.74 -56.2348 476.854 -13.8295 483.713C28.4781 490.55 73.5853 485.306 114.99 496.347C156.471 507.508 194.131 535.03 233.932 554.012C273.657 572.875 315.404 583.274 358.026 588.645C400.747 594.037 444.203 594.575 486.818 600.455C529.336 606.315 570.873 617.692 591.662 623.282L612.431 628.971L580.72 776.603L559.699 772.088C538.679 767.573 496.638 758.543 454.792 749.555C412.849 740.545 371.199 731.599 329.256 722.59C287.41 713.601 245.369 704.571 203.523 695.583C161.58 686.574 119.93 677.627 77.9867 668.618C36.1411 659.63 -5.89995 650.6 -47.7455 641.611C-89.6888 632.602 -131.339 623.656 -173.282 614.646C-215.128 605.658 -257.169 596.628 -278.189 592.113L-299.21 587.598L-270.229 452.675Z"
								fill="#FE9652"
							/>
							<path
								d="M-277.579 486.895L-254.879 483.588C-232.178 480.282 -186.777 473.669 -145.141 483.635C-103.408 493.622 -65.538 520.167 -24.1617 531.816C17.1378 543.346 61.825 540.057 104.511 545.135C147.294 550.233 187.978 563.677 230.152 571.611C272.25 579.426 315.761 581.612 358.279 587.472C400.873 593.45 442.397 602.983 483.458 616.099C524.422 629.193 564.867 645.654 585.068 653.982L605.291 662.213L580.72 776.604L559.7 772.088C538.679 767.573 496.638 758.543 454.792 749.555C412.849 740.545 371.199 731.599 329.256 722.59C287.41 713.602 245.369 704.571 203.523 695.583C161.58 686.574 119.93 677.628 77.9868 668.618C36.1412 659.63 -5.89989 650.6 -47.7454 641.611C-89.6888 632.602 -131.339 623.656 -173.282 614.647C-215.128 605.658 -257.169 596.628 -278.189 592.113L-299.21 587.598L-277.579 486.895Z"
								fill="#FF8A58"
							/>
							<path
								d="M-279.889 497.649L-260.066 507.737C-240.221 517.728 -200.574 537.904 -159.422 550.118C-118.171 562.354 -75.5553 566.803 -31.6799 566.817C12.0977 566.811 56.9949 562.544 98.5254 572.999C140.154 583.475 178.318 608.651 219.547 620.984C260.7 633.199 304.841 632.452 347.043 639.779C389.323 647.224 429.587 662.623 471.068 673.783C512.451 684.922 554.997 691.606 576.248 695.046L597.521 698.387L580.72 776.603L559.7 772.088C538.679 767.573 496.638 758.543 454.792 749.555C412.849 740.545 371.199 731.599 329.256 722.59C287.41 713.602 245.369 704.571 203.524 695.583C161.58 686.574 119.93 677.627 77.9868 668.618C36.1413 659.63 -5.89984 650.6 -47.7454 641.611C-89.6887 632.602 -131.339 623.656 -173.282 614.647C-215.128 605.658 -257.169 596.628 -278.189 592.113L-299.21 587.598L-279.889 497.649Z"
								fill="#FE7E60"
							/>
							<path
								d="M-285.14 522.092L-264.644 529.051C-244.148 536.011 -203.157 549.929 -161.06 557.744C-118.885 565.678 -75.6814 567.389 -33.423 574.932C8.73751 582.454 49.8546 595.786 90.2301 611.618C130.703 627.471 170.337 645.804 212.701 652.857C254.966 659.89 299.863 655.624 342.003 663.243C384.219 670.982 423.559 690.683 465.041 701.843C506.445 712.884 549.872 715.462 571.607 716.653L593.32 717.941L580.72 776.603L559.7 772.088C538.679 767.573 496.638 758.543 454.792 749.555C412.849 740.545 371.199 731.599 329.256 722.59C287.41 713.601 245.369 704.571 203.523 695.583C161.58 686.574 119.93 677.627 77.9867 668.618C36.1412 659.63 -5.89994 650.6 -47.7455 641.611C-89.6888 632.602 -131.339 623.656 -173.282 614.646C-215.128 605.658 -257.169 596.628 -278.189 592.113L-299.21 587.598L-285.14 522.092Z"
								fill="#FA7268"
							/>
						</g>
						<defs>
							<clipPath id="clip0_167_1346">
								<rect
									width="900"
									height="600"
									fill="white"
									transform="translate(-172.996) rotate(12.1227)"
								/>
							</clipPath>
						</defs>
					</svg>

					<svg
						width="1194"
						height="834"
						viewBox="0 0 1194 834"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
						className="absolute right-0 top-0 z-0"
					>
						<g clip-path="url(#clip0_167_1340)">
							<path
								d="M1446.62 830.671L1433.94 790.361C1421.12 750.233 1395.76 669.613 1336.69 633.78C1277.49 597.849 1184.98 606.439 1126.88 569.058C1069.05 531.594 1045.9 448.074 1005.74 387.407C965.46 326.643 908.3 288.829 854.484 245.829C800.658 203.108 750.443 155.116 693.027 117.108C635.484 79.0017 570.867 50.976 507.661 20.302C444.446 -10.0933 382.632 -42.8585 351.725 -59.2411L320.818 -75.6237L610.791 -456.282L638.246 -435.368C665.701 -414.453 720.61 -372.625 775.265 -330.991C830.047 -289.26 884.446 -247.82 939.228 -206.089C993.882 -164.455 1048.79 -122.627 1103.45 -80.993C1158.23 -39.2619 1212.63 2.17752 1267.41 43.9087C1322.06 85.5426 1376.97 127.371 1431.63 169.005C1486.41 210.736 1540.81 252.175 1595.59 293.907C1650.25 335.541 1705.16 377.369 1732.61 398.283L1760.07 419.197L1446.62 830.671Z"
								fill="#FCA34D"
							/>
							<path
								d="M1569.51 669.344L1532.39 661.118C1495.27 652.893 1421.03 636.442 1363.89 598.07C1306.48 559.783 1266.45 499.492 1208.63 461.749C1150.93 424.103 1075.86 408.739 1024.11 363.299C972.364 317.58 944.201 241.7 903.503 181.48C862.795 121.538 809.819 77.1719 750.055 42.2448C690.164 7.22045 623.89 -18.6301 564.689 -54.5608C505.616 -90.3941 454.021 -136.573 428.085 -159.481L402.287 -182.571L610.791 -456.282L638.246 -435.368C665.701 -414.453 720.61 -372.625 775.265 -330.991C830.047 -289.26 884.446 -247.82 939.228 -206.089C993.882 -164.455 1048.79 -122.627 1103.45 -80.9931C1158.23 -39.2619 1212.63 2.17744 1267.41 43.9086C1322.06 85.5425 1376.97 127.371 1431.63 169.005C1486.41 210.736 1540.81 252.175 1595.59 293.907C1650.25 335.54 1705.16 377.369 1732.61 398.283L1760.07 419.197L1569.51 669.344Z"
								fill="#FE9652"
							/>
							<path
								d="M1617.84 605.901L1579.34 599.488C1540.84 593.075 1463.83 580.249 1410.56 536.803C1357.16 493.259 1327.62 419.192 1276.56 372.566C1225.5 326.219 1153.19 307.23 1093.01 272.847C1032.71 238.367 984.659 188.589 928.358 148.852C872.047 109.393 807.471 80.2533 748.398 44.4199C689.336 8.30798 635.765 -34.219 586.783 -83.5634C537.928 -132.81 493.512 -188.415 471.442 -216.399L449.235 -244.201L610.791 -456.282L638.246 -435.368C665.701 -414.453 720.611 -372.625 775.265 -330.991C830.047 -289.26 884.446 -247.821 939.228 -206.089C993.882 -164.455 1048.79 -122.627 1103.45 -80.9932C1158.23 -39.262 1212.63 2.17737 1267.41 43.9086C1322.06 85.5424 1376.97 127.371 1431.63 169.005C1486.41 210.736 1540.81 252.175 1595.59 293.906C1650.25 335.54 1705.16 377.369 1732.61 398.283L1760.07 419.197L1617.84 605.901Z"
								fill="#FF8A58"
							/>
							<path
								d="M1633.03 585.962L1613.45 554.715C1593.72 523.65 1554.55 461.158 1504.46 413.542C1454.23 365.829 1393.48 332.728 1325.99 307.673C1258.64 282.716 1184.95 265.539 1132.36 221.187C1079.65 176.736 1048.18 105.207 998.089 57.3127C947.992 9.69705 879.274 -14.0048 822.272 -52.5571C765.281 -91.3881 719.995 -144.791 668.251 -190.51C616.634 -236.132 558.41 -273.61 529.437 -292.53L500.325 -311.269L610.791 -456.282L638.245 -435.368C665.7 -414.453 720.61 -372.625 775.264 -330.991C830.047 -289.26 884.446 -247.82 939.228 -206.089C993.882 -164.455 1048.79 -122.627 1103.45 -80.993C1158.23 -39.2619 1212.63 2.17749 1267.41 43.9087C1322.06 85.5426 1376.97 127.371 1431.63 169.005C1486.41 210.736 1540.81 252.175 1595.59 293.907C1650.25 335.54 1705.16 377.369 1732.61 398.283L1760.06 419.197L1633.03 585.962Z"
								fill="#FE7E60"
							/>
							<path
								d="M1667.55 540.646L1643.55 515.2C1619.54 489.754 1571.54 438.862 1515.23 399.403C1458.93 359.666 1394.31 331.641 1337.46 292.628C1280.73 253.713 1231.9 203.909 1186.91 149.587C1141.79 95.167 1100.65 36.3262 1043.1 -1.77967C985.688 -39.7882 912 -56.9645 855.412 -96.0607C798.835 -135.435 759.625 -196.814 707.881 -242.533C656.126 -287.974 592.103 -317.838 559.953 -332.59L527.941 -347.522L610.791 -456.282L638.246 -435.367C665.701 -414.453 720.61 -372.625 775.265 -330.991C830.047 -289.26 884.446 -247.82 939.228 -206.089C993.882 -164.455 1048.79 -122.627 1103.45 -80.9928C1158.23 -39.2617 1212.63 2.17771 1267.41 43.9089C1322.06 85.5428 1376.97 127.371 1431.63 169.005C1486.41 210.736 1540.81 252.176 1595.59 293.907C1650.25 335.541 1705.16 377.369 1732.61 398.283L1760.07 419.198L1667.55 540.646Z"
								fill="#FA7268"
							/>
						</g>
						<defs>
							<clipPath id="clip0_167_1340">
								<rect
									width="1444.75"
									height="1367.21"
									fill="white"
									transform="translate(930.191 1508.6) rotate(-142.701)"
								/>
							</clipPath>
						</defs>
					</svg>
				</>
			) : (
				<>
					<svg
						className="absolute left-0 bottom-0"
						width="1005"
						height="834"
						viewBox="0 0 1005 834"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<g clip-path="url(#clip0_167_1368)">
							<path
								d="M689.745 1110.85L673.306 1093.27C656.874 1075.49 623.995 1040.32 577.99 1018.83C531.884 997.446 472.552 989.849 434.958 959.71C397.464 929.467 381.608 876.786 344.115 846.543C306.521 816.404 247.188 808.807 198.979 789.586C150.671 770.467 113.586 739.621 81.199 704.126C48.8122 668.63 21.1236 628.487 -6.55669 588.151C-34.2369 547.815 -62.109 507.492 -95.5973 473.13C-129.186 438.871 -168.49 410.675 -188.051 396.666L-207.704 382.568L-422 602.981L-404.851 619.654C-387.794 636.238 -353.496 669.584 -319.107 703.019C-284.717 736.455 -250.236 769.979 -215.846 803.414C-181.457 836.849 -147.159 870.195 -112.769 903.631C-78.3799 937.066 -43.8987 970.59 -9.5092 1004.03C24.8804 1037.46 59.1782 1070.81 93.5677 1104.24C127.957 1137.68 162.438 1171.2 196.828 1204.64C231.218 1238.07 265.515 1271.42 299.905 1304.85C334.294 1338.29 368.776 1371.81 386.108 1388.66L403.349 1405.43L689.745 1110.85Z"
								fill="#6755AD"
							/>
							<path
								d="M558.563 1245.78L555.843 1214.08C553.031 1182.3 547.59 1118.9 521.912 1076.51C496.135 1034.22 450.221 1012.82 415.931 979.279C381.742 945.638 359.277 899.754 319.38 871.984C279.483 844.213 222.153 834.557 186.762 802.151C151.372 769.746 137.919 714.592 108.537 676.007C79.1543 637.422 33.8412 615.406 3.9579 577.336C-25.9254 539.266 -40.3789 485.142 -66.7573 443.467C-93.1358 401.792 -131.439 372.566 -150.499 358.042L-169.651 343.429L-422 602.981L-404.851 619.654C-387.794 636.238 -353.496 669.584 -319.107 703.019C-284.717 736.455 -250.236 769.979 -215.846 803.414C-181.457 836.849 -147.159 870.195 -112.769 903.631C-78.3799 937.066 -43.8987 970.59 -9.5092 1004.03C24.8804 1037.46 59.1782 1070.81 93.5677 1104.24C127.957 1137.68 162.438 1171.2 196.828 1204.64C231.218 1238.07 265.515 1271.42 299.905 1304.85C334.294 1338.29 368.776 1371.81 386.108 1388.66L403.349 1405.43L558.563 1245.78Z"
								fill="#57449D"
							/>
							<path
								d="M619.648 1182.95L586.385 1182.67C553.031 1182.3 486.505 1181.73 444.305 1156.33C402.004 1131.03 384.129 1080.8 349.339 1047.77C314.649 1014.65 263.144 998.631 235.765 957.986C208.385 917.341 205.13 852.066 186.462 802.46C167.694 752.958 133.614 719.021 88.8096 696.298C44.1057 673.471 -11.2212 661.755 -55.8249 638.825C-100.328 615.793 -134.209 581.65 -172.404 552.129C-210.598 522.608 -253.308 497.913 -274.471 485.552L-295.825 473.205L-422 602.981L-404.851 619.654C-387.794 636.238 -353.496 669.584 -319.107 703.019C-284.717 736.455 -250.236 769.979 -215.846 803.414C-181.457 836.849 -147.159 870.195 -112.769 903.631C-78.3799 937.066 -43.8987 970.59 -9.5092 1004.03C24.8804 1037.46 59.1782 1070.81 93.5677 1104.24C127.957 1137.68 162.438 1171.2 196.828 1204.64C231.218 1238.07 265.515 1271.42 299.905 1304.85C334.294 1338.29 368.776 1371.81 386.108 1388.66L403.349 1405.43L619.648 1182.95Z"
								fill="#48338E"
							/>
							<path
								d="M517.507 1288.01L503.07 1268.36C488.642 1248.52 459.768 1209.23 422.875 1178.37C385.982 1147.51 341.07 1125.08 305.478 1092.88C269.887 1060.69 243.818 1018.51 217.439 976.834C191.061 935.16 164.373 893.986 125.878 864.773C87.2829 835.664 36.7795 818.619 -6.12181 793.939C-49.0232 769.258 -84.3224 736.942 -105.994 690.427C-127.766 644.014 -135.811 583.298 -169.7 549.348C-203.589 515.398 -263.322 508.213 -292.996 504.607L-322.863 501.014L-422 602.981L-404.851 619.654C-387.794 636.238 -353.496 669.584 -319.107 703.019C-284.717 736.455 -250.236 769.979 -215.846 803.414C-181.457 836.849 -147.159 870.195 -112.769 903.631C-78.3799 937.066 -43.8987 970.59 -9.5092 1004.03C24.8804 1037.46 59.1782 1070.81 93.5677 1104.24C127.957 1137.68 162.438 1171.2 196.828 1204.64C231.218 1238.07 265.515 1271.42 299.905 1304.85C334.294 1338.29 368.776 1371.81 386.108 1388.66L403.349 1405.43L517.507 1288.01Z"
								fill="#38237E"
							/>
							<path
								d="M505.49 1300.37L479.938 1292.16C454.194 1283.96 403.09 1267.53 359.688 1243.36C316.286 1219.2 280.586 1187.29 257.913 1141.81C235.239 1096.32 225.392 1037.46 198.914 995.889C172.335 954.42 129.025 930.344 88.3262 903.397C47.5278 876.554 9.44165 846.737 -23.8463 812.169C-57.0343 777.498 -85.3238 737.972 -118.912 703.713C-152.4 669.351 -191.288 640.358 -223.975 605.172C-256.662 569.986 -283.349 528.812 -296.501 508.212L-309.845 487.625L-422 602.981L-404.851 619.654C-387.794 636.238 -353.496 669.584 -319.107 703.019C-284.717 736.455 -250.236 769.979 -215.846 803.414C-181.457 836.849 -147.159 870.195 -112.769 903.631C-78.3799 937.066 -43.8987 970.59 -9.5092 1004.03C24.8804 1037.46 59.1782 1070.81 93.5677 1104.24C127.957 1137.68 162.438 1171.2 196.828 1204.64C231.218 1238.07 265.515 1271.42 299.905 1304.85C334.294 1338.29 368.776 1371.81 386.108 1388.66L403.349 1405.43L505.49 1300.37Z"
								fill="#27126F"
							/>
							<path
								d="M488.466 1317.88L461.512 1311.11C434.567 1304.14 380.659 1290.6 338.258 1265.4C295.857 1240.21 264.964 1203.36 234.08 1166.32C203.195 1129.28 172.319 1092.05 143.837 1052.54C115.256 1013.13 88.9691 971.542 59.8869 932.648C30.9048 893.651 -0.972775 857.449 -38.9673 827.722C-77.062 798.097 -121.374 775.051 -162.272 748.311C-203.171 721.57 -240.656 691.136 -274.245 656.877C-307.733 622.515 -337.424 584.431 -352.078 565.375L-366.924 546.333L-422 602.981L-404.851 619.654C-387.794 636.238 -353.496 669.584 -319.107 703.019C-284.717 736.455 -250.236 769.979 -215.846 803.414C-181.457 836.849 -147.159 870.195 -112.769 903.631C-78.3799 937.066 -43.8987 970.59 -9.5092 1004.03C24.8804 1037.46 59.1782 1070.81 93.5677 1104.24C127.957 1137.68 162.438 1171.2 196.828 1204.64C231.218 1238.07 265.515 1271.42 299.905 1304.85C334.294 1338.29 368.776 1371.81 386.108 1388.66L403.349 1405.43L488.466 1317.88Z"
								fill="#130160"
							/>
						</g>
						<defs>
							<clipPath id="clip0_167_1368">
								<rect
									width="1151.14"
									height="861.916"
									fill="white"
									transform="translate(403.349 1405.43) rotate(-135.806)"
								/>
							</clipPath>
						</defs>
					</svg>

					<svg
						className="absolute right-0 top-0 z-0"
						width="1194"
						height="834"
						viewBox="0 0 1194 834"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<g clip-path="url(#clip0_167_1361)">
							<path
								d="M249.411 -201.627L274.62 -176.303C299.826 -150.694 350.244 -100.046 419.499 -70.3124C488.898 -40.7364 577.276 -32.2324 634.455 10.7289C691.49 53.8476 717.469 131.266 774.505 174.385C831.684 217.346 920.062 225.85 992.48 252.119C1065.04 278.231 1121.5 322.265 1171.2 373.414C1220.9 424.564 1263.85 482.83 1306.8 541.381C1349.75 599.932 1392.98 658.453 1444.26 707.871C1495.69 757.131 1555.32 797.13 1584.99 817.001L1614.8 837L1922.45 500.008L1896.23 476.072C1870.15 452.264 1817.72 404.392 1765.14 356.391C1712.56 308.391 1659.84 260.263 1607.26 212.262C1554.68 164.262 1502.25 116.39 1449.67 68.3892C1397.09 20.3888 1344.37 -27.7395 1291.79 -75.7399C1239.21 -123.74 1186.77 -171.613 1134.2 -219.613C1081.62 -267.613 1028.9 -315.742 976.32 -363.742C923.741 -411.742 871.303 -459.615 818.725 -507.615C766.146 -555.615 713.427 -603.744 686.928 -627.936L660.568 -652L249.411 -201.627Z"
								fill="#6755AD"
							/>
							<path
								d="M437.738 -407.917L443.252 -361.019C448.906 -313.993 459.934 -220.198 500.006 -158.497C540.221 -96.9543 609.335 -67.3488 661.77 -19.191C714.061 29.1243 749.528 96.1494 810.014 135.489C870.499 174.828 956.002 186.482 1010.02 232.907C1064.03 279.333 1086.56 360.531 1131.95 416.405C1177.34 472.279 1245.6 502.829 1291.71 557.915C1337.81 613.002 1361.78 692.625 1402.86 753.223C1443.94 813.821 1502.13 855.395 1531.08 876.054L1560.17 896.84L1922.45 500.008L1896.23 476.072C1870.15 452.264 1817.72 404.392 1765.14 356.391C1712.56 308.391 1659.84 260.263 1607.26 212.262C1554.68 164.262 1502.25 116.39 1449.67 68.3892C1397.09 20.3888 1344.37 -27.7395 1291.79 -75.7399C1239.21 -123.74 1186.77 -171.613 1134.2 -219.613C1081.62 -267.613 1028.9 -315.742 976.32 -363.742C923.741 -411.742 871.303 -459.615 818.725 -507.615C766.146 -555.615 713.427 -603.744 686.928 -627.936L660.568 -652L437.738 -407.917Z"
								fill="#57449D"
							/>
							<path
								d="M350.044 -311.858L399.405 -312.99C448.906 -313.993 547.629 -316.256 611.421 -280.539C675.356 -244.979 704.218 -171.281 757.371 -123.911C810.381 -76.3826 887.539 -55.0247 930.054 3.99878C972.57 63.0222 980.442 159.711 1010.45 232.435C1040.6 305.001 1092.75 353.759 1160.27 385.382C1227.66 417.163 1310.29 431.966 1377.53 463.904C1444.63 496 1496.49 545.073 1554.53 587.089C1612.57 629.106 1677.08 663.75 1709.06 681.102L1741.31 698.424L1922.45 500.008L1896.23 476.072C1870.15 452.264 1817.72 404.392 1765.14 356.391C1712.56 308.391 1659.84 260.263 1607.26 212.262C1554.68 164.262 1502.25 116.39 1449.67 68.3892C1397.09 20.3888 1344.37 -27.7395 1291.79 -75.7399C1239.21 -123.74 1186.77 -171.613 1134.2 -219.613C1081.62 -267.613 1028.9 -315.742 976.32 -363.742C923.741 -411.742 871.303 -459.615 818.725 -507.615C766.146 -555.615 713.427 -603.744 686.928 -627.936L660.568 -652L350.044 -311.858Z"
								fill="#48338E"
							/>
							<path
								d="M496.68 -472.481L519.014 -444.007C541.345 -415.248 586.013 -358.302 642.186 -314.238C698.358 -270.175 766.035 -238.994 820.339 -192.884C874.642 -146.773 915.285 -85.417 956.363 -24.8188C997.44 35.7794 1038.95 95.6197 1097.43 137.164C1156.04 178.55 1231.76 201.483 1296.56 236.098C1361.36 270.713 1415.23 317.011 1449.56 385.01C1484.02 452.852 1498.79 542.553 1550.65 591.341C1602.51 640.129 1691.46 648.003 1735.65 651.969L1780.13 655.907L1922.45 500.008L1896.23 476.072C1870.15 452.264 1817.72 404.392 1765.14 356.391C1712.56 308.391 1659.84 260.263 1607.26 212.262C1554.68 164.262 1502.25 116.39 1449.67 68.3892C1397.09 20.3888 1344.37 -27.7395 1291.79 -75.7399C1239.21 -123.74 1186.77 -171.613 1134.2 -219.613C1081.62 -267.613 1028.9 -315.742 976.32 -363.742C923.741 -411.742 871.303 -459.615 818.725 -507.615C766.146 -555.615 713.427 -603.744 686.928 -627.936L660.568 -652L496.68 -472.481Z"
								fill="#38237E"
							/>
							<path
								d="M513.932 -491.378L552.223 -480.384C590.799 -469.419 667.382 -447.431 732.899 -413.604C798.416 -379.776 852.867 -334.108 888.625 -267.683C924.384 -201.259 941.737 -114.392 982.959 -53.9513C1024.32 6.33193 1089.7 40.0317 1151.34 78.1113C1213.12 116.033 1271.01 158.493 1322.01 208.225C1372.86 258.115 1416.67 315.436 1468.1 364.696C1519.39 414.114 1578.43 455.313 1628.56 505.991C1678.7 556.668 1720.21 616.508 1740.68 646.458L1761.44 676.378L1922.45 500.008L1896.23 476.072C1870.15 452.264 1817.72 404.392 1765.14 356.391C1712.56 308.391 1659.84 260.263 1607.26 212.262C1554.68 164.262 1502.25 116.39 1449.67 68.3892C1397.09 20.3888 1344.37 -27.7395 1291.79 -75.7399C1239.21 -123.74 1186.77 -171.613 1134.2 -219.613C1081.62 -267.613 1028.9 -315.742 976.32 -363.742C923.741 -411.742 871.303 -459.615 818.725 -507.615C766.146 -555.615 713.427 -603.744 686.928 -627.936L660.568 -652L513.932 -491.378Z"
								fill="#27126F"
							/>
							<path
								d="M538.371 -518.148L578.675 -509.359C618.976 -500.284 699.585 -482.705 763.664 -447.303C827.743 -411.9 875.294 -358.674 922.841 -305.162C970.387 -251.65 1017.93 -197.853 1062.03 -140.561C1106.27 -83.4277 1147.21 -22.9575 1192.16 33.3889C1236.98 89.8928 1285.96 142.115 1343.71 184.447C1401.61 226.621 1468.43 258.746 1530.35 296.51C1592.27 334.275 1649.3 377.679 1700.73 426.939C1752.02 476.357 1797.84 531.473 1820.47 559.06L1843.38 586.618L1922.45 500.008L1896.23 476.072C1870.15 452.264 1817.72 404.392 1765.14 356.391C1712.56 308.391 1659.84 260.263 1607.26 212.262C1554.68 164.262 1502.25 116.39 1449.67 68.3892C1397.09 20.3888 1344.37 -27.7395 1291.79 -75.7399C1239.21 -123.74 1186.77 -171.613 1134.2 -219.613C1081.62 -267.613 1028.9 -315.742 976.32 -363.742C923.741 -411.742 871.303 -459.615 818.725 -507.615C766.146 -555.615 713.427 -603.744 686.928 -627.936L660.568 -652L538.371 -518.148Z"
								fill="#130160"
							/>
						</g>
						<defs>
							<clipPath id="clip0_167_1361">
								<rect
									width="1708.65"
									height="1279.35"
									fill="white"
									transform="translate(660.568 -652) rotate(42.3938)"
								/>
							</clipPath>
						</defs>
					</svg>
				</>
			)}
		</main>
	);
};

export default StartExercise;
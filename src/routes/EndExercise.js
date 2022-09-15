import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, getDoc, getFirestore } from 'firebase/firestore';
import Button from '../components/Button';

const EndExercise = () => {
	let navigate = useNavigate();
	const { exerciseId } = useParams();
	const db = getFirestore();
	const docRef = doc(db, 'exercises', exerciseId);
	const [exerciseInfo, setExerciseInfo] = useState([]);

	useEffect(() => {
		getDoc(docRef).then((doc) => {
			setExerciseInfo(doc.data());
		});
	}, []);

	return (
		<main className="p-4 sm:p-12 flex flex-col justify-between">
			<section className="flex flex-col justify-between">
				<h1 className="text-4xl font-black pb-4">Goed gedaan!</h1>

				<article className="grid gap-6 max-w-lg pt-10">
					<h2 className="font-bold text-primary-blue text-xl">
						Hoe heeft u deze oefening ervaren?
					</h2>
					<p className="text-text-light">
						Wilt u uw deskundigen laten weten hoe deze oefening is gegaan? Klik
						dan op de “evalueer oefening” knop.
					</p>
					<p className="font-medium">
						Deze informatie wordt alleen gedeeld met uw deskundigen!
					</p>

					<p
						onClick={() => navigate(`/start/${exerciseId}`, { replace: true })}
						className="flex items-center text-text-light border-b border-black w-fit pt-8 cursor-pointer z-10"
					>
						Oefening opnieuw uitvoeren
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 24 24"
							fill="currentColor"
							className="w-6 h-6 ml-2"
						>
							<path
								fillRule="evenodd"
								d="M4.755 10.059a7.5 7.5 0 0112.548-3.364l1.903 1.903h-3.183a.75.75 0 100 1.5h4.992a.75.75 0 00.75-.75V4.356a.75.75 0 00-1.5 0v3.18l-1.9-1.9A9 9 0 003.306 9.67a.75.75 0 101.45.388zm15.408 3.352a.75.75 0 00-.919.53 7.5 7.5 0 01-12.548 3.364l-1.902-1.903h3.183a.75.75 0 000-1.5H2.984a.75.75 0 00-.75.75v4.992a.75.75 0 001.5 0v-3.18l1.9 1.9a9 9 0 0015.059-4.035.75.75 0 00-.53-.918z"
								clipRule="evenodd"
							/>
						</svg>
					</p>
				</article>
			</section>
			<div className="flex justify-center items-center">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 24 24"
					fill="currentColor"
					className="w-2/12"
				>
					<path
						fillRule="evenodd"
						d="M8.603 3.799A4.49 4.49 0 0112 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 013.498 1.307 4.491 4.491 0 011.307 3.497A4.49 4.49 0 0121.75 12a4.49 4.49 0 01-1.549 3.397 4.491 4.491 0 01-1.307 3.497 4.491 4.491 0 01-3.497 1.307A4.49 4.49 0 0112 21.75a4.49 4.49 0 01-3.397-1.549 4.49 4.49 0 01-3.498-1.306 4.491 4.491 0 01-1.307-3.498A4.49 4.49 0 012.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 011.307-3.497 4.49 4.49 0 013.497-1.307zm7.007 6.387a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
						clipRule="evenodd"
					/>
				</svg>
			</div>
			<section className="flex justify-end gap-4 py-10">
				<Button
					type="secondary"
					text="Evaluatie overslaan"
					action={() => navigate('/overview', { replace: true })}
				/>
				<Button
					type="primary"
					icon
					text="Evalueer oefening"
					action={() => navigate(`/evaluatie/${exerciseId}`, { replace: true })}
				/>
			</section>

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
		</main>
	);
};

export default EndExercise;
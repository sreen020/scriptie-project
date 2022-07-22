import React from 'react';

const Button = ({ type, text, icon, role, action }) => {
	return (
		<button
			onClick={action}
			role={role}
			className={
				type === 'primary'
					? 'flex justify-center items-center gap-1 text-white bg-primary-blue py-3 px-12 rounded-md uppercase hover:bg-primary-blue-hover border-primary-blue hover:border-primary-blue-hover border-2 hover:text-white duration-200 font-medium text-sm'
					: 'flex justify-center items-center gap-1 text-primary-blue bg-transparent border-primary-blue py-3 px-12 rounded-md uppercase hover:bg-primary-violet-hover  border-2 hover:text-primary-blue duration-200 font-medium text-sm'
			}
		>
			{text}

			{icon && (
				<p>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="h-4 w-4"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
						strokeWidth={2}
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M9 5l7 7-7 7"
						/>
					</svg>
				</p>
			)}
		</button>
	);
};

export default Button;

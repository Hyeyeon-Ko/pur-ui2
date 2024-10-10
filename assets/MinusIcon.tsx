import { SVGProps } from 'react';

export const Minus8 = (props: SVGProps<SVGSVGElement>) => (
	<svg
		width='8'
		height='8'
		viewBox='0 0 8 8'
		fill='none'
		xmlns='http://www.w3.org/2000/svg'
		{...props}
	>
		<path
			d='M0.93335 4H7.06668'
			stroke='currentColor'
			strokeWidth='0.6'
			strokeLinecap='round'
		/>
	</svg>
);

export const Minus12 = (props: SVGProps<SVGSVGElement>) => {
	return (
		<svg
			width='12'
			height='12'
			viewBox='0 0 12 12'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
			{...props}
		>
			<path
				d='M1.40002 6H10.6'
				stroke='currentColor'
				strokeWidth='1.25'
				strokeLinecap='round'
			/>
		</svg>
	);
};

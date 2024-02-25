import * as React from 'react';
import { cn } from '@/lib/utils';
import { colVariants, sizeEnum } from './utils';

export interface ColProps extends React.HTMLAttributes<HTMLDivElement> {
	xs?: keyof typeof sizeEnum;
	sm?: keyof typeof sizeEnum;
	md?: keyof typeof sizeEnum;
	lg?: keyof typeof sizeEnum;
	xl?: keyof typeof sizeEnum;
	'2xl'?: keyof typeof sizeEnum;
}

export const Col: React.FC<ColProps> = ({
	xs,
	sm,
	md,
	lg,
	xl,
	children,
	className,
	'2xl': _2xl,
	...props
}) => {
	return (
		<div
			className={cn(colVariants({ xs, sm, md, lg, xl, '2xl': _2xl, className }))}
			{...props}
		>
			{children}
		</div>
	);
};

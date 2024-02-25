import * as React from 'react';
import {
	wrap,
	direction,
	alignItems,
	rowVariants,
	justifyContent,
} from './utils';
import { cn } from '@/lib/utils';

export interface RowProps extends React.HTMLAttributes<HTMLDivElement> {
	wrap?: keyof typeof wrap;
	direction?: keyof typeof direction;
	alignItems?: keyof typeof alignItems;
	justifyContent?: keyof typeof justifyContent;
}

export const Row: React.FC<RowProps> = ({
	wrap,
	children,
	direction,
	className,
	alignItems,
	justifyContent,
	...props
}) => {
	return (
		<div
			className={cn(
				rowVariants({ direction, justifyContent, alignItems, className }),
			)}
			{...props}
		>
			{children}
		</div>
	);
};

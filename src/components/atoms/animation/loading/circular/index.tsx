import { cn } from '@/lib/utils';
import { spinnerVariants } from './utils';
import classes from './styles.module.css';
import { colorsEnums } from '@/commons/enums';
import { FC } from 'react';

type SpinnerAnimationProps = {
	size?: 'sm' | 'md' | 'lg';
	color?: keyof typeof colorsEnums;
};

export const SpinnerAnimation: FC<SpinnerAnimationProps> = ({
	size,
	color = 'primary',
}) => {
	return (
		<div
			className={`${cn(spinnerVariants({ color, size }))} ${classes.spinner}`}
		/>
	);
};

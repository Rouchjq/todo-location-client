import React, { FC } from 'react';
import classes from './styles.module.css';
import { colorsEnums } from '@/commons/enums';
import { cn } from '@/lib/utils';
import { barsVariants } from './utils';

type BarsAnimationsProps = {
	color?: keyof typeof colorsEnums;
};

export const BarsAnimations: FC<BarsAnimationsProps> = ({
	color = 'primary',
}) => {
	return (
		<div className={classes.spinner}>
			<div className={`${cn(barsVariants({ color }))} ${classes.rect1}`}></div>
			<div className={`${cn(barsVariants({ color }))} ${classes.rect2}`}></div>
			<div className={`${cn(barsVariants({ color }))} ${classes.rect3}`}></div>
			<div className={`${cn(barsVariants({ color }))} ${classes.rect4}`}></div>
			<div className={`${cn(barsVariants({ color }))} ${classes.rect5}`}></div>
		</div>
	);
};

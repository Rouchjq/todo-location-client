import { cva } from 'class-variance-authority';

export const wrap = {
	none: 'flex-nowrap',
	reverse: 'flex-wrap-reverse',
};

export const direction = {
	row: 'flex-row',
	rowReverse: 'flex-row-reverse',
};

export const justifyContent = {
	end: 'justify-end',
	start: 'justify-start',
	center: 'justify-center',
	around: 'justify-around',
	between: 'justify-between',
};

export const alignItems = {
	end: 'items-end',
	start: 'items-start',
	center: 'items-center',
	stretch: 'items-stretch',
	baseline: 'items-baseline',
};

export const rowVariants = cva('flex flex-wrap', {
	variants: {
		wrap,
		direction,
		alignItems,
		justifyContent,
	},

	defaultVariants: {
		direction: 'row',
		alignItems: 'stretch',
		justifyContent: 'start',
	},
});

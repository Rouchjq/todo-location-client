import { cva } from 'class-variance-authority';

export const tagName = Object.freeze({
	a: 'a',
	p: 'p',
	h1: 'h1',
	h2: 'h2',
	h3: 'h3',
	h4: 'h4',
	h5: 'h5',
	ul: 'ul',
	h6: 'h6',
	li: 'li',
	span: 'span',
	label: 'label',
});

export const fontSize = {
	button: 'text-[14px]',
	body: 'text-[16px] text-justify',
	title: 'text-[18px] md:text-[20px]',
	small: 'text-[13px] md:text-[14px]',
	label: 'text-[143x] md:text-[15px]',
	minimum: 'text-[13px] md:text-[12px]',
	subtitle: 'text-[15px] md:text-[17px]',
};

export const weight = {
	bold: 'font-[700]',
	light: 'font-[300]',
	medium: 'font-[500]',
	regular: 'font-[400]',
	semiBold: 'font-[600]',
};

export const color = {
	ring: 'text-ring',
	input: 'text-input',
	border: 'text-border',
	tertiary: 'text-tertiary',
	foreground: 'text-foreground',
	background: 'text-background',
	muted: 'text-muted-foreground',
	accent: 'text-accent-foreground',
	popover: 'text-popover-foreground',
	primary: 'text-primary-foreground',
	secondary: 'text-secondary-foreground',
	card: 'text-card-foreground-foreground',
	destructive: 'text-destructive-foreground',
};

export const typographyVariants = cva(
	'm-0 p-0',

	{
		variants: {
			color,
			weight,
			fontSize,
		},
	},
);

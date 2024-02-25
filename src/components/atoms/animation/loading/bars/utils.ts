import { cva } from 'class-variance-authority';

export const color = {
	card: 'bg-card',
	ring: 'bg-ring',
	input: 'bg-input',
	muted: 'bg-muted',
	accent: 'bg-accent',
	border: 'bg-border',
	primary: 'bg-primary',
	popover: 'bg-popover',
	tertiary: 'bg-tertiary',
	secondary: 'bg-secondary',
	foreground: 'bg-foreground',
	background: 'bg-background',
	destructive: 'bg-destructive',
	cardForeground: 'bg-card-foreground',
	mutedForeground: 'bg-muted-foreground',
	accentForeground: 'bg-accent-foreground',
	popoverForeground: 'bg-popover-foreground',
	primaryForeground: 'bg-primary-foreground',
	secondaryForeground: 'bg-secondary-foreground',
	destructiveForeground: 'bg-destructive-foreground',
};

export const barsVariants = cva('', { variants: { color } });

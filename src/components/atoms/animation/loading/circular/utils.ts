import { cva } from 'class-variance-authority';

export const color = {
	card: 'border-y-card border-l-card',
	ring: 'border-y-ring border-l-ring',
	input: 'border-y-input border-l-input',
	muted: 'border-y-muted border-l-muted',
	accent: 'border-y-accent border-l-accent',
	border: 'border-y-border border-l-border',
	primary: 'border-y-primary border-l-primary',
	popover: 'border-y-popover border-l-popover',
	tertiary: 'border-y-tertiary border-l-tertiary',
	secondary: 'border-y-secondary border-l-secondary',
	background: 'border-y-background border-l-background',
	foreground: 'border-y-foreground border-l-foreground',
	destructive: 'border-y-destructive border-l-destructive',
	cardForeground: 'border-y-card-foreground border-l-card-foreground',
	mutedForeground: 'border-y-muted-foreground border-l-muted-foreground',
	accentForeground: 'border-y-accent-foreground border-l-accent-foreground',
	popoverForeground: 'border-y-popover-foreground border-l-popover-foreground',
	primaryForeground: 'border-y-primary-foreground border-l-primary-foreground',
	secondaryForeground:
		'border-y-secondary-foreground border-l-secondary-foreground',
	destructiveForeground:
		'border-y-destructive-foreground border-l-destructive-foreground',
};

export const size = {
	sm: 'w-[20px] h-[20px]',
	md: 'w-[40px] h-[40px] border-4',
	lg: 'w-[60px] h-[60px] border-6',
};

export const spinnerVariants = cva('border-2 border-secondary', {
	variants: { color, size },
	defaultVariants: { size: 'sm' },
});

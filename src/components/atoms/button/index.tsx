import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';
import { BarsAnimations } from '../animation/loading/bars';
import { colorsEnums } from '@/commons/enums';
import { SpinnerAnimation } from '../animation/loading/circular';

const buttonVariants = cva(
	'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
	{
		variants: {
			variant: {
				ghost: 'hover:bg-accent hover:text-accent-foreground',
				link: 'text-primary underline-offset-4 hover:underline',
				default:
					'bg-primary text-primary-foreground hover:bg-primary/80 hover:text-foreground ',
				secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
				destructive:
					'bg-destructive text-destructive-foreground hover:bg-destructive/90',
				outline:
					'border border-input text-foreground bg-transparent hover:bg-accent hover:text-accent-foreground',
			},

			size: {
				icon: 'h-10 w-10',
				default: 'h-10 px-4 py-2',
				sm: 'h-9 rounded-md px-3',
				lg: 'h-11 rounded-md px-8',
			},
		},

		defaultVariants: {
			size: 'default',
			variant: 'default',
		},
	},
);

export interface ButtonProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement>,
		VariantProps<typeof buttonVariants> {
	asChild?: boolean;
	loading?: boolean;
	children?: React.ReactNode;
	colorLoading?: keyof typeof colorsEnums;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
	(
		{
			size,
			variant,
			className,
			asChild = false,
			colorLoading = 'primary',
			...props
		},
		ref,
	) => {
		const Comp = asChild ? Slot : 'button';

		return (
			<Comp
				ref={ref}
				disabled={props.disabled || props.loading}
				className={cn(buttonVariants({ variant, size, className }))}
				{...props}
			>
				{props.loading ? (
					<SpinnerAnimation color={colorLoading} size='sm' />
				) : (
					props.children
				)}
			</Comp>
		);
	},
);

Button.displayName = 'Button';

export { Button, buttonVariants };

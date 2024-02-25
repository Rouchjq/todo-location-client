import * as React from 'react';
import { color, fontSize, tagName, typographyVariants, weight } from './utils';
import { cn } from '@/lib/utils';

export interface TypographyProps extends React.HTMLProps<HTMLElement> {
	className?: string;
	Tag?: keyof typeof tagName;
	color?: keyof typeof color;
	children?: React.ReactNode;
	weight?: keyof typeof weight;
	fontSize?: keyof typeof fontSize;
	onClick?: React.MouseEventHandler<HTMLElement>;
}

export const Typography: React.FC<TypographyProps> = ({
	htmlFor,
	onClick,
	children,
	Tag = 'p',
	className,
	color = 'foreground',
	fontSize = 'body',
	weight = 'regular',
}) => {
	return (
		<Tag
			htmlFor={htmlFor}
			onClick={onClick}
			role={onClick && 'button'}
			className={cn(typographyVariants({ fontSize, color, weight, className }))}
		>
			{children}
		</Tag>
	);
};

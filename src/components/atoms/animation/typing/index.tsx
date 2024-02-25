import { FC, useEffect, useState } from 'react';

type TypingAnimationProps = {
	text: string;
	className?: string;
};

export const TypingAnimation: FC<TypingAnimationProps> = ({
	text,
	className,
}) => {
	const [i, setI] = useState(0);
	const [displayText, setDisplayText] = useState('');
	const [textComplete, setTextComplete] = useState(text);

	useEffect(() => {
		if (textComplete !== text) {
			setTextComplete(text);
			setDisplayText('');
			setI(0);
		}
	}, [text, textComplete]);

	useEffect(() => {
		const interval = setInterval(() => {
			if (i < text.length) {
				setDisplayText((prevText) => {
					return prevText + text.charAt(i);
				});
				setI((prevI) => prevI + 1);
			} else {
				clearInterval(interval);
			}
		}, 50);

		return () => clearInterval(interval);
	}, [text, i]);

	return <span className={className}>{displayText}</span>;
};

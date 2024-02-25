// main tools
import Image from 'next/image';

// components
import { Typography } from '@/components/atoms/typography';
import { Col } from '@/components/atoms/col';
import { Row } from '@/components/atoms/row';

// styles
import classes from './styles.module.css';

// type
import { TaskDataType } from '@/types/models/task';
import { FC } from 'react';

interface TaskCardProps extends TaskDataType {}

export const TaskCard: FC<TaskCardProps> = ({ ...props }) => {
	return (
		<Row className='shadow-lg'>
			<Col xs={10} className='flex flex-col gap-1'>
				<Typography fontSize='body' className='text-zinc-300'>
					#{props.id}
				</Typography>
				<Typography
					Tag='h3'
					fontSize='subtitle'
					color='foreground'
					weight='semiBold'
				>
					{props.title}
				</Typography>
				<div className={classes.address}>
					<Typography fontSize='minimum' color='foreground'>
						{props.address}
					</Typography>
				</div>
			</Col>
		</Row>
	);
};

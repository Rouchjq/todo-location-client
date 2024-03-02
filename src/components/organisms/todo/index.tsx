'use client';

// main tools
import { useState } from 'react';

// compoents
import { Typography } from '@/components/atoms/typography';
import { TaskDetails } from './task-details';
import { TaskCard } from './task-card';

// hooks
import { useTodo } from '@/hooks/use-todo';

// styles
import { ArrowLeftIcon } from '@radix-ui/react-icons';

// types
import { TaskDataType } from '@/types/models/task';
import { SetStateType } from '@/types';
import { FC } from 'react';
import { Skeleton } from '@/components/atoms/skeleton';
import { Row } from '@/components/atoms/row';
import { Col } from '@/components/atoms/col';
import { cn } from '@/lib/utils';

type TodoProps = {};

export const Todo: FC<TodoProps> = ({}) => {
	const { todoState, loading } = useTodo();
	const [taskSelected, setTaskSelected] = useState<TaskDataType>();

	return (
		<div className='h-full overflow-auto'>
			<div
				className={cn(` ${!taskSelected ? 'max-w-5xl' : 'max-w-lg'}  mx-auto `)}
			>
				{!taskSelected ? (
					<div>
						<Typography
							Tag='h2'
							fontSize='title'
							weight='semiBold'
							color='foreground'
							className='mb-5 text-center'
						>
							List Job
						</Typography>
						{!todoState || loading ? (
							<Row>
								{[...Array(6)].map((_, i) => (
									<Col xs={12} md={6} key={i} className='px-5'>
										<Skeleton className='h-28 w-full mb-8' />
									</Col>
								))}
							</Row>
						) : todoState.length > 0 ? (
							<Row>
								{todoState.map((task) => (
									<Col
										xs={12}
										md={6}
										key={task.id}
										className='cursosr-pointer mb-8 px-5 '
										onClick={() => setTaskSelected(task)}
									>
										<TaskCard {...task} />
									</Col>
								))}
							</Row>
						) : (
							<div>
								<Typography
									fontSize='small'
									weight='semiBold'
									className='text-center text-foreground'
								>
									There are no tasks at this time
								</Typography>
							</div>
						)}
					</div>
				) : (
					<div className='h-[70vh] md:h-full flex flex-col justify-center '>
						<div className='mb-5' onClick={() => setTaskSelected(undefined)}>
							<ArrowLeftIcon className='h-[1.5rem] w-[1.5rem] text-foreground cursor-pointer' />
						</div>
						<TaskDetails {...taskSelected} />
					</div>
				)}
			</div>
		</div>
	);
};

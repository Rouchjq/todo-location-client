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

type TodoProps = {
	setShowTaskList: SetStateType<boolean>;
};

export const Todo: FC<TodoProps> = ({ setShowTaskList }) => {
	const { todoState } = useTodo();
	const [taskSelected, setTaskSelected] = useState<TaskDataType>();

	return (
		<div className='h-full overflow-auto'>
			{!taskSelected ? (
				<div>
					<Typography
						Tag='h2'
						className='mb-5'
						weight='semiBold'
						color='foreground'
						fontSize='subtitle'
					>
						List Job
					</Typography>
					{!todoState ? (
						<div className=''>
							{[...Array(4)].map((_, i) => (
								<Skeleton key={i} className='h-16 w-full mb-8' />
							))}
						</div>
					) : todoState.length > 0 ? (
						todoState.map((task) => (
							<div
								key={task.id}
								className='cursosr-pointer mb-8'
								onClick={() => setTaskSelected(task)}
							>
								<TaskCard {...task} />
							</div>
						))
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
				<div>
					<div className='mb-5' onClick={() => setTaskSelected(undefined)}>
						<ArrowLeftIcon className='h-[1.5rem] w-[1.5rem] text-foreground cursor-pointer' />
					</div>
					<TaskDetails {...taskSelected} setShowTaskList={setShowTaskList} />
				</div>
			)}
		</div>
	);
};

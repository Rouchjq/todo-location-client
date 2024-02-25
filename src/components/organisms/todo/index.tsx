// main tools
import { Fragment, useState } from 'react';

// main tools
import { Typography } from '@/components/atoms/typography';
import { TaskCard } from './task-card';

// hooks
import { useTodo } from '@/hooks/use-todo';

// styles
import { ArrowLeftIcon } from '@radix-ui/react-icons';

// types
import { TaskDataType } from '@/types/models/task';
import { FC } from 'react';
import { TaskDetails } from './task-details';

export const Todo: FC = () => {
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
					{todoState?.map((task) => (
						<div
							key={task.id}
							className='cursosr-pointer mb-8'
							onClick={() => setTaskSelected(task)}
						>
							<TaskCard {...task} />
						</div>
					))}
				</div>
			) : (
				<div>
					<div className='mb-5' onClick={() => setTaskSelected(undefined)}>
						<ArrowLeftIcon className='h-[1.5rem] w-[1.5rem] text-foreground cursor-pointer' />
					</div>
					<TaskDetails {...taskSelected} />
				</div>
			)}
		</div>
	);
};

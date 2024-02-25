// main tools
import { useState } from 'react';

// components
import {
	Select,
	SelectItem,
	SelectValue,
	SelectContent,
	SelectTrigger,
} from '@/components/atoms/animation/select';
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/atoms/popover';
import { Typography } from '@/components/atoms/typography';
import { Textarea } from '@/components/atoms/text-area';
import { Button } from '@/components/atoms/button';
import { Col } from '@/components/atoms/col';
import { Row } from '@/components/atoms/row';

// hooks
import { useTodo } from '@/hooks/use-todo';

// utils
import { todoCases } from '@/context/todo/reducer/case';

// enums
import { taskStatusEnums } from '@/commons/enums';

// utils
import { selectOptions } from './utils';

// styles
import classes from './styles.module.css';

// type
import { TaskDataType } from '@/types/models/task';
import { ChangeEvent, FC } from 'react';

interface TaskDetailsProps extends TaskDataType {}

export const TaskDetails: FC<TaskDetailsProps> = ({ ...props }) => {
	const { dispatch } = useTodo();
	const [note, setNote] = useState(props.note);
	const [status, setStatus] = useState(props.status);

	const handleChangeStatus = (status: string) => {
		setStatus(status as keyof typeof taskStatusEnums);
		dispatch({
			type: todoCases.CHANGE_STATUS,
			payload: {
				status,
				id: props.id,
			},
		});
	};

	const handleChangeNote = (e: ChangeEvent<HTMLTextAreaElement>) => {
		const { value } = e.target;
		setNote(value);

		dispatch({
			type: todoCases.EDIT_NOTE,
			payload: { id: props.id, note: value },
		});
	};

	return (
		<div>
			<Typography fontSize='minimum' className={classes.label}>
				Task ID: #{props.id}
			</Typography>
			<Typography fontSize='title' weight='semiBold'>
				{props.title}
			</Typography>
			<Row className='my-1'>
				<Col xs={6}>
					<Select value={status} onValueChange={handleChangeStatus}>
						<SelectTrigger className='w-[140px] mb-5'>
							<SelectValue />
						</SelectTrigger>
						<SelectContent>
							{selectOptions.map((option) => (
								<SelectItem key={option.value} value={option.value}>
									{option.label}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				</Col>
				<Col xs={6} className='flex justify-end'>
					<Popover>
						<PopoverTrigger asChild>
							<Button variant='ghost' className='rounded-lg bg-neutral-300'>
								View Details
							</Button>
						</PopoverTrigger>
						<PopoverContent align='end' className='ml-5'>
							<div>
								<Typography>{props.description}</Typography>
							</div>
						</PopoverContent>
					</Popover>
				</Col>
			</Row>

			<div className='mb-3'>
				<Typography fontSize='subtitle' weight='semiBold'>
					Address
				</Typography>
				<Typography fontSize='body' weight='light' className='text-neutral-400'>
					{props.address}
				</Typography>
			</div>

			<div>
				<Textarea
					value={note}
					placeholder='Enter Notes'
					onChange={(e) => handleChangeNote(e)}
				/>
			</div>
		</div>
	);
};

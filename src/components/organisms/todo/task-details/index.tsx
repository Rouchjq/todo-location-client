// main tools
import { useState } from 'react';
import { toast } from 'sonner';
import axios from 'axios';

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
import { useLocation } from '@/hooks/use-location';
import { useTodo } from '@/hooks/use-todo';
import { useMap } from '@/hooks/use-map';

// utils
import { todoCases } from '@/context/todo/reducer/case';
import { base_url } from '@/commons';

// enums
import { taskStatusEnums, travelModeEnums } from '@/commons/enums';

// utils
import { selectOptions } from './utils';

// icons
import { ExclamationCircleFill } from 'react-bootstrap-icons';

// styles
import classes from './styles.module.css';

// type
import { TaskDataType } from '@/types/models/task';
import { ChangeEvent, FC } from 'react';
import { SetStateType } from '@/types';

interface TaskDetailsProps extends TaskDataType {
	setShowTaskList: SetStateType<boolean>;
}

export const TaskDetails: FC<TaskDetailsProps> = ({
	setShowTaskList,
	...props
}) => {
	const { setDirectionsValue } = useMap();
	const { todoState, dispatch } = useTodo();
	const { location, error } = useLocation();
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

	const checkChangesExist = () => {
		const findedTask = todoState?.find((item) => item.id === props.id);

		if (findedTask)
			return findedTask.status !== props.status || findedTask.note !== props.note;
		else return false;
	};

	const handleSaveChange = async () => {
		try {
			const { data } = await axios.put(`${base_url}/${props.id}`, {
				note: note,
				status: status,
			});

			toast.success(`Changes saves correctly`);
		} catch (err) {
			console.log('🚀 ~ handleSaveChange ~ err:', err);
			toast.error(`Error save changes: ${err}`);
		}
	};

	const handleTraceRoute = async () => {
		if (!location) return toast.error('Error getting location');
		if (error) return toast.error(`Error getting location: ${error}`);

		if (checkChangesExist()) {
			toast('You have unsaved changes', {
				icon: <ExclamationCircleFill />,
				description: ' saving changes automatically...',
			});
			await handleSaveChange();
		}

		setDirectionsValue({
			destination: props.address,
			travelMode: travelModeEnums.DRIVING,
			origin: `${location.lat}, ${location.lng}`,
		});

		setShowTaskList(false);
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

			<div className='mb-5'>
				<Textarea
					value={note}
					placeholder='Enter Notes'
					onChange={(e) => handleChangeNote(e)}
				/>
			</div>

			<div className='flex justify-between'>
				<Button variant='secondary' onClick={handleTraceRoute}>
					Trace route
				</Button>
				<Button variant='secondary' onClick={handleSaveChange}>
					Save
				</Button>
			</div>
		</div>
	);
};

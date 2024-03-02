// components
import {
	Select,
	SelectItem,
	SelectValue,
	SelectTrigger,
	SelectContent,
} from '@/components/atoms/animation/select';
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/atoms/popover';
import { Typography } from '@/components/atoms/typography';
import { Button } from '@/components/atoms/button';
import { ToggleTheme } from '../toggle-theme';

// utils
import { taskStatusEnums } from '@/commons/enums';
import { cn } from '@/lib/utils';

// styles
import classes from './styles.module.css';

// types
import { FC } from 'react';
import { selectOptions } from '@/components/organisms/todo/task-details/utils';
import { SetStateType } from '@/types';
import { useTodo } from '@/hooks/use-todo';
import axios from 'axios';
import { toast } from 'sonner';
import { base_url } from '@/commons';
import { todoCases } from '@/context/todo/reducer/case';

type HeaderProps = {};

export const Header: FC<HeaderProps> = () => {
	const { filterTasks, setFilterTasks, dispatch, setLoading } = useTodo();

	const handleChangeStatus = (status: string) => {
		setFilterTasks({ ...filterTasks, status });
	};

	const handleChangeFilterDate = (date: string) => {
		if (date === filterTasks.date)
			return setFilterTasks({ ...filterTasks, date: '' });
		else setFilterTasks({ ...filterTasks, date });
	};

	const handleClearfilter = async () => {
		setFilterTasks({ date: '', status: '' });

		try {
			setLoading(true);
			const { data, status } = await axios.get(`${base_url}`);
			if (status === 200) {
				dispatch({ type: todoCases.GET_ALL_TASKS, payload: data });
			} else return [];
		} catch (error) {
			console.error(error);
			toast.error(`Error fetching tasks:${error}`);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className={cn('bg-background text-foreground', classes.container)}>
			<div>
				<Popover>
					<PopoverTrigger asChild>
						<Button variant='outline' className='text-foreground'>
							Tasks filter
						</Button>
					</PopoverTrigger>
					<PopoverContent className='w-80'>
						<div className='grid gap-4'>
							<div className='space-y-2'>
								<p className='text-xs text-muted-foreground'>
									Here you can filter tasks by status
								</p>
							</div>

							<div className='flex gap-2'>
								<Select value={filterTasks.status} onValueChange={handleChangeStatus}>
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

								<Button variant='outline' onClick={handleClearfilter}>
									Clear filters
								</Button>
							</div>
							{filterTasks.status !== taskStatusEnums.completed && (
								<div className='flex gap-2'>
									<Button
										variant={filterTasks.date === 'today' ? 'default' : 'outline'}
										onClick={() => handleChangeFilterDate('today')}
									>
										Today
									</Button>
									<Button
										variant={filterTasks.date === 'tomorrow' ? 'default' : 'outline'}
										onClick={() => handleChangeFilterDate('tomorrow')}
									>
										Tomorrow
									</Button>
									<Button
										variant={filterTasks.date === 'yesterday' ? 'default' : 'outline'}
										onClick={() => handleChangeFilterDate('yesterday')}
									>
										Yesterday
									</Button>
								</div>
							)}
						</div>
					</PopoverContent>
				</Popover>
			</div>

			<div className='flex gap-5 items-center'>
				<Typography className='text-foreground'>Theme</Typography>
				<ToggleTheme />
			</div>
		</div>
	);
};

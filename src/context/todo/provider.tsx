'use client';

// main tools
import { useCallback, useEffect, useMemo, useReducer, useState } from 'react';
import { toast } from 'sonner';
import axios from 'axios';

// context
import { TodoContext } from './context';

// reducer
import { reducer } from './reducer';

// utils
import { base_url } from '@/commons';

// types
import { FC, ReactNode } from 'react';
import { todoCases } from './reducer/case';
import { TaskDataType } from '@/types/models/task';
import { taskStatusEnums } from '@/commons/enums';

type TodoContextProps = {
	children: ReactNode;
};

export const TodoContextProvider: FC<TodoContextProps> = ({ children }) => {
	const [loading, setLoading] = useState(false);
	const [todoState, dispatch] = useReducer(reducer, undefined);
	console.log('🚀 ~ todoState:', todoState);
	const [filterTasks, setFilterTasks] = useState({
		date: '',
		status: '',
	});

	const getAllTasks = useCallback(async () => {
		try {
			setLoading(true);
			const { data, status } = await axios.get(`${base_url}`);
			if (status === 200) {
				if (filterTasks.status) {
					const filteredData = data.filter(
						(item: TaskDataType) => item.status === filterTasks.status,
					);
					return filteredData;
				}

				return data;
			} else return [];
		} catch (error) {
			console.error(error);
			toast.error(`Error fetching tasks:${error}`);
		} finally {
			setLoading(false);
		}
	}, [filterTasks.status]);

	const getTasksByDate = useCallback(async () => {
		try {
			setLoading(true);
			const { data, status } = await axios.get(
				`${base_url}/date/${filterTasks.date}`,
			);
			console.log('🚀 ~ getTasksByDate ~ data:', data);
			if (status === 200) {
				if (filterTasks.date) {
					const filteredData = data.filter(
						(item: TaskDataType) => item.status === filterTasks.status,
					);
					return filteredData;
				}

				return data;
			} else return [];
		} catch (error) {
			console.error(error);
			toast.error(`Error fetching tasks:${error}`);
		} finally {
			setLoading(false);
		}
	}, [filterTasks.date, filterTasks.status]);

	const getTasksCompleted = useCallback(async () => {
		try {
			const { data, status } = await axios.get(`${base_url}/completed`);
			if (status === 200) {
				return data;
			} else return [];
		} catch (error) {
			console.error(error);
			toast.error(`Error fetching tasks:${error}`);
		}
	}, []);

	const getStatusFilter = useCallback(() => {
		return (
			!filterTasks.date &&
			filterTasks.status &&
			filterTasks.status !== taskStatusEnums.completed
		);
	}, [filterTasks.status, filterTasks.date]);

	const getDateFilter = useCallback(() => {
		return (
			(!filterTasks.status && filterTasks.date) ||
			(filterTasks.date &&
				filterTasks.status &&
				filterTasks.status !== taskStatusEnums.completed)
		);
	}, [filterTasks.date, filterTasks.status]);

	const fetchTasks = useCallback(async () => {
		try {
			setLoading(true);
			if (getStatusFilter()) {
				const tasks = await getAllTasks();
				dispatch({ type: todoCases.GET_ALL_TASKS, payload: tasks });
			} else if (getDateFilter()) {
				const tasks = await getTasksByDate();
				dispatch({ type: todoCases.GET_ALL_TASKS, payload: tasks });
			} else if (filterTasks.status === taskStatusEnums.completed) {
				const tasks = await getTasksCompleted();
				dispatch({ type: todoCases.GET_ALL_TASKS, payload: tasks });
			}
		} catch (err) {
			toast.error(`Err fetching tasks:${err}`);
		} finally {
			setLoading(false);
		}
	}, [
		getAllTasks,
		getDateFilter,
		getTasksByDate,
		getStatusFilter,
		getTasksCompleted,
		filterTasks.status,
	]);

	const context = useMemo(
		() => ({
			loading,
			dispatch,
			todoState,
			setLoading,
			filterTasks,
			setFilterTasks,
		}),
		[dispatch, todoState, filterTasks, setFilterTasks, loading],
	);

	useEffect(() => {
		if (!todoState)
			getAllTasks()
				.then((tasks) =>
					dispatch({ type: todoCases.GET_ALL_TASKS, payload: tasks }),
				)
				.catch((err) => {
					toast.error(`Err fetching tasks:${err}`);
				});
	}, [getAllTasks, todoState, filterTasks]);

	useEffect(() => {
		fetchTasks(); // Call the function to fetch tasks on initial render and updates
	}, [fetchTasks]);

	return <TodoContext.Provider value={context}>{children}</TodoContext.Provider>;
};

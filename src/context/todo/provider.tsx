'use client';

// main tools
import { useCallback, useEffect, useMemo, useReducer } from 'react';
import { toast } from 'sonner';
import axios from 'axios';

// context
import { TodoContext } from './context';

// reducer
import { reducer } from './reducer';

// utils
import { INITIAL_STATE } from './reducer/utils';
import { base_url } from '@/commons';

// types
import { FC, ReactNode } from 'react';
import { todoCases } from './reducer/case';

type TodoContextProps = {
	children: ReactNode;
};

export const TodoContextProvider: FC<TodoContextProps> = ({ children }) => {
	const [todoState, dispatch] = useReducer(reducer, undefined);

	const getAllTasks = useCallback(async () => {
		try {
			const { data } = await axios.get(`${base_url}`);
			return data;
		} catch (error) {
			console.error(error);
			toast.error(`Error fetching tasks:${error}`);
		}
	}, []);

	const context = useMemo(
		() => ({
			dispatch,
			todoState,
		}),
		[dispatch, todoState],
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
	}, [getAllTasks, todoState]);

	return <TodoContext.Provider value={context}>{children}</TodoContext.Provider>;
};

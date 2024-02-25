'use client';

// main tools
import { useMemo, useReducer } from 'react';

// context
import { TodoContext } from './context';

// reducer
import { reducer } from './reducer';

// utils
import { INITIAL_STATE } from './reducer/utils';

// types
import { FC, ReactNode } from 'react';

type TodoContextProps = {
	children: ReactNode;
};

export const TodoContextProvider: FC<TodoContextProps> = ({ children }) => {
	const [todoState, dispatch] = useReducer(reducer, INITIAL_STATE);

	const context = useMemo(
		() => ({
			dispatch,
			todoState,
		}),
		[dispatch, todoState],
	);

	return <TodoContext.Provider value={context}>{children}</TodoContext.Provider>;
};

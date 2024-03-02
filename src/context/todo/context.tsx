// main tools
import { createContext } from 'react';

// types
import { TaskDataType } from '@/types/models/task';
import { Dispatch } from 'react';
import { SetStateType } from '@/types';

type TodoContextProps = {
	loading: boolean;
	todoState?: TaskDataType[];
	setLoading: SetStateType<boolean>;
	filterTasks: { date: string; status: string };
	setFilterTasks: SetStateType<{ status: string; date: string }>;
	dispatch: Dispatch<{
		type: string;
		payload: any;
	}>;
};

export const TodoContext = createContext<TodoContextProps>({
	loading: false,
	dispatch: () => {},
	setLoading: () => {},
	todoState: undefined,
	setFilterTasks: () => {},
	filterTasks: { date: '', status: '' },
});

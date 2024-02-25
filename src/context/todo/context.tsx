// main tools
import { createContext } from 'react';

// types
import { TaskDataType } from '@/types/models/task';
import { Dispatch } from 'react';

type TodoContextProps = {
	todoState?: TaskDataType[];
	dispatch: Dispatch<{
		type: string;
		payload: any;
	}>;
};

export const TodoContext = createContext<TodoContextProps>({
	todoState: undefined,
	dispatch: () => {},
});

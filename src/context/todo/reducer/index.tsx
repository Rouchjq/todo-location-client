// cases
import { todoActions } from './action';
import { todoCases } from './case';

// types
import { TaskDataType } from '@/types/models/task';

export type TodoTaskPayload = any;

export const reducer = (
	state: TaskDataType[] | undefined,
	action: { type: string; payload: TodoTaskPayload },
) => {
	const { type, payload } = action;

	switch (type) {
		case todoCases.GET_ALL_TASKS:
			return todoActions.getAllTasks(payload);

		case todoCases.CHANGE_STATUS:
			return todoActions.changeStatus(state!, payload);

		case todoCases.EDIT_NOTE:
			return todoActions.editNote(state!, payload);

		default:
			return state;
	}
};

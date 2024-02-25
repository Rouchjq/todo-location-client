// cases
import { todoActions } from './action';
import { todoCases } from './case';

// types
import { TaskDataType } from '@/types/models/task';

export type TodoTaskPayload = any;

export const reducer = (
	state: TaskDataType[],
	action: { type: string; payload: TodoTaskPayload },
) => {
	const { type, payload } = action;

	switch (type) {
		case todoCases.CHANGE_STATUS:
			return todoActions.changeStatus(state, payload);

		case todoCases.EDIT_NOTE:
			return todoActions.editNote(state, payload);

		default:
			return state;
	}
};

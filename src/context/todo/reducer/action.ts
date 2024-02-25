// enums
import { taskStatusEnums } from '@/commons/enums';

// types
import { TaskDataType } from '@/types/models/task';

export const todoActions = {
	changeStatus: (
		state: TaskDataType[],
		payload: { id: string; status: keyof typeof taskStatusEnums },
	) => {
		const { id, status } = payload;
		const newState = [...state];
		const itemIndex = state.findIndex((item) => item.id === id);

		newState[itemIndex] = {
			...newState[itemIndex],
			status,
		};
		return newState;
	},

	editNote: (state: TaskDataType[], payload: { id: string; note: string }) => {
		const { id, note } = payload;
		const newState = [...state];
		const itemIndex = state.findIndex((item) => item.id === id);

		newState[itemIndex] = {
			...newState[itemIndex],
			note,
		};

		return newState;
	},
};

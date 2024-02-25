// enums
import { taskStatusEnums } from '@/commons/enums';

export type TaskDataType = {
	id: string;
	note: string;
	title: string;
	address: string;
	description: string;
	status: keyof typeof taskStatusEnums;
};

// enums
import { taskStatusEnums } from '@/commons/enums';

export type TaskDataType = {
	id: string;
	note: string;
	date: string;
	title: string;
	address: string;
	description: string;
	status: keyof typeof taskStatusEnums;
	coords?: {
		lat: number;
		lng: number;
	} | null;
};

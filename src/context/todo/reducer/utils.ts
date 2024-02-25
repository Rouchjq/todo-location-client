import { taskStatusEnums } from '@/commons/enums';
import { TaskDataType } from '@/types/models/task';

export const INITIAL_STATE = [
	{
		id: '1',
		note: '',
		title: 'Podar el rosal',
		address: '7286 NW 54th St, Miami, FL 33166, Estados Unidos',
		description:
			'Cortar las ramas secas y enmarañadas del rosal para estimular el crecimiento nuevo y la floración.',
		status: taskStatusEnums.pending,
	},
	{
		id: '2',
		title: 'Fertilizar las hortalizas',
		note: 'Comprar fertilizante para hortalizas',
		address: '10301 NW 25th St, Miami, FL 33172, Estados Unidos',
		description:
			'Aplicar un fertilizante rico en nitrógeno y fósforo para promover el crecimiento de las hortalizas.',
		status: taskStatusEnums.inProgress,
	},
	{
		id: '3',
		note: '',
		status: taskStatusEnums.completed,
		address: 'Miami Lakes Golf Club',
		title: 'Eliminar las malas hierbas del jardín',
		description:
			'Quitar las malas hierbas que compiten con las plantas por agua y nutrientes.',
	},
	{
		id: '4',
		status: taskStatusEnums.pending,
		note: 'Utilizar repelente de mosquitos',
		title: 'Plantar flores tropicales en el jardín',
		address: 'Seminole Hard Rock Hotel & Casino Hollywood, FL',
		description:
			'Plantar flores tropicales como hibiscos, buganvillas y orquídeas para atraer mariposas y colibríes.',
	},
	{
		id: '5',
		status: taskStatusEnums.incompleted,
		address: `Flanigan's Seafood Bar & Grill 14301 W Sunrise Blvd, Sunrise`,
		note: 'Contactar a un especialista en árboles',
		title: 'Evaluar la salud de la palma real en el patio',
		description:
			'Inspeccionar la palma real para detectar posibles enfermedades o daños y obtener recomendaciones de cuidado.',
	},
] as TaskDataType[];

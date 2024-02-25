// types
import {
	Dispatch,
	FormEvent,
	FocusEvent,
	ChangeEvent,
	KeyboardEvent,
	SetStateAction,
} from 'react';
import { GetServerSideProps } from 'next';

export interface ChangeType extends ChangeEvent<HTMLInputElement> {}
export interface FocusType extends FocusEvent<HTMLInputElement> {}
export interface SubmitType extends FormEvent<HTMLFormElement> {}

export interface KeyType
	extends KeyboardEvent<HTMLInputElement | HTMLTextAreaElement> {}

export type GetSSPropsType<PropsType> = PropsType extends GetServerSideProps<
	infer Props,
	any
>
	? Props
	: PropsType;

export type SetStateType<objectType> = Dispatch<SetStateAction<objectType>>;

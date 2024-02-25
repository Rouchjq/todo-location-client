import { TodoContext } from '@/context/todo/context';
import { useContext } from 'react';

export const useTodo = () => useContext(TodoContext);

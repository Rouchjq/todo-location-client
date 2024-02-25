import { AppContext } from '@/context/app/context';
import { useContext } from 'react';

export const useApp = () => useContext(AppContext);

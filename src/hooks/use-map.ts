import { MapContext } from '@/context/map/context';
import { useContext } from 'react';

export const useMap = () => useContext(MapContext);

import { useContext } from 'react';
import { FilterContext } from './FilterContext';

export const useFilter = () => {
  const context = useContext(FilterContext);
  if (!context)
    throw new Error('useFilter precisa estar dentro de FilterProvider');
  return context;
};

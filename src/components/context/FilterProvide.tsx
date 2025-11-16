import { useEffect, useState, type ReactNode } from 'react';
import { useList } from '../../hooks/useList';
import { FilterContext } from './FilterContext';

export const FilterProvide = ({ children }: { children: ReactNode }) => {
  const { lista } = useList();

  const [selectedPriority, setSelectedPriority] = useState('Todas');
  const [selectedStatus, setSelectedStatus] = useState('Aberta');
  const [searchItemValue, setSearchItemValue] = useState(lista ?? []);

  useEffect(() => {
    setSearchItemValue(lista);
  }, [lista]);

  return (
    <FilterContext.Provider
      value={{
        selectedPriority,
        setSelectedPriority,
        selectedStatus,
        setSelectedStatus,
        searchItemValue,
        setSearchItemValue,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};

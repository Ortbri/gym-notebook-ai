import { createContext, useCallback, useContext, useMemo, useRef, useState } from 'react';
import type { FlatList } from 'react-native';
import PagerView from 'react-native-pager-view';

// import type { CalendarContextValue, CalendarProviderProps } from '../';
import { CalendarContextValue, CalendarProviderProps } from '~/components/calendar/types';

export const CalendarContext = createContext<CalendarContextValue | null>(null);

export const CalendarProvider = ({
  children,
  initialDate = new Date(),
  weeks,
  onDateChange,
  dimWeekends = false,
  offsetPageLimit = 7,
}: CalendarProviderProps) => {
  /**State for the active date */
  const [activeDate, setActiveDate] = useState(initialDate);

  /**Memoized days array */
  const days = useMemo(() => weeks.flat(), [weeks]);

  /**Initialize refs for the strip and pager */
  const stripRef = useRef<FlatList<Date[]>>(null);
  const pagerRef = useRef<PagerView>(null);
  const setPage = useCallback((page: number) => {
    pagerRef.current?.setPage(page);
  }, []);
  // active date and calling the onDataChange */
  const handleInternalDateChange = useCallback(
    (newDate: Date) => {
      setActiveDate(newDate);
      onDateChange?.(newDate);
    },
    [onDateChange]
  );

  const contextValue = useMemo(
    () => ({
      activeDate,
      weeks,
      days,
      stripRef,
      pagerRef,
      setPage,
      handleInternalDateChange,
      dimWeekends,
      offsetPageLimit,
    }),
    [
      activeDate,
      weeks,
      days,
      handleInternalDateChange,
      setPage,
      pagerRef,
      dimWeekends,
      offsetPageLimit,
    ]
  );

  return <CalendarContext.Provider value={contextValue}>{children}</CalendarContext.Provider>;
};

export const useCalendar = () => {
  const context = useContext(CalendarContext);
  if (!context) {
    throw new Error('useCalendar must be used within a Calendar provider');
  }
  return context;
};

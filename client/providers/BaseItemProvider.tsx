import React, { createContext, useContext, useState } from 'react';

type BaseitemContextType = {
  selectedEmoji: string;
  selectedColor: string;
  setSelectedEmoji: (emoji: string) => void;
  setSelectedColor: (color: string) => void;
};

const BaseItemContext = createContext<BaseitemContextType | undefined>(undefined);

export function BaseItemProvider({ children }: { children: React.ReactNode }) {
  const [selectedEmoji, setSelectedEmoji] = useState('🛒'); // Default emoji
  const [selectedColor, setSelectedColor] = useState('#9CCAFF'); // Default color

  return (
    <BaseItemContext.Provider
      value={{
        selectedEmoji,
        selectedColor,
        setSelectedEmoji,
        setSelectedColor,
      }}>
      {children}
    </BaseItemContext.Provider>
  );
}

export function useBaseItems() {
  const context = useContext(BaseItemContext);
  if (context === undefined) {
    throw new Error('useListCreation must be used within a ListCreationProvider');
  }
  return context;
}

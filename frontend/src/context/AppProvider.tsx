import React, { createContext, useContext, useState, ReactNode } from 'react';

interface AppContextType {
  userId: string;
  householdId: string;
  setUserId: (id: string) => void;
  setHouseholdId: (id: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [userId, setUserId] = useState('user-1');
  const [householdId, setHouseholdId] = useState('household-1');

  return (
    <AppContext.Provider value={{ userId, householdId, setUserId, setHouseholdId }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};

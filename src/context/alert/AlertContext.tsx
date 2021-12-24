import React, { useReducer, createContext } from 'react';
import alertReducer from './AlertReducer';

interface AlertContextInterface {
  alert: { msg: string; type: string } | null;
  setAlert: (msg: string, type: string) => void;
}
const initialState = { alert: null, setAlert: () => {} };
const AlertContext = createContext<AlertContextInterface>(initialState);

export const AlertProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(alertReducer, null);

  const setAlert = (msg: string, type: string) => {
    dispatch({
      type: 'SET_ALERT',
      payload: { msg, type },
    });
    setTimeout(() => dispatch({ type: 'REMOVE_ALERT' }), 3000);
  };

  return (
    <AlertContext.Provider value={{ alert: state, setAlert }}>
      {children}
    </AlertContext.Provider>
  );
};

export default AlertContext;

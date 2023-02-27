import { createContext, useState } from "react";

export const Context = createContext({
  loggedUser: {
    username: "",
    email: "",
    first_name: "",
  },
  loggedIn: false,
  setLoggedUser: () => {},
  setLoggedIn: () => {},
});

const ContextProvider = ({ children }) => {
  const [login, setLogin] = useState(false);
  const setLoggedUser = (data) => {
    setState((prevState) => ({
      ...prevState,
      loggedUser: data,
    }));
  };

  const setLoggedIn = () => {
    setState((prevState) => ({
      ...prevState,
      loggedIn: !prevState.loggedIn,
    }));
  };

  const initialState = {
    loggedUser: {},
    loggedIn: false,
    admin: false,
    setLoggedUser,
    setLoggedIn,
  };

  const [state, setState] = useState(initialState);

  return (
    <Context.Provider value={{ state, login }}>{children}</Context.Provider>
  );
};
export default ContextProvider;

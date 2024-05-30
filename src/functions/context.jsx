import { useState, createContext } from "react";

// إزالة تعريف الأنواع من TypeScript
// import { PersonObject } from "react-chat-engine-advanced";

// إزالة تعريف الواجهة ContextInterface
/*
export interface ContextInterface {
  user: PersonObject | undefined;
  setUser: (u: PersonObject | undefined) => void;
}
*/

// إزالة تعريف الواجهة ProviderInterface
/*
interface ProviderInterface {
  children: ReactNode;
}
*/

// تعريف السياق بدون الأنواع
export const Context = createContext({
  user: undefined,
  setUser: () => {},
});

export const ContextProvider = (props) => {
  const [user, setUser] = useState(undefined);
  const value = { user, setUser };

  return <Context.Provider value={value}>{props.children}</Context.Provider>;
};

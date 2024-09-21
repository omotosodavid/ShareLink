import { createContext, useContext, useState } from "react";

const CustomContext = createContext();

export const useCustomContext = () => {
  return useContext(CustomContext);
};

export const CustomProvider = ({ children }) => {
  const [img, setImg] = useState("");
  const [alert, setAlert] = useState(null);
  const [action, setAction] = useState(null);

  return (
    <CustomContext.Provider value={{ img, setImg,alert,setAlert,action,setAction }}>
      {children}
    </CustomContext.Provider>
  );
};

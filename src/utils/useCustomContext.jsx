import { createContext, useContext, useState } from "react";

const CustomContext = createContext();

export const useCustomContext = () => {
  return useContext(CustomContext);
};

export const CustomProvider = ({ children }) => {
  const [img, setImg] = useState("");
  const [platforms, setPlatForms] = useState([]);
  const [alert, setAlert] = useState(false);

  return (
    <CustomContext.Provider value={{ img, setImg, platforms, setPlatForms,alert,setAlert }}>
      {children}
    </CustomContext.Provider>
  );
};

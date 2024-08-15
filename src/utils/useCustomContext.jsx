import { createContext, useContext, useState } from "react";

const ImgContext = createContext();

export const useImgContext = () => {
  return useContext(ImgContext);
};

export const ImgProvider = ({ children }) => {
  const [img, setImg] = useState("");

  return (
    <ImgContext.Provider value={{ img, setImg }}>
      {children}
    </ImgContext.Provider>
  );
};

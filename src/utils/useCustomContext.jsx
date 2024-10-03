import { createContext, useContext, useState } from "react";

const CustomContext = createContext();

export const useCustomContext = () => {
  return useContext(CustomContext);
};

export const CustomProvider = ({ children }) => {
  const [alert, setAlert] = useState(null);
  const [loading, setLoading] = useState(false);
  const [userInfoId, setUserInfoId] = useState("");
  const [profileImgId, setProfileImgId] = useState("");

  return (
    <CustomContext.Provider
      value={{
        alert,
        setAlert,
        loading,
        setLoading,
        userInfoId,
        setUserInfoId,
        profileImgId,
        setProfileImgId,
      }}
    >
      {children}
    </CustomContext.Provider>
  );
};

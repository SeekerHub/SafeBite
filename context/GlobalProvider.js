import React, { createContext, useContext, useEffect, useState } from "react";

import { getCurrentUser } from "../lib/appwrite";

const GlobalContext = createContext();
export const useGlobalContext = () => useContext(GlobalContext);

const GlobalProvider = ({ children }) => {
  const [allergyList, setAllergyList] = useState(["Oil"]);
  const [data, setData] = useState([]);
  const [isLogged, setIsLogged] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const ip = "http://192.168.1.3:";

  // useEffect(() => {
  //   getCurrentUser()
  //     .then((res) => {
  //       if (res) {
  //         setIsLogged(true);
  //         setUser(res);
  //       } else {
  //         setIsLogged(false);
  //         setUser(null);
  //       }
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     })
  //     .finally(() => {
  //       setLoading(false);
  //     });
  // }, []);

  return (
    <GlobalContext.Provider
      value={{
        data,
        setData,
        allergyList,
        setAllergyList,
        isLogged,
        setIsLogged,
        user,
        setUser,
        loading,
        ip,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;

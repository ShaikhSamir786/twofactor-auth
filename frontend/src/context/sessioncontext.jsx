import { createContext, useEffect, useContext, useState } from "react";

const SessionContext = createContext();

export const useSession = () => useContext(SessionContext);

export const SessionProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUserData = sessionStorage.getItem("userData");
    console.log("Raw stored data:", storedUserData);
    
    if (storedUserData) {
      try {
        const parsedData = JSON.parse(storedUserData);
        console.log("Parsed User Data:", parsedData);
        setIsLoggedIn(true);
        setUserData(parsedData);
      } catch (error) {
        console.error("Error parsing stored user data:", error);
        sessionStorage.removeItem("userData");
      }
    }
    setLoading(false);
  }, []);

  const login = (userdata) => {
    if (!userdata) {
      console.error("Login called with invalid user data");
      return;
    }
    setIsLoggedIn(true);
    setUserData(userdata);
    sessionStorage.setItem("userData", JSON.stringify(userdata));
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUserData(null);
    sessionStorage.removeItem("userData");
  };

  const value = {
    isLoggedIn,
    loading,
    userData,
    login,
    logout
  };

  return (
    <SessionContext.Provider value={value}>
      {children}
    </SessionContext.Provider>
  );
};

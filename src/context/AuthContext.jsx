import { createContext, useContext, useState, useEffect } from "react";
import { logoutService } from "../services/authServices";


const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {

  const [auth, setAuth] = useState(() => {
    const storedAuth = localStorage.getItem("auth");
    return storedAuth ? JSON.parse(storedAuth) : { isLoggedIn: false, userId: null };
  });

  
  useEffect(() => {
    localStorage.setItem("auth", JSON.stringify(auth));
  }, [auth]);

  const login = (userId) => {
    setAuth({
      isLoggedIn: true,
      userId: userId,
    });
  };

  // const logout = () => {
  //   setAuth({
  //     isLoggedIn: false,
  //     userId: null,
  //   });
  //   localStorage.removeItem("auth"); 
  // };

  const logout = async() => {
     try {
       const response = await logoutService();
       if(response.success){
        setAuth({
              isLoggedIn: false,
              userId: null,
            });
            localStorage.removeItem("auth"); 
       }
     } catch (error) {
      
     }
  };

  const value = {
    auth,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

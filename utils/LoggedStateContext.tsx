"use client";

import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from "react";
import axios from "axios";

interface LoggedStateContextType {
  isLoggedIn: boolean;
  username: string | null;
  userId: string | null;
  setLoggedState: (
    isLoggedIn: boolean,
    username: string | null,
    userId: string | null
  ) => void;
  logout: () => void; // <-- ADD THIS
}

const LoggedStateContext = createContext<LoggedStateContextType>({
  isLoggedIn: false,
  username: null,
  userId: null,
  setLoggedState: () => {},
  logout: () => {}, // <-- ADD DEFAULT
});

interface LoggedStateProviderProps {
  children: ReactNode;
}

export const LoggedStateProvider: React.FC<LoggedStateProviderProps> = ({
  children,
}) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);

  const setLoggedState = (
    loggedIn: boolean,
    uname: string | null,
    uid: string | null
  ) => {
    setIsLoggedIn(loggedIn);
    setUsername(uname);
    setUserId(uid);
  };

  const logout = async () => {
    try {
      await axios.post(
        "http://localhost:5000/auth/logout",
        {},
        { withCredentials: true }
      );
    } catch (err) {
      console.error("Error logging out:", err);
    } finally {
      setLoggedState(false, null, null);
    }
  };

  useEffect(() => {
    axios
      .get("http://localhost:5000/auth/profile", { withCredentials: true })
      .then((res) => {
        const user = res.data;
        setLoggedState(true, user.username, user.userId);
      })
      .catch(() => {
        setLoggedState(false, null, null);
      });
  }, []);

  return (
    <LoggedStateContext.Provider
      value={{
        isLoggedIn,
        username,
        userId,
        setLoggedState,
        logout,
      }}
    >
      {children}
    </LoggedStateContext.Provider>
  );
};

export const useLoggedState = () => useContext(LoggedStateContext);

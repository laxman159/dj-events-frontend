import { createContext, useState, useEffect } from "react";
import { useRouter } from "next/router";
import { NEXT_URL } from "@/config/index";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setuser] = useState(null);
  const [error, seterror] = useState(null);
  const router = useRouter();
  useEffect(() => checkUserIsLoggedIn(), []);
  //   Register User
  const register = async (user) => {
    const res = await fetch(`${NEXT_URL}/api/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    const data = await res.json();

    console.log(data);
    if (res.ok) {
      setuser(data.user);
      router.push("/account/dashboard");
    } else {
      seterror(data.message);
      seterror(null);
    }
  };
  //   Login
  const login = async ({ email: identifier, password }) => {
    const res = await fetch(`${NEXT_URL}/api/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ identifier, password }),
    });

    const data = await res.json();

    console.log(data);
    if (res.ok) {
      setuser(data.user);
      router.push("/account/dashboard");
    } else {
      seterror(data.message);
      seterror(null);
    }
  };
  //   Logout
  const logout = async () => {
    const res = await fetch(`${NEXT_URL}/api/logout`, {
      method: "POST",
    });
    if (res.ok) {
      setuser(null);
      router.push("/");
    }
  };
  //   Check if user is logged in
  const checkUserIsLoggedIn = async (user) => {
    const res = await fetch(`${NEXT_URL}/api/user`);
    const data = await res.json();
    if (res.ok) {
      setuser(data.user);
    } else {
      setuser(null);
    }
  };

  return (
    <AuthContext.Provider value={{ user, error, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;

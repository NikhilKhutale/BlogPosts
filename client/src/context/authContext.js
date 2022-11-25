import React from "react";
import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { axiosInstance } from "../config";

export const AuthContext = createContext();

export const AuthContexProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  const login = async (values) => {
    const res = await axiosInstance.post(`api/auth/login`, values);
    setCurrentUser(res.data);
  };

  const register = async (values) => {
    const res = await axiosInstance.post(`api/auth/register`, values);
    setCurrentUser(res.data);
  };

  const logout = async (values) => {
    await axiosInstance.post(`api/auth/logout`);
    setCurrentUser(null);
  };

  const isSubscribed = async (values) => {
    const res = await axiosInstance.post(`api/auth/subscribe`, values);
    setCurrentUser(res.data);
  };

  const subscribedCategory = async (values) => {
    const res = await axiosInstance.post(`api/auth/subscribedCategory`, values);
    setCurrentUser(res.data);
  };

  const updateProfile = async (values) => {
    const res = await axiosInstance.put(`api/users/updateProfile`, values);
    setCurrentUser(res.data);
  };

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]);

  return (
    <AuthContext.Provider value={{ currentUser, login, logout, register, isSubscribed, subscribedCategory, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
};
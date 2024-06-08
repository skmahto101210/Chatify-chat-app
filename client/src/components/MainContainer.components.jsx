import React, { createContext, useEffect, useState } from "react";
import SideBar from "./SideBar.component";

import { Outlet, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";


export default function MainContainer() {
  const lightTheme = useSelector((state) => state.themeKey);
  const navigate = useNavigate();

  useEffect(() => {
    if (JSON.parse(localStorage.getItem("userData"))) {
      navigate("/app/welcome");
    } else {
      navigate("/");
    }
  }, []);

  return (
    <div
      className={` ${
        lightTheme ? "bg-[rgb(244,245,248)]" : "bg-[#162130]"
      } shadow-xl py-2  h-[90vh] w-[90vw] flex flex-row rounded-2xl md:w-[94%] sm:py-1`}>
        <SideBar/>
        <Outlet 
         />
    </div>
  );
}

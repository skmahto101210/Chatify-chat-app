import React, { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { useSelector } from "react-redux";
import { AnimatePresence, motion } from "framer-motion";

import logo from "../assets/friends.svg";

export default function OnlineGroups() {
  const lightTheme = useSelector((state) => state.themeKey);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0.99 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0 }}
        transition={{
          ease: "anticipate",
          duration: "0.8",
        }}
        className="flex flex-col w-[68%] h-[97.6%] m-auto gap-2 sm:w-[79%]">
        <div
          className={` rounded-xl h-[3.6rem]  flex items-center gap-2 px-1  transition-colors ease-in-out duration-[1000ms] ${
            lightTheme ? "border bg-white" : "bg-[#2D3941]"
          }`}>
          <div
            className={` p-3  transition-colors ease-in-out duration-[1000ms] ${
              lightTheme ? " text-slate-500 " : "text-slate-200 "
            }`}>
            <img
              src={logo}
              alt="logo"
              className={`w-7  h-7  transition-colors ease-in-out duration-[1000ms]  ${
                lightTheme ? "" : "invert"
              }`}
            />
          </div>
          <p
            className={`*:flex-1 font-semibold  transition-colors ease-in-out duration-[1000ms] ${
              lightTheme ? " text-slate-500 " : "text-slate-200 "
            }`}>
            Available Groups
          </p>
        </div>

        <div
          className={`mt-[0.1rem] h-[3.5rem]  rounded-xl flex items-center  transition-colors ease-in-out duration-[1000ms] ${
            lightTheme ? "border bg-white " : "bg-[#2D3941] "
          }`}>
          <div className="m-2 flex items-center text-zinc-500">
            <SearchIcon
              className={`transition-colors ease-in-out duration-[1000ms] ${
                lightTheme ? "" : "text-gray-100"
              }`}
            />
          </div>
          <div className="flex-1 my-2">
            <input
              className={`w-[93%] outline-none  transition-colors ease-in-out duration-[1000ms] ${
                lightTheme ? " bg-white" : "bg-[#2D3941] text-slate-200"
              }`}
              type="Search"
              placeholder="search"
            />
          </div>
        </div>

        <div
          className={` overflow-scroll  rounded-xl flex-1 p-2 transition-colors ease-in-out duration-[1000ms] ${
            lightTheme ? "bg-white" : " bg-[#2D3941] text-slate-200"
          }`}>
          <motion.div
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            className={`cursor-pointer rounded-lg h-[4rem]  my-2 w-[99%] border mx-auto flex items-center  shadow-md  opacity-100 hover:opacity-90 transition-colors ease-in-out duration-[1000ms] ${
              lightTheme ? " shadow-md" : " shadow-slate-500 border-slate-500"
            }`}>
            <div className="avatar bg-slate-400 m-2 w-11 h-11 rounded-full flex justify-center items-center font-bold text-white">
              g
            </div>
            <div className="userid flex-1 mr-2">
              <div className="font-semibold text-lg sm:text-md md:text-lg lg:text-xl xl:text-xl">
                sfg
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

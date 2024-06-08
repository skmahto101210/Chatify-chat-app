import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SearchIcon from "@mui/icons-material/Search";

import { IconButton } from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";
import { AnimatePresence, motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { accessChat, fetchUsers } from "../routes/API.routes";
import axios from "axios";
import { refreshFun } from "../store/refreshSideBar";
import logo from "../assets/friends.svg"

export default function OnlineUsers() {
  const refresh = useSelector((state) => state.refreshKey);

  const lightTheme = useSelector((state) => state.themeKey);

  const [users, setUsers] = useState([]);
  const userData = JSON.parse(localStorage.getItem("userData"));
  const nav = useNavigate();
  const dispatch = useDispatch();

  if (!userData) {
    console.log("user are not Authenticate");
    nav(-1);
  }

  useEffect(() => {
    console.log("user Refreshed");
    const config = {
      headers: {
        Authorization: `Bearer ${userData?.data?.user?.token}`,
      },
    };
    axios.get(fetchUsers, config).then((data) => {
      // console.log("user data from API", data);
      setUsers(data.data);
    });
  }, [refresh, dispatch]);
  // console.log(users);

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
        className="flex flex-col w-[68%] h-[97.6%] m-auto gap-2 sm:w-[79%] sm:mr-2 mr-3">
        <div
          className={` rounded-xl h-[3.6rem]  flex items-center gap-2 px-1  transition-colors ease-in-out duration-[1000ms] ${
            lightTheme ? "border bg-white" : "bg-[#2D3941]"
          }`}>
          <div
            className={` p-3  transition-colors ease-in-out duration-[1000ms] ${
              lightTheme ? "text-slate-500 " : "text-slate-200 "
            }`}>
            <img src={logo} alt="logo" className={`w-7  h-7  transition-colors ease-in-out duration-[1000ms]  ${lightTheme ? "" :"invert"}`} />
          </div>
          <p
            className={`flex-1 font-semibold  transition-colors ease-in-out duration-[1000ms] ${
              lightTheme ? "text-slate-500 " : "text-slate-200 "
            }`}>
            Available Users
          </p>
          <IconButton
            
            onClick={() => dispatch(refreshFun())}>
            <RefreshIcon className={ ( lightTheme ? "text-slate-500 " : "text-slate-200 ") + "transition-colors ease-in-out duration-[1000ms]"}/>
          </IconButton>
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
            lightTheme ? "bg-white" : " bg-[#2D3941] text-slate-200 "
          }`}>
          {users.map((user, index) => {
            return (
              <motion.div
                key={index}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  const config = {
                    headers: {
                      Authorization: `Bearer ${userData.data.user.token}`,
                    },
                  };
                  axios.post(
                    accessChat,
                    {
                      userId: user._id,
                    },
                    config
                  );
                  dispatch(refreshFun());
                }}
                className={`cursor-pointer border  opacity-100 hover:opacity-90  rounded-lg h-[4rem]  my-2 w-[99%] mx-auto  flex items-center  shadow-md transition-colors ease-in-out duration-[1000ms] ${
                  lightTheme
                    ? " shadow-md"
                    : " shadow-slate-500 border-slate-500"
                }`}>
                <div className="avatar bg-slate-400 m-2 w-11 h-11 rounded-full flex justify-center items-center font-bold text-white">
                  {user.username[0] || "NA"}
                </div>
                <div className="userid flex-1 mr-2">
                  <div className="font-semibold text-lg sm:text-md md:text-lg lg:text-xl xl:text-xl">
                    {user.username || "Not fetched"}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

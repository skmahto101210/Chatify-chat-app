import React, { useContext, useEffect, useState } from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import SearchIcon from "@mui/icons-material/Search";
import { IconButton } from "@mui/material";
import ChatsItem from "./ChatsItem.component";
import { useNavigate } from "react-router-dom";
import LightModeIcon from "@mui/icons-material/LightMode";
import NightsStayIcon from "@mui/icons-material/NightsStay";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../store/themeSlice";
import { AnimatePresence, motion } from "framer-motion";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import axios from "axios";
import { fetchChats } from "../routes/API.routes";
import { setConversations } from "../store/allConversation";
import { refreshFun } from "../store/refreshSideBar";

export default function SideBar() {
  const navigate = useNavigate();
  const lightTheme = useSelector((state) => state.themeKey);

  const refresh = useSelector((state) => state.refreshKey);
  let conversation = useSelector((state) => state.allConversationKey);
  // console.log(conversation);
  const userData = JSON.parse(localStorage.getItem("userData"));
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("sdnj");
    const controller = new AbortController();
    const config = {
      headers: {
        Authorization: `Bearer ${userData?.data?.user?.token}`,
      },
      signal: controller.signal,
    };
    axios
      .get(fetchChats, config)
      .then((data) => {
        dispatch(setConversations([...data?.data]));
      })
      .catch((error) => {
        if (axios.isCancel(error)) {
          console.log("Request canceled", error.message);
        } else {
          console.error("Error fetching chats", error);
        }
      });

    return () => {
      controller.abort();
    };
  }, [refresh, dispatch]);

  return (
    <div className="basis-[33%] flex flex-col items-center py-1 sm:basis-10">
      <div
        className={`relative  rounded-xl w-[95%] m-1 p-2 flex transition-colors ease-in-out duration-[1000ms]  ${
          lightTheme ? "border  bg-white" : " bg-[#2D3941]"
        } sm:flex-col sm:h-full sm:ml-2 sm:justify-center sm:w-[3rem]  sm:items-center`}>
        <div className="flex-1">
          <IconButton>
            <AccountCircleIcon
              className={`transition-colors ease-in-out duration-[1000ms]  ${
                lightTheme ? "" : "text-gray-100"
              }`}
            />
          </IconButton>
        </div>
        <div className="text-end flex sm:flex-col">
          <IconButton onClick={() => navigate("/app/users")}>
            <PersonAddIcon
              className={`transition-colors ease-in-out duration-[1000ms]  ${
                lightTheme ? "" : "text-gray-100"
              }`}
            />
          </IconButton>
          <IconButton onClick={() => navigate("/app/groups")}>
            <GroupAddIcon
              className={`transition-colors ease-in-out duration-[1000ms]  ${
                lightTheme ? "" : "text-gray-100"
              }`}
            />
          </IconButton>
          <IconButton onClick={() => navigate("/app/create-group")}>
            <AddCircleIcon
              className={`transition-colors ease-in-out duration-[1000ms]  ${
                lightTheme ? "" : "text-gray-100"
              }`}
            />
          </IconButton>

          <IconButton onClick={() => dispatch(toggleTheme())}>
            <AnimatePresence mode="wait">
              <motion.div
                key={lightTheme ? "Dark" : "Light"}
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -10, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="flex">
                {lightTheme ? (
                  <NightsStayIcon />
                ) : (
                  <LightModeIcon className="transition-colors ease-in-out duration-[1000ms]  text-gray-100" />
                )}
              </motion.div>
            </AnimatePresence>
          </IconButton>
          <IconButton
            onClick={() => {
              localStorage.removeItem("userData");
              navigate("/");
            }}>
            <ExitToAppIcon
              className={`transition-colors ease-in-out duration-[1000ms]  ${
                lightTheme ? "" : "text-gray-100"
              }`}
            />
          </IconButton>
        </div>
      </div>

      <div
        className={`w-[95%] m-1   rounded-xl flex items-center transition-colors ease-in-out duration-[1000ms] ${
          lightTheme ? "border bg-white" : "bg-[#2D3941] "
        }  sm:hidden
        `}>
        <div className="m-2 flex items-center  w-5 text-zinc-500">
          <SearchIcon
            className={`transition-colors   ease-in-out duration-[1000ms] ${
              lightTheme ? "" : "text-gray-100"
            }
          `}
          />
        </div>

        <div className={`flex-1 my-2  `}>
          <input
            className={`w-[93%] outline-none transition-colors ease-in-out duration-[1000ms] ${
              lightTheme ? " bg-white" : "bg-[#2D3941] text-slate-200"
            }
            `}
            type="Search"
            placeholder="search"
          />
        </div>
      </div>

      <div
        className={`w-[95%] m-1 px-2 py-4  rounded-xl overflow-scroll flex-1  transition-colors ease-in-out duration-[1000ms] ${
          lightTheme ? "border bg-white" : "bg-[#2D3941] text-slate-200"
        }  sm:hidden
        `}>
        {conversation.map((obj, index) => {
          if (obj.users.length === 1) {
            return <></>;
          }
          if (obj.latestMessage === null) {
            obj = { ...obj, latestMessage: "" };
          }
          // console.log(obj);
          let chatName = obj?.isGroupChat
            ? obj?.chatName
            : obj?.users
                .filter((obj) => obj._id !== userData?.data?.user?._id)
                .map((user) => user.username)[0];
          return (
            <motion.div
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              key={obj._id}
              className={`cursor-pointer border shadow-md transition-colors ease-in-out duration-[1000ms] ${
                lightTheme ? " " : " shadow-slate-500 border-slate-500 "
              } rounded-lg my-2 opacity-100 hover:opacity-90`}
              onClick={() => {
                dispatch(refreshFun())
                navigate(`/app/chat/${obj._id}&${obj.users[1].username}`, {
                  state: obj,
                });
              }}>
              <ChatsItem
                logo={chatName[0]}
                chatName={chatName}
                latestMessage={obj.latestMessage?.content}
                updatedAt={obj.updatedAt}
              />
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

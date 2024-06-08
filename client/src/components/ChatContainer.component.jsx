import React, { useEffect, useRef, useState } from "react";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import SendIcon from "@mui/icons-material/Send";
import { IconButton, Skeleton } from "@mui/material";
import MessageOthers from "./MessageOthers.component";
import MessagesSelf from "./MessagesSelf.component";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AnimatePresence, motion } from "framer-motion";
import axios, { all } from "axios";
import { sendMessages, allMessages, ENDPOINT } from "../routes/API.routes.js";
import { refreshFun } from "../store/refreshSideBar.js";
import { io } from "socket.io-client";

let socket;

export default function ChatContainer() {
  const location = useLocation();
  const chat = location.state;
  const lightTheme = useSelector((state) => state.themeKey);
  // const refresh = useSelector((state) => state.refreshKey);
  const [refresh, setRefresh] = useState(1);

  let userData = JSON.parse(localStorage.getItem("userData"));
  let userId = userData.data.user._id;
  // console.log(chat);
  let chatName = chat?.isGroupChat
    ? chat?.chatName
    : chat?.users
        .filter((obj) => obj._id !== userId)
        .map((user) => user.username)[0];

  const [loaded, setLoaded] = useState(false);
  const [messages, setMessages] = useState([]);
  const [messagesCopy, setMessagesCopy] = useState([]);
  const [messageContent, setMessageContent] = useState("");
  const messageEndRef = useRef();
  const [newMessage, setNewMessage] = useState(true);
  // const [joined, setJoined] = useState(false);
  // const [socketConnectionStatus, setSocketConnectionStatus] = useState(false);
  const dispatch = useDispatch();

  const sendMessage = () => {
    const config = {
      headers: {
        Authorization: `Bearer ${userData?.data?.user?.token}`,
      },
    };

    axios
      .post(
        sendMessages,
        {
          content: messageContent,
          chatId: chat._id,
        },
        config
      )
      .then(({ data }) => {
        console.log("Message Fired", data);
        // newMessage = data;
        socket.emit("new message", data);
      });
  };

  useEffect(() => {
    if (!socket) {
      socket = io(ENDPOINT);
    }

    socket.emit("setup", userData);
    socket.on("connected", () => {
      // setSocketConnectionStatus(true);
    });

    socket.on("message received", (newMessage) => {
      // console.log(newMessage);
      setMessages((prevMessages) => [...prevMessages, newMessage]);
      setRefresh((prev) => prev + 1);
    });

    return () => {
      socket.disconnect();
      socket = null;
    };
  }, []);

  useEffect(() => {
    console.log("sabjbnmanm");
    const controller = new AbortController();
    const config = {
      headers: {
        Authorization: `Bearer ${userData?.data?.user?.token}`,
      },
      signal: controller.signal,
    };

    axios
      .get(allMessages + "/" + chat?._id, config)
      .then(({ data }) => {
        console.log(data);
        if (data.length === 0) setNewMessage(true);
        else setNewMessage(false);
        setMessages([...data]);
        setLoaded(true);
        // if (!joined) {
          socket.emit("join chat", chat?._id);
          setJoined(true);
        // }
      })
      .catch((error) => {
        // console.log(error.response.status)
        if (error?.response?.status == 404) setNewMessage(true);
        else setNewMessage(false);
        setLoaded(true);
      });
    setMessagesCopy(messages);
    return () => {
      controller.abort();
    };
  }, [refresh, setRefresh,chat._id, userData.data.user.token]);

  if (!loaded) {
    return (
      <div
        style={{
          border: "20px",
          padding: "10px",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          gap: "10px",
        }}>
        <Skeleton
          variant="rectangular"
          sx={{ width: "100%", borderRadius: "10px" }}
          height={60}
        />
        <Skeleton
          variant="rectangular"
          sx={{
            width: "100%",
            borderRadius: "10px",
            flexGrow: "1",
          }}
        />
        <Skeleton
          variant="rectangular"
          sx={{ width: "100%", borderRadius: "10px" }}
          height={60}
        />
      </div>
    );
  } else {
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
          className="w-[70%] flex flex-col items-center sm:w-[83%] sm:pr-2">
          <div
            className={` m-2 w-[97%] p-2 rounded-xl flex items-center justify-around h-16  transition-colors ease-in-out duration-[1000ms] ${
              lightTheme ? "border bg-white" : " bg-[#2D3941] text-slate-200"
            }`}>
            <div className="flex-1 flex items-center ">
              <div className="avatar bg-slate-400 m-2 w-11 h-11 rounded-full flex justify-center items-center font-bold text-white  sm:text-sm sm:w-8 sm:h-8 sm:m-1">
                {chat?.avatar || chatName?.[0]}
              </div>
              <div className="userid flex-1 mr-2 sm:mx-1">
                <div className="font-semibold text-lg sm:text-md md:text-lg lg:text-xl xl:text-xl">
                  {chatName}
                </div>
                <div className="text-xs sm:text-sm  xl:text-md flex justify-between">
                  <div>{chat?.latestMessage?.content}</div>
                  <div>
                    {chat?.updatedAt?.substr(0, 10) +
                      " " +
                      chat?.updatedAt?.substr(11, 8)}
                  </div>
                </div>
              </div>
            </div>
            <div className={`mx-1 `}>
              <IconButton
                onClick={() => {
                  // Handle delete chat logic here
                }}>
                <DeleteOutlineIcon
                  fontSize="large"
                  className={` transition-colors ease-in-out duration-[1000ms] ${
                    lightTheme ? "" : " text-slate-200"
                  }`}
                />
              </IconButton>
            </div>
          </div>

          <div
            className={`flex-1 w-[97%] overflow-y-auto rounded-xl p-4 m-1 transition-colors ease-in-out duration-[1000ms] shadow-inner ${
              lightTheme ? "border bg-[#e4e6e4]" : " bg-[#495b68] "
            } flex flex-col-reverse`}>
            {newMessage ? (
              <div className="h-full flex justify-center items-center">
                Send a message to start the conversation
              </div>
            ) : (
              messages
                .slice(0)
                .reverse()
                .map((message, index) => {
                  const sender = message.sender;
                  const self_id = userData.data.user._id;
                  if (sender._id === self_id) {
                    return (
                      <MessagesSelf
                        content={message.content}
                        updatedAt={message.updatedAt}
                        key={index}
                      />
                    );
                  } else {
                    return (
                      <MessageOthers
                        logo={message.sender.username[0]}
                        name={message.sender.username}
                        content={message.content}
                        updatedAt={message.updatedAt}
                        key={index}
                      />
                    );
                  }
                })
            )}
          </div>

          <div ref={messageEndRef} className="BOTTOM" />

          <div
            className={`w-[97%] m-2 px-2 py-3 transition-colors ease-in-out duration-[1000ms] ${
              lightTheme ? "border bg-white" : " bg-[#2D3941]"
            }  rounded-xl flex items-center sm:h-12`}>
            <input
              className="flex-1 p-2 rounded-xl border-2 border-gray-300"
              placeholder="Type a message"
              value={messageContent}
              onChange={(e) => setMessageContent(e.target.value)}
              onKeyDown={(e) => {
                // e.preventDefault();
                if (e.code == "Enter") {
                  sendMessage();
                  setMessageContent("");
                  dispatch(refreshFun());
                  setRefresh((prev) => prev + 1);
                  // setRefresh((prev) => prev+1);
                }
              }}
            />
            <IconButton
              onClick={(e) => {
  
                // e.preventDefault();
                sendMessage();
                setMessageContent("");
                dispatch(refreshFun());
                setRefresh((prev) => prev + 1);
                // setRefresh((prev) => prev+1);
              }}>
              <SendIcon />
            </IconButton>
          </div>
        </motion.div>
      </AnimatePresence>
    );
  }
}

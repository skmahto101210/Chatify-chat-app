import React, { useEffect } from "react";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import { IconButton } from "@mui/material";
import { useSelector } from "react-redux";
import { AnimatePresence,motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function CreateGroup() {
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
        className="m-auto border-green-400 border-b-4 rounded-b-xl w-[68%] h-[98%] flex justify-center items-center sm:w-[79%]">
        <div
          className={`w-[95%] p-3 px-5 rounded-xl outline-none flex justify-around transition-colors ease-in-out duration-[1000ms] ${
            lightTheme ? "bg-white" : "bg-[#2D3941] text-slate-200"
          }`}>
          <input
            type="text"
            placeholder="Group Name"
            className={`w-[95%] outline-none flex-1 transition-colors ease-in-out duration-[1000ms] ${
              lightTheme ? "bg-white" : "bg-[#2D3941] text-slate-200"
            }`}
          />
          <IconButton>
            <DoneAllIcon
              className={`transition-colors ease-in-out duration-[1000ms] ${
                lightTheme ? "" : "text-slate-200"
              }`}
            />
          </IconButton>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

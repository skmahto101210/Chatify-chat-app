import React, { useEffect } from "react";
import Lottie from "lottie-react";
import Robot from "../assets/robot.json";
import { useSelector } from "react-redux";

export default function Welcome() {
  const lightTheme = useSelector((state) => state.themeKey);
  const userData = JSON.parse(localStorage.getItem("userData"));

  return (
    <div
      className={`w-[65%] h-[98%] border-green-400 border-b-4 rounded-xl  flex flex-col   items-center justify-center m-auto sm:w-[79%]  transition-colors ease-in-out duration-[1000ms] ${
        lightTheme ? " bg-slate-100" : "bg-[#2d3941] text-slate-200"
      }`}>
      <Lottie
        className="robot"
        animationData={Robot}
        loop
        autoplay
        style={{ width: 270, height: 270 }}
      />
      <h1 className="text-3xl text-center">
        Welcome,{" "}
        <span className=" text-[#28d63f] text-5xl">
          {userData ? userData.data.user.username : ""}
        </span>
      </h1>
      <h3 className=" text-center mt-4">
        Please select a chat to start Messaging.
      </h3>
    </div>
  );
}

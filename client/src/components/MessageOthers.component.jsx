import React from "react";

export default function MessageOthers({ logo,name,content,updatedAt }) {
  // const currentDate = new Date();
  // console.log(currentDate)
  return (
    <div className=" flex my-3 items-center ">
      <div className=" bg-zinc-200 max-w-[50%] shadow-md  rounded-xl px-3 p-1">
        <div className=" flex font-semibold text-sm">
          {" "}
          <div className=" bg-slate-400 mr-2 w-5 h-5 rounded-full flex justify-center items-center font-bold text-white">
            {logo}
          </div>
          <p>{name}</p>
        </div>
        <div className="flex justify-between text-lg mt-2">
          {content}
        </div>
        <div className="flex justify-end text-xs">{updatedAt}</div>
      </div>
    </div>
  );
}

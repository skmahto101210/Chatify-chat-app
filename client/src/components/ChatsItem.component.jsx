import React from "react";

export default function ChatsItem({
  logo,
  chatName,
  latestMessage,
  updatedAt,
}) {
  // console.log(chat)
  return (
    <div className="flex items-center ">
      <div className="avatar bg-slate-400 m-2 w-11 h-11 rounded-full flex justify-center items-center font-bold text-white">
        {logo}
      </div>
      <div className="userid flex-1 mr-2">
        <div className="font-semibold text-lg sm:text-md md:text-lg lg:text-xl xl:text-xl">
          {chatName}
        </div>
        <div className="text-xs  flex justify-between">
          <div>{latestMessage || "No last message"}</div>
          <div>
            {updatedAt.substr(0, 10) +
              " " +
              updatedAt.substr(11, 8)}
          </div>
        </div>
      </div>
    </div>
  );
}

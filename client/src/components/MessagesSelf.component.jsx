import React from "react";

export default function MessagesSelf({content,updatedAt }) {
  // const currentDate = new Date();
  // console.log(currentDate)
  return (
    <div className="my-4 flex justify-end">
      <div className=" bg-[#7df2cbd0] shadow-md max-w-[50%] sm:max-w-[80%] md:max-w-[70%] text-lg rounded-xl px-2 py-1 ">
        <div className="mx-1 my-2">{content}</div>
        <div className="flex justify-end text-xs">{updatedAt}</div>
      </div>
    </div>
  );
}

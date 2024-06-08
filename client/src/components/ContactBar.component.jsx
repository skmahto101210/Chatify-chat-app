import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function ContactBar() {

  return (
    <>
      {" "}
      <div
        className={`w-[95%] m-1 rounded-xl flex items-center transition-colors ease-in-out duration-[1000ms] ${
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
        {conversation.map((obj) => (
          <motion.div
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            key={obj._id}
            className={`cursor-pointer border shadow-md transition-colors ease-in-out duration-[1000ms] ${
              lightTheme ? " " : " shadow-slate-500 border-slate-500 "
            } rounded-lg my-2 opacity-100 hover:opacity-90`}
            onClick={() => navigate("/app/chat", { state: { obj } })}>
            <ChatsItem chat={obj} />
          </motion.div>
        ))}
      </div>
    </>
  );
}

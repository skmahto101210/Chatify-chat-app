import Login from "./components/Login.component";
import MainContainer from "./components/MainContainer.components";
import { Route, Routes } from "react-router-dom";
import Welcome from "./components/Welcome.component";
import ChatContainer from "./components/ChatContainer.component";
import OnlineUsers from "./components/OnlineUsers.component";
import CreateGroup from "./components/CreateGroup.component";
import OnlineGroups from "./components/OnlineGroups.component";
import SignUp from "./components/SignUp.component";
import { useSelector } from "react-redux";

function App() {
  const lightTheme = useSelector((state) => state.themeKey);
  return (
    <div
      className={`transition-colors ease-in-out duration-[1000ms]  ${
        lightTheme ? "bg-[#dddedd]" : "bg-[#0c2340ef]"
      }  w-full h-screen  flex justify-center items-center text-lg sm:text-md md:text-lg lg:text-xl xl:text-2xl`}>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/app" element={<MainContainer />}>
          <Route path="welcome" element={<Welcome />}></Route>
          <Route path="chat/:id" element={<ChatContainer />}></Route>
          <Route path="users" element={<OnlineUsers />}></Route>
          <Route path="groups" element={<OnlineGroups />}></Route>
          <Route path="create-group" element={<CreateGroup />}></Route>
        </Route>
      </Routes>  
    </div>
  );
}

export default App;

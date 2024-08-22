import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import {
  Backdrop,
  CircularProgress,
  IconButton,
  Slide,
  Snackbar,
} from "@mui/material";
import axios from "axios";
import Fade from "@mui/material/Fade";
import { loginRoute } from "../routes/API.routes";
import Lottie from "lottie-react";
import chatAnimation from "../assets/chatAnimation3.json";

function SlideTransition(props) {
  return <Slide {...props} direction="up" />;
}

export default function Login() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [data, setData] = useState({ username: "", password: "" });
  const [loader, setLoader] = useState(false);
  const [loginStatus, setLoginStatus] = useState("");
  const navigate = useNavigate();

  const [state, setState] = useState({
    open: false,
    Transition: Fade,
  });

  const handleClick = (Transition) => () => {
    setState({
      open: true,
      Transition,
    });
  };

  const handleClose = () => {
    setState({
      ...state,
      open: false,
    });
  };

  const handleChange = (event) => {
    setData({ ...data, [event?.target?.name]: event?.target?.value });
  };

  useEffect(() => {
    if (JSON.parse(localStorage.getItem("userData"))) {
      navigate("/app/welcome");
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { username, password } = data;

    setLoader(true);
    try {
      const res = await axios.post(
        loginRoute,
        { username, password },
        {
          headers: {
            "Content-type": "application/json",
          },
        }
      );
      // console.log(res.data);
      setLoginStatus({ msg: res.data.message, key: Math.random() });
      navigate("/app/welcome");
      localStorage.setItem("userData", JSON.stringify(res));
      setLoader(false);
    } catch (err) {
      setLoginStatus({
        msg: err.response.data.message,
        key: Math.random(),
      });

      setLoader(false);
    }
  };

  return (
    <>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loader}>
        <CircularProgress color="inherit" />
      </Backdrop>

      <div className=" bg-[rgb(244,245,248)]  shadow-xl h-[90vh] w-[90vw] flex flex-row justify-around rounded-2xl p-4 px-6 sm:flex-col">
        <div className="w-[30%] flex justify-center items-center sm:flex-1 sm:w-full">
          <Lottie animationData={chatAnimation}/>
        </div>

        <div className=" bg-white flex-1 flex flex-col justify-center items-center rounded-2xl gap-3 sm:gap-1">
          <div className="mb-7 text-3xl font-semibold text-green-500 sm:text-center sm:text-2xl sm:mb-2 sm:text-[1.4rem]">
            Login to Your Account
          </div>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col justify-between items-center gap-5 sm:mb-0 sm:scale-[99%]">
            <div className="input-field ">
              <input
                type="text"
                id="name"
                name="username"
                required
                className="px-3 py-2 rounded-b-md input"
                autoComplete="username"
                onChange={handleChange}
              />
              <label for="name" className="px-3 py-2 label">
                Username
              </label>
            </div>

            <div className="input-field">
              <input
                type={`${!passwordVisible ? "password" : "text"}`}
                id="password"
                required
                name="password"
                autoComplete="current-password"
                onChange={handleChange}
                className="px-3 py-2 rounded-b-md input"
              />
              <label for="password" className="px-3 py-2 label">
                Password
              </label>

              <div
                onClick={() => setPasswordVisible(!passwordVisible)}
                className="absolute top-1 right-1">
                <IconButton>
                  {!passwordVisible ? (
                    <VisibilityIcon />
                  ) : (
                    <VisibilityOffIcon />
                  )}
                </IconButton>
              </div>
            </div>

            <button
              type="submit"
              onClick={handleClick(SlideTransition)}
              className="mt-3 p-2 text-slate-500 hover:text-slate-800">
              LOG IN
            </button>
          </form>
          <p
            className="text-green-500 font-semibold sm:text-sm"
            onClick={() => navigate("/sign-up")}>
            Don't have an Account?{" "}
            <span className="underline text-purple-600  cursor-pointer">
              Sign Up
            </span>
          </p>
        </div>
      </div>
      <Snackbar
        open={state.open}
        onClose={handleClose}
        TransitionComponent={state.Transition}
        message={loginStatus.msg || "something went wrong!! please try again"}
        key={state.Transition.name}
        autoHideDuration={1200}
        anchorOrigin={{ vertical: "bottom", horizontal: `right` }}
      />
    </>
  );
}

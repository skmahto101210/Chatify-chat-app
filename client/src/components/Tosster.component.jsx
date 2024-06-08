import * as React from "react";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import Fade from "@mui/material/Fade";
import Slide from "@mui/material/Slide";

function SlideTransition(props) {
  return <Slide {...props} direction="up" />;
}

export default function TransitionsSnackbar({ message }) {
  const [state, setState] = React.useState({
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

  return (
    <div>
      <Snackbar
        open={state.open}
        onClose={handleClose}
        TransitionComponent={state.Transition}
        message={signInStatus.msg || "something went wrong!! please try again"}
        key={state.Transition.name}
        autoHideDuration={1200}
        anchorOrigin={{ vertical: "bottom", horizontal: `right` }}
      />
    </div>
  );
}

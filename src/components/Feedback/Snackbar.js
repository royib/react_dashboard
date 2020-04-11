import React from "react";
import "./Snackbar.css";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

export default props => {
  const [open, setOpen] = React.useState(false);
  React.useEffect(() => {
    if (props.isOpen) {
      setOpen(true);
    } else {
      handleClose();
    }
  }, [props.isOpen]);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  return (
    <div className="Snackbar">
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <MuiAlert onClose={handleClose} severity="error">
          An Error Occured!
        </MuiAlert>
      </Snackbar>
    </div>
  );
};

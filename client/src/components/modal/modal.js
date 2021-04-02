import React from "react";
import { makeStyles, Modal, Typography, Divider } from "@material-ui/core";
const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    padding: theme.spacing(1),
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    width: (props) => props.modalWidth,
    height: (props) => props.modalHeight,
    backgroundColor: theme.palette.background.paper,
    borderRadius: "10px",
    bosmhadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    overflowX: "hidden",
    outline:"none",
    userSelect:"None",
  },
}));
function CustomModal({
  showModal,
  setShowModal,
  modalTitle,
  ModalType,
  modalWidth,
  modalHeight,
}) {
  const classes = useStyles({ modalWidth, modalHeight });
  const rootRef = React.useRef(null);
  return (
    <Modal
      disablePortal
      disableEnforceFocus
      disableAutoFocus
      open={showModal}
      aria-labelledby="server-modal-title"
      aria-describedby="server-modal-description"
      className={classes.modal}
      container={() => rootRef.current}
    >
      <div className={classes.paper}>
        <Typography variant="h5" gutterBottom>
          {modalTitle}
        </Typography>
        <Divider />
        {<ModalType />}
      </div>
    </Modal>
  );
}

export default CustomModal;

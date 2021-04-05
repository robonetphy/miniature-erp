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
    outline: "none",
    userSelect: "None",
  },
}));
function CustomModal({
  showModal,
  closeModal,
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
      disableAutoFocus
      open={showModal}
      aria-labelledby="modal-label"
      className={classes.modal}
      onEscapeKeyDown={() => {
        closeModal();
      }}
      container={() => rootRef.current}
    >
      <div className={classes.paper}>
        <Typography variant="h5" gutterBottom>
          {modalTitle}
        </Typography>
        <Divider />
        {/* <ModalExample /> */}
        {<ModalType />}
      </div>
    </Modal>
  );
}
// function ModalExample() {
//   const [show, setShow] = useState(false);
//   return (
//     <div className="modal-example">
//       <button
//         type="button"
//         className="btn btn-primary mb-4"
//         onClick={() => {
//           setShow(true);
//         }}
//       >
//         Open Modal
//       </button>
//       <p>Click to get the full Modal experience!</p>

//       <Modal
//         open={show}
//         onEscapeKeyDown={() => setShow(false)}
//         aria-labelledby="modal-label"
//       >
//         <div>
//           <h4 id="modal-label">Text in a modal</h4>
//           <p>
//             Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
//           </p>
//           <ModalExample />
//         </div>
//       </Modal>
//     </div>
//   );
// }1
export default CustomModal;

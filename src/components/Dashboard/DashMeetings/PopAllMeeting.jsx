import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import Slide from "@mui/material/Slide";
import ShowMeeting from "./ShowMeeting";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function PopAllMeeting({ data ,join}) {
  const [open, setOpen] = React.useState(false);
  const dataUser = JSON.parse(localStorage.getItem("dataAuth"));

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // data.sort();

  // console.log(data);

  return (
    <React.Fragment>
      <Button
        className="text-black border text-capitalize fw-bold d-block m-auto more-btn"
        onClick={handleClickOpen}
      >
        More<i className="fa-solid fa-arrow-right"></i>
      </Button>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        onClose={handleClose}
      >
        <DialogContent className="p-0" style={{width:'clamp(350px,50vw,500px)'}}>
          <DialogContentText className="" id="alert-dialog-slide-description">
            <div className="upcoming-meeting py-4 px-3 bg-body rounded-3 shadow-light">
              <h4 className="fw-bold text-center mb-5">Upcoming Meetings</h4>
              {data?.map((trainging, ind) => {
                return new Date(trainging.trainingDate) - new Date() >= -14400000 ? (
                
                  <ShowMeeting key={ind} dataUser={dataUser} trainging={trainging} joinMeeting={join} />
                ) : (
                  ""
                );
              })}
            </div>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleClose}
            className="text-black text-capitalize fw-bold"
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

{
  /* <div
                    className="time-meeting d-flex gap-3 fw-bold"
                    key={trainging.trainingId}
                  >
                    <div className="icon-time">
                      <i className="fa-solid fa-square text-success"></i>
                    </div>
                    <div className="name-meeting flex-grow-1">
                      <p className="fs-6 ">{trainging.trainingName}</p>
                    </div>
                    <div className="time ms-5">
                      <p className="fs-6 ">
                        {trainging.trainingDate &&
                        new Date(trainging.trainingDate) - new Date() > 0
                          ? format(
                              new Date(trainging.trainingDate),
                              "MMM /d - h:m a"
                            )
                          : ""}
                      </p>
                    </div>
                  </div> */
}

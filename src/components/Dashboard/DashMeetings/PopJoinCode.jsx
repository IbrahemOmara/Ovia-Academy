import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import Slide from "@mui/material/Slide";
import { useFormik } from "formik";
import axios from "axios";
import { baseURL } from "../../../utils/baseURL";
import Loading from "../../Loading/Loading";
import BtnLoading from "../../BtnLoading/BtnLoading";
import { toast } from "react-toastify";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function PopJoinCode({join}) {
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [dataMeeting, setDataMeeting] = React.useState({});
  const [errJoin,setErrJoin] = React.useState('');
  const dataUser = JSON.parse(localStorage.getItem("dataAuth"));

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const getTrainningByCode = (code) => {
    axios
      .get(`${baseURL}/User/GetTrainningByCode?TrainningCode=${code}`)
      .then(({ data }) => {
        setDataMeeting(data);
        setTimeout(()=>{
            setLoading(false);
        },500)
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.response.data);
        setErrJoin(err.response.data);
        setTimeout(()=>{
            setLoading(false);
        },500)
      });
  };

  const searchJoinCode = useFormik({
    initialValues: {
      TrainningCode: "",
    },
    onSubmit: () => {
      setLoading(true);
      searchJoinCode.values.TrainningCode?getTrainningByCode(searchJoinCode.values.TrainningCode):'';
    },
  });

  const prepairUrlMeeting = (roomName, id) => {
    let urlMeeting;
    if (id === dataUser.customerAttributeId) {
      urlMeeting = `https://livezoon.com/join?room=${roomName}&roomPassword=false&name=admin&username=admin&audio=true&video=false&screen=false&notify=false&admin=1&&origin=ncomes.network&priamry_color=#223f4a`;
    } else {
      urlMeeting = `https://livezoon.com/join?room=${roomName}&roomPassword=false&name=${dataUser.name}&roomPassword=false&audio=false&video=false&screen=false&notify=false`;
    }
    return urlMeeting;
  };


  return (
    <React.Fragment>
      <form onSubmit={searchJoinCode.handleSubmit}>
        <div className="code-meeting position-relative ">
          <input
            name="TrainningCode"
            onChange={searchJoinCode.handleChange}
            type="text"
            className="form-control rounded-1"
            placeholder="Enter Code"
          />
          <div className="h-100 rounded-1 bg-main-color-3 border-start border-black position-absolute end-0 top-50 translate-middle-y">
            <Button
              type="submit"
              className="w-50 h-100 text-black"
              onClick={handleClickOpen}
            >
              <i className="fa-solid fa-search"></i>
            </Button>
          </div>
        </div>
      </form>

      <Dialog
        open={open}
        TransitionComponent={Transition}
        onClose={handleClose}
      >
        <DialogContent style={{width:'clamp(350px,50vw,500px)',height:'200px'}}>
          <DialogContentText
            className="bg-main-color text-main p-3"
            id="alert-dialog-slide-description"
          >
            
            {
                searchJoinCode.values.TrainningCode || !errJoin?
                loading ? (
              <BtnLoading />
            ) : (
              <div className="">
                <div className="info d-flex justify-content-between">
                  <p className="">Trainning Name</p>
                  <p className="">{dataMeeting?.trainningName}</p>
                </div>
                <div className="info d-flex justify-content-between">
                  <p className="">Trainning Code</p>
                  <p className="">{dataMeeting?.trainningCode}</p>
                </div>
                <div className="info d-flex justify-content-between">
                  <p className="">Date</p>
                  <p className="">{dataMeeting?.date}</p>
                </div>
              </div>
            ):`Enter Code and ${errJoin}`
            
            }
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={()=>join(()=>prepairUrlMeeting(dataMeeting.trainningName,dataMeeting.createdBy))}
            className="text-black text-capitalize fw-bold Y-border"
          >
            Join
          </Button>
          <Button
            onClick={handleClose}
            className="text-black text-capitalize fw-bold "
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

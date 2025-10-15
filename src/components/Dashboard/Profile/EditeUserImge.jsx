import { useFormik } from "formik";
import React, { useContext } from "react";
import { baseURL } from "../../../utils/baseURL";
import axios from "axios";
import { StoreContext } from "../../../context/storeContext";
import { toast } from "react-toastify";

export default function EditeUserImge({ userId,refetchDataUser }) {

  const addUserImg = async (values, id) => {
    try {
      const formData = new FormData();
      formData.append("file", values.file);
      const data = await axios.post(
        `${baseURL}/User/AddUserImg?userId=${id}`,
        formData
      );
      // console.log(data);
      refetchDataUser();
      toast.success("Image Added Successfully");
    } catch (err) {
      console.log(err);
      toast.error("You have problem");
    }
  };

  const imgUser = useFormik({
    initialValues: {
      file: "",
    },
    onSubmit: (values) => {
      // console.log(values.file);
      addUserImg(values, userId);
    },
  });

  const handleImage = (event) => {
    if (event.currentTarget.files) {
      imgUser.setFieldValue("file", event.currentTarget.files[0]);
    }
    // console.log(event.currentTarget.files);
    imgUser.submitForm();
  };

  return (
    <>
      <div className="control-img-profile position-relative overflow-hidden">
        <button className="rounded-circle bg-main-color text-main border-0">
          <i className="fa-solid fa-camera"></i>
        </button>
        <div className="position-absolute top-0 opacity-0">
          <input
            onChange={handleImage}
            type="file"
            className="form-control-file"
            name="file"
            id="file"
          />
        </div>
      </div>
    </>
  );
}

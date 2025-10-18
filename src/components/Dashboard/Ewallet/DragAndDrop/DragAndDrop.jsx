import React, { useContext, useState } from "react";
import "./DragAndDrop.css";
import dragAndDrop from "../../../../assets/images/dashboard/dragAndDrop.png";
import { useFormik } from "formik";
import axios from "axios";
import { baseURL } from "../../../../utils/baseURL";
import * as Yup from "yup";
import BtnLoading from "../../../BtnLoading/BtnLoading";
import { useNavigate } from "react-router-dom";
import { StoreContext } from "../../../../context/storeContext";
import { toast } from "react-toastify";

// Validation schema
const validationSchema = Yup.object().shape({
  methodid: Yup.string().required("Required"),
  cardNumber: Yup.string().required("Required"),
  nationalIdback: Yup.mixed()
    .required("Upload Image for back!")
    .test("fileType", "Upload image for back!", (value) =>
      value
        ? ["image/jpeg", "image/png", "image/jpg"].includes(value.type)
        : false
    ),
  nationalIdfront: Yup.mixed()
    .required("Upload Image for front!")
    .test("fileType", "Upload image for front!", (value) =>
      value
        ? ["image/jpeg", "image/png", "image/jpg"].includes(value.type)
        : false
    ),
});

export default function DragAndDrop() {
  const userId = JSON.parse(localStorage.dataAuth).customerAttributeId;
  const [verifyLoading, setVerifyLoading] = useState(false);
  const { setConfirmOtpShow } = useContext(StoreContext); // show pop up otp

  const [fileName1, setFileName1] = useState("");
  const [fileName2, setFileName2] = useState("");

  const formik = useFormik({
    initialValues: {
      userid: userId,
      methodid: "",
      cardNumber: "",
      nationalIdfront: null,
      nationalIdback: null,
    },
    validationSchema,
    onSubmit: async (values) => {
      setVerifyLoading(true);
      try {
        const formData = new FormData();
        formData.append("userid", values.userid);
        formData.append("methodid", values.methodid);
        formData.append("cardNumber", values.cardNumber);
        formData.append("nationalIdback", values.nationalIdback);
        formData.append("nationalIdfront", values.nationalIdfront);

        const response = await axios.post(
          `${baseURL}/CustomerInfo/addnewcashbackmethodAndNationdId`,
          formData
        );

        console.log(response.data);
        setConfirmOtpShow("d-block");
        toast.success("Files uploaded successfully");
      } catch (error) {
        console.error("There was an error uploading the files!", error);
        toast.error(error.response.data || "File upload failed");
      } finally {
        setVerifyLoading(false);
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="drag">
      <div>
        <label htmlFor="methodid" className="form-label  my-fw-bold">
          Method
        </label>
        <select
          name="methodid"
          className="form-select select-piont py-2"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.methodid}
          id="methodid"
          required
        >
          <option value="">Select Method</option>
          <option value="1">Binance</option>
          {/* Add more options as needed */}
        </select>
        {formik.touched.methodid && formik.errors.methodid ? (
          <div className="alert alert-danger py-1 px-2 text-center">
            {formik.errors.methodid}
          </div>
        ) : null}
      </div>

      <div className="mt-4">
        <label
          htmlFor="cardNumber"
          className="form-label  my-fw-bold"
        >
          Account Number
        </label>
        <input
          type="text"
          id="cardNumber"
          name="cardNumber"
          className="form-control"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.cardNumber}
          required
        />
        {formik.touched.cardNumber && formik.errors.cardNumber ? (
          <div className="alert alert-danger py-1 px-2 text-center">
            {formik.errors.cardNumber}
          </div>
        ) : null}
      </div>

      <div className="mt-4">
        <label
          htmlFor="accountNum"
          className="form-label  my-fw-bold"
        >
          Upload Identification card
        </label>
        <div className="row gy-3">
          <div className="col-md-6">
            <div className="">
              <label
                htmlFor="nationalIdfront"
                className="form-label  my-fw-bold d-block m-auto text-center"
              >
                Front
              </label>
              <div className="form-group form-control-file">
                <input
                  type="file"
                  className="form-control-file input-file"
                  name="nationalIdfront"
                  id="nationalIdfront"
                  accept="image/*"
                  onChange={(event) => {
                    formik.setFieldValue(
                      "nationalIdfront",
                      event.currentTarget.files[0]
                    );
                    setFileName1(event.currentTarget.files[0].name);
                  }}
                  required
                />
                <div
                  className="bg-file position-relative "
                  style={{ height: "250px" }}
                >
                  <div className="title position-absolute w-100 text-white">
                    <p className="w-100 text-center text-main my-fw-bold position-absolute w-100 top-0 py-2">
                      Drag and Drop
                    </p>
                    <p className="fs-small d-block m-auto bg-main-color-2 mb-4 p-1 text-center">
                      {fileName1}
                    </p>
                  </div>
                  <img
                    src={dragAndDrop}
                    className="w-100 h-100 object-fit-fill"
                  />
                </div>
              </div>
            </div>
            <div className="">
              {formik.touched.nationalIdfront &&
              formik.errors.nationalIdfront ? (
                <div className="alert alert-danger py-1 px-2 text-center m-0">
                  {formik.errors.nationalIdfront}
                </div>
              ) : null}
            </div>
          </div>

          <div className="col-md-6">
            <div className="">
              <label
                htmlFor="nationalIdback"
                className="form-label  my-fw-bold d-block m-auto text-center"
              >
                Back
              </label>
              <div className="form-group form-control-file">
                <input
                  type="file"
                  className="form-control-file input-file"
                  name="nationalIdback"
                  id="nationalIdback"
                  accept="image/*"
                  onChange={(event) => {
                    formik.setFieldValue(
                      "nationalIdback",
                      event.currentTarget.files[0]
                    );
                    setFileName2(event.currentTarget.files[0].name);
                  }}
                  required
                />
                <div
                  className="bg-file position-relative"
                  style={{ height: "250px" }}
                >
                  <div className="title position-absolute w-100 text-white">
                    <p className="w-100 text-center text-main my-fw-bold position-absolute w-100 top-0 py-2">
                      Drag and Drop
                    </p>
                    <p className="fs-small d-block m-auto bg-main-color-2 mb-4 p-1 text-center">
                      {fileName2}
                    </p>
                  </div>
                  <img
                    src={dragAndDrop}
                    className="w-100 h-100 object-fit-fill"
                  />
                </div>
              </div>
            </div>
            <div className="">
              {formik.touched.nationalIdback && formik.errors.nationalIdback ? (
                <div className="alert alert-danger py-1 px-2 text-center">
                  {formik.errors.nationalIdback}
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>

      <div>
        <button
          type="submit"
          className="btn bg-grdient w-50 d-block m-auto mt-3"
          disabled={verifyLoading}
        >
          {verifyLoading ? <BtnLoading color={"#223F4A"} /> : "Verify"}
        </button>
      </div>
    </form>
  );
}

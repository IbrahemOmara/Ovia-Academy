import { useFormik } from "formik";
import React from "react";
import axios from "axios";
import { baseURL } from "../../../utils/baseURL";
import { toast } from "react-toastify";

export default function EditeUserImge({ userId, refetchDataUser }) {
  const addUserImg = async (values) => {
    try {
      const formData = new FormData();

      // ⚠️ لازم الاسم يكون image زي Swagger
      formData.append("image", values.image);

      await axios.post(
        `${baseURL}/BunnyImages/UploadImage?customerId=${userId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      toast.success("Image uploaded successfully");

      // تحديث بيانات المستخدم
      refetchDataUser();

      // 🔁 ريفريش الصفحة عشان الهيدر يتحدث
      setTimeout(() => {
        window.location.reload();
      }, 800);

    } catch (error) {
      console.error(error);
      toast.error("Image upload failed");
    }
  };

  const formik = useFormik({
    initialValues: {
      image: null,
    },
    onSubmit: addUserImg,
  });

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      formik.setFieldValue("image", e.target.files[0]);
      formik.submitForm();
    }
  };

  return (
    <div className="control-img-profile position-relative overflow-hidden">
      <button
        type="button"
        className="rounded-circle bg-main-color text-main border-0"
      >
        <i className="fa-solid fa-camera"></i>
      </button>

      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className="position-absolute top-0 start-0 w-100 h-100 opacity-0"
      />
    </div>
  );
}
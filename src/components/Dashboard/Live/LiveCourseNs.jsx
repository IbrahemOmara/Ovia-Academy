import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LiveCourseNs() {
  const navagite = useNavigate();
  const dataUser =  JSON.parse(localStorage.dataAuth);
  const [urlMeetingNow, setUrlMeetingNow] = useState(
    "https://livezoon.com/join?room=532176599&roomPassword=false&name=admin&username=admin&audio=true&video=false&screen=false&notify=false&admin=1&&origin=ncomes.network&priamry_color=#223f4a"
  );

  const style = {
    height: "80vh",
    width: "100%",
    border: "0px",
  };

  useEffect(() => {
    if (!dataUser.ns_balance) {
      navagite("/dashboard-user");
    }
  }, []);

  return (
    <>
      <section>
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="now-meeting rounded-4 overflow-hidden shadow">
                {urlMeetingNow ? (
                  <iframe
                    allow="camera; microphone; display-capture; fullscreen; clipboard-read; clipboard-write; autoplay"
                    src={urlMeetingNow}
                    style={style}
                    className="w-100 object-fit-fill d-block "
                  ></iframe>
                ) : (
                  <div
                    className="d-flex align-items-center justify-content-center rounded-4 overflow-hidden shadow border"
                    style={{ height: "80vh" }}
                  >
                    <h5 className="text-center text-white">No Meeting Now</h5>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

import React, { useState } from "react";

export default function LiveTradingNNs() {
  const [nameUser, setNameUser] = useState(
    JSON.parse(localStorage.dataAuth).name
  );
  // const name = nameUser.split(' ');
  // console.log(name[0]);

  const [urlMeetingNow, setUrlMeetingNow] = useState(
    `https://livezoon.com/join?room=6666&roomPassword=false&name=${nameUser}&roomPassword=false&audio=false&video=false&screen=false&notify=false`
  );

  const style = {
    height: "80vh",
    width: "100%",
    border: "0px",
  };
  return (
    <>
      <section className="mt-5 py-5">
        <div className="container-fluid mt-5">
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

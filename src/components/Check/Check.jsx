import React from "react";
import "../Dashboard/MyBusiness/MyBusiness.css";
import CheckBank from "../Dashboard/RequestChecks/CheckBank";
export default function Check() {
  return (
    <>
      <section className="my-business vh-100 mt-5 pt-5">
        <div className="mt-4">
          <div className="row p-0 justify-content-center gy-2">
            <div className="col-md-7 col-lg-5 p-0 p-md-2 " >
              <CheckBank check={{}} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

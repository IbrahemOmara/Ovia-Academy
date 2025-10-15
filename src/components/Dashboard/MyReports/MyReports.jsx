import axios from "axios";
import React from "react";
import { baseURL } from "../../../utils/baseURL";
import ReportToken from "./ReportToken";

export default function MyReports() {
  return (
    <>
      <section className="reports">
        <div className="px-3">
          <div className="row justify-content-center mt-4">
            <div className="col-6 text-center">
              <div className="">
                <ReportToken />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

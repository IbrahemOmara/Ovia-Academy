import axios from "axios";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { format } from "date-fns";
import Loading from "../../Loading/Loading";
import { baseURL } from "../../../utils/baseURL";

export default function ViewOrder() {
  const params = useParams();
  const [orderId,setOrderId] = useState(params.id)

  // console.log(orderId);
  const getOrder = (id) => {
    return axios.get(`${baseURL}/Orders/GetOrderDetails?orderId=${id}`);
  };

  const { data: order, isLoading } = useQuery(
    "getOrder",
    () => getOrder(orderId),
    {
      // refetchOnMount: false,
      refetchOnWindowFocus: false,
      refetchInterval: false,
    }
  );

  // console.log(order);

  if(isLoading) return <Loading/>

  return (
    <>
      <section className="order mt-5">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-8">
              <div className="card m-auto bg-body h-100" style={{maxWidth:'500px'}}>
                <div className="border-bottom pb-4">
                  <div className="status mt-5">
                    <div
                      className="m-auto p-2 rounded-circle d-flex align-items-center justify-content-center "
                      style={{
                        width: "fit-content",
                        backgroundColor: "#00000010",
                      }}
                    >
                      <i
                        className="fa fa-check-circle text-success"
                        aria-hidden="true"
                      ></i>
                    </div>
                    <h5 className="text-center fw-bold mt-3" style={{color:"#1a8755"}}>Order Success!</h5>
                  </div>
                </div>
                <div className="card-body pt-4">
                  <div className="info-order d-flex justify-content-between">
                    <p className="text-muted fw-bold">References Number</p>
                    <span className="text-black fw-bold">
                      {order?.data.invoiceSerial}
                    </span>
                  </div>
                  <div className="info-order d-flex justify-content-between">
                    <p className="text-muted fw-bold">Package Name</p>
                    <span className="text-black fw-bold">
                      {order?.data.packageName}
                    </span>
                  </div>
                  <div className="info-order d-flex justify-content-between">
                    <p className="text-muted fw-bold">Time</p>
                    <span className="text-black fw-bold">
                      {order?.data.creationDate
                        ? format(
                            new Date(order.data.creationDate),
                            "MMM d, h : m a"
                          )
                        : "No Date"}
                    </span>
                  </div>
                  <div className="info-order d-flex justify-content-between">
                    <p className="text-muted fw-bold">Completed</p>
                    <span className="text-black fw-bold">
                      {order?.data.isCompleted?'Yes' :'No'}
                    </span>
                  </div>
                  <div className="info-order d-flex justify-content-between">
                    <p className="text-muted fw-bold">Orignal Cost</p>
                    <span className="text-black fw-bold">${order?.data.orignalCost}</span>
                  </div>
                  <div className="info-order d-flex justify-content-between border-top pt-3 border-top-dashed ">
                    <p className="text-muted fw-bold">Cost</p>
                    <span className="text-black fw-bold">${order?.data.cost}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

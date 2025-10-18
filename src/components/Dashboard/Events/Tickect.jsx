import React from "react";
import { useParams } from "react-router-dom";
import { baseURL } from "../../../utils/baseURL";
import { useQuery } from "react-query";
import Loading from "../../Loading/Loading";
import axios from "axios";
import imgTicket from "../../../assets/cources/ai.jpeg";


export default function Tickect() {
  const prams = useParams();
  console.log(prams.id);

  const getTicket = (id) => {
    return axios.get(`${baseURL}/Event/GetEventTicketById?ticketId=${id}`);
  };

  const {data:ticket,isLoading,isError} = useQuery("getTicket", () => getTicket(prams.id), {
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchInterval: false,
  });

  if(isLoading) return <Loading/>;

  return (
    <>
      <section className="ticket min-vh-100 text-white mt-5 pt-5">
        <div className="container">
          <div className="row pe-4">
            <div className="col-12 d-flex justify-content-center ">
              <div className="img-ticket position-relative border" style={{height:'450px', maxWidth:'450px',minWidth:'330px'}}>
                <img src={imgTicket} alt="Event Ticket"/>
                <div className="data d-flex flex-column">
                  <p className="m-0"> {ticket?.data.name}</p>
                  <p>{ticket?.data.ticketID}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

import React, { useState } from "react";
import Selection from "../components/Selection";
import Attendee from "../components/Attendee";
import TicketConfirmation from "../components/TicketConfirmation";

// Define types for selection and attendee data
interface SelectionData {
  ticketType: string;
  numTickets: number;
}

interface AttendeeData {
  name: string;
  email: string;
  about?: string;
  imageUrl?: string;
}

type TicketStage = "selection" | "attendee" | "ready";

// Define the full main data structure
interface MainData extends SelectionData, AttendeeData {}

const Events: React.FC = () => {
  const [ticketsPlan, setTicketsPlan] = useState<TicketStage>("selection");
  const [selectionData, setSelectionData] = useState<SelectionData>({
    ticketType: "",
    numTickets: 0,
  });

  const [attendeeData, setAttendeeData] = useState<AttendeeData>({
    name: "",
    email: "",
    about: "",
    imageUrl: "",
  });
  const [mainData, setMainData] = useState<MainData>({
    ticketType: "",
    numTickets: 0,
    name: "",
    email: "",
    about: "",
    imageUrl: "",
  });

  // Handle ticket selection data
  const handleSelectionData = (data: SelectionData) => {
    setSelectionData(data);
    console.log(attendeeData, selectionData);
    setTicketsPlan("attendee");
    setMainData((oldData) => ({
      ...oldData,
      ...data,
    }));
  };

  // Handle attendee details
  const handleAttendeeData = (data: AttendeeData) => {
    setAttendeeData(data);
    setTicketsPlan("ready");
    setMainData((oldData) => ({
      ...oldData,
      ...data,
    }));
  };

  const handleSetTicketStage = (plan: TicketStage) => {
    setTicketsPlan(plan);
  };

  let title = "Ticket Selection";
  let step = 1;
  if (ticketsPlan === "attendee") {
    title = "Attendee Details";
    step = 2;
  } else if (ticketsPlan === "ready") {
    title = "Ready";
    step = 3;
  }

  return (
    // <Router>
    <div className="min-h-screen bg-[#02191D] text-gray-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-[#041E23] max-w-xl mx-auto p-4 md:p-8 rounded-xl p8 backdrop-blur-lg border border-[#0E464F]">
          <div className="mb-4">
            <div className="flex items-center justify-between ">
              <h1 className="text-2xl font-bold">{title}</h1>
              <p>Step {step}/3</p>
            </div>
            <div className="relative w-full bg-[#0E464F] rounded-full h-1 mt-2">
              <div
                className="bg-[#24A0B5] h-1 rounded-full"
                style={{ width: `${(step / 3) * 100}%` }}
              ></div>
            </div>
          </div>
          {ticketsPlan === "selection" ? (
            <Selection setData={handleSelectionData} />
          ) : ticketsPlan === "attendee" ? (
            <Attendee setAttendeeData={handleAttendeeData} />
          ) : (
            <TicketConfirmation
              booked={mainData}
              setTicketsPlan={handleSetTicketStage}
            />
          )}
        </div>
      </div>
    </div>
    // </Router>
  );
};

export default Events;

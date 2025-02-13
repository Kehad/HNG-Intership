import domtoimage from "dom-to-image";
import BarcodeGenerator from "./BarcodeGenerator";
import { useRef } from "react";

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


// interface TicketsProps {
//   setTicketsPlan: (value: "selection" | "attendee" | "ready") => void;
// }

// Define the full main data structure
interface MainData extends SelectionData, AttendeeData {}

const TicketConfirmation = ({
  booked,
  setTicketsPlan,
}: {
  booked: MainData;
  setTicketsPlan: (value: "selection" | "attendee" | "ready") => void
}) => {
  const ticketRef = useRef<HTMLDivElement>(null);

  const rebookHandler = () => {
    setTicketsPlan("selection");
  };

  const downloadTicket = async () => {
    if (!ticketRef.current) return;

    domtoimage
      .toPng(ticketRef.current)
      .then((dataUrl) => {
        const link = document.createElement("a");
        link.href = dataUrl;
        link.download = booked.name + " ticket.png";
        link.click();
      })
      .catch((error) => {
        console.error("Error generating image:", error);
      });
  };
function generateUPC() {
  let upcBase = Math.floor(Math.random() * 1e11)
    .toString()
    .padStart(11, "0"); // Generate 11-digit base
  let checkDigit = calculateCheckDigit(upcBase); // Calculate check digit
  return upcBase + checkDigit; // Combine base with check digit
}

/** Function to calculate UPC-A check digit */
function calculateCheckDigit(upcBase: string) {
  let sum = 0;
  for (let i = 0; i < 11; i++) {
    sum += parseInt(upcBase[i]) * (i % 2 === 0 ? 3 : 1);
  }
  let checkDigit = (10 - (sum % 10)) % 10; // Modulo to get the check digit
  return checkDigit.toString();
}
  const value = generateUPC();


  return (
    <div className="min-h-screen bg-[#041E23] md:p-6">
      <div className="ticke max-width mx-auto space-y-8">
        {/* Confirmation Message */}
        <div className="tiket--start text-center space-y-2">
          <h2 className="text-2xl text-white font-semibold">
            Your Ticket is Booked!
          </h2>
          <p className="text-gray-400">
            You can download or check your email for a copy
          </p>
        </div>

        {/* Ticket Card */}
        <div
          ref={ticketRef}
          className="max-width border border-teal-400 rounded-lg mx-auto bg-[#072B30] p-6 text-white"
        >
          <div className="border border-teal-400 rounded-2xl p-6 relative">
            {/* Header */}
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold mb-2">Techember Fest '25</h1>
              <p className="text-sm">📍 04 Rumens Road, Ikoyi, Lagos</p>
              <p className="text-sm">📅 March 13, 2025 | 7:00 PM</p>
            </div>

            {/* Profile Image */}
            <div className="flex justify-center mb-8">
              <div className="relative w-24 h-24 bg-teal-800 rounded-lg overflow-hidden">
                <img
                  src={booked.imageUrl}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Ticket Details */}
            <div className="space-y-1 border border-[#133D44] divide-y divide-[#12464E] bg-[#08343C] p-3 rounded-md mb-4">
              <div className="grid grid-cols-2 divide-x divide-[#12464E] gap-4">
                <div>
                  <label className="text-xs block mb-1 text-[#517075]">
                    Name
                  </label>
                  <div className="text-white text-sm">{booked.name}</div>
                </div>
                <div>
                  <label className="text-xs block mb-1 text-[#517075]">
                    Email
                  </label>
                  <div className="text-white text-sm break-words overflow-wrap break-word">
                    {booked.email}
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 divide-x divide-[#12464E]">
                <div>
                  <label className="text-xs block mb-1 mt-2 text-[#517075]">
                    Ticket Type
                  </label>
                  <div className="text-white mb-2 text-sm">
                    {booked.ticketType}
                  </div>
                </div>
                <div>
                  <label className="text-xs block mb mt-2 text-[#517075]">
                    Tickets
                  </label>
                  <div className="text-white mb-2 text-sm">
                    {booked.numTickets}
                  </div>
                </div>
              </div>
              <div>
                <label className="text-xs block mb-1 mt-2 text-[#517075]">
                  Special Request?
                </label>
                <p className="text-white text-[12px] break-words overflow-wrap break-word">
                  {booked.about ? booked.about : "No special request"}
                </p>
              </div>
            </div>

            {/* Barcode */}
            <div className="mt-8 py-8 flex items-center justify-center border-t-2 border-dashed border-teal-400">
              <BarcodeGenerator value={value} />
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col-reverse md:flex-row gap-6 items-center justify-center w-full">
          <button
            onClick={rebookHandler}
            className="w-full px-4 py-3 border border-[#0E464F] rounded-lg text-gray-300 hover:bg-[#052228]"
          >
            Book Another Ticket
          </button>
          <button
            onClick={downloadTicket}
            className="w-full px-4 py-3 bg-[#24A0B5] rounded-lg text-white hover:bg-[#24A0B5]/90"
          >
            Download Ticket
          </button>
        </div>
      </div>
    </div>
  );
};

export default TicketConfirmation;

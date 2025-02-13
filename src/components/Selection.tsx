import React, { useState, ChangeEvent, FormEvent } from "react";

interface Ticket {
  type: string;
  name: string;
  price: string;
  remaining: number;
  width: string;
}

interface FormData {
  ticketType: string;
  numTickets: number;
}

interface SelectionProps {
  setData: (data: FormData) => void;
}

const tickets: Ticket[] = [
  {
    type: "regular",
    name: "REGULAR ACCESS",
    price: "Free",
    remaining: 20,
    width: "w-full",
  },
  {
    type: "vip",
    name: "VIP ACCESS",
    price: "$50",
    remaining: 20,
    width: "w-full",
  },
  {
    type: "vvip",
    name: "VVIP ACCESS",
    price: "$150",
    remaining: 20,
    width: "w-full",
  },
];

const Selection: React.FC<SelectionProps> = ({  setData }) => {
  const [formData, setFormData] = useState<FormData>({
    ticketType: "regular",
    numTickets: 1,
  });

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setData(formData); 
  };

  return (
    <div className="bg-[#041E23] max-w-xl mx-auto rounded-xl  backdrop-blur-lg border border-none md:border-[#0E464F]">
      <div className="border-non md:border-[#0E464F] md:border rounded-2xl p-3 md:bg-[#08252B]">
        <div className="text-center mb-12 bg-linear-to-br from-[rgba(36,160,181,0.7)] via-[rgba(10,12,17,0.3)] to-[rgba(10,12,17,0.3)] to-[0%] rounded-2xl p-6">
          <h1
            className="text-4xl font-bold text-white mb-4 font-sans"
            style={{ textShadow: "2px 2px 4px rgba(0,0,0,0.3)" }}
          >
            Techember Fest '25
          </h1>
          <p className="text-gray-300 text-sm md:text-md mb-4">
            Join us for an unforgettable experience at
            <br />
            [Event Name]! Secure your spot now.
          </p>
          <div className="flex flex-col md:flex-row items-center justify-center text-gray-300 space-x-2">
            <span>📍[Event Location]</span>
            <span className="hidden md:block mx-2">||</span>
            <span>March 15, 2025 | 7:00 PM</span>
          </div>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <p>Select Ticket Type:</p>
          <div className="flex flex-col gap-4 p-2 bg-[#052228] rounded-[1.2rem] border-[#07373F] border-1">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {tickets.slice(0, 3).map((ticket) => (
                <div
                  key={ticket.type}
                  onClick={() =>
                    setFormData((prev) => ({
                      ...prev,
                      ticketType: ticket.type,
                    }))
                  }
                  className={`${ticket.width} relative cursor-pointer`}
                >
                  <div
                    className={` h-max rounded-xl relative overflow-hidden border  ${
                      formData.ticketType === ticket.type
                        ? "bg-[#12464E] border-[#197686]"
                        : "bg-[#052228] border-[#197686] "
                    } transition-colors duration-300 hover:bg-[#2C545B]  `}
                  >
                    {/* Glass effect overlay */}
                    <div className="absolute inset-0 bg-[rgba(0,255,255,0.05)]"></div>

                    {/* Content */}
                    <div className="relative h-full flex flex-col justify-between items-cente px-2 py-2">
                      <div>{ticket.price}</div>
                      <div>
                        <div className="text-[#fff] font-[300] text-[12px]">
                          {ticket.name}
                        </div>
                        <div className="text-[#fff]/60 text-xs">
                          {ticket.remaining}/50
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* VVIP Option */}
          </div>

          <div className="space-y-4">
            <div>
              <label
                htmlFor="numTickets"
                className="block text-sm font-medium mb-1"
              >
                Number of Tickets
              </label>
              <select
                id="numTickets"
                name="numTickets"
                value={formData.numTickets}
                onChange={handleChange}
                className="w-full bg-[#001a1a border border-[#07373F] rounded-lg px-4 py-2 focus:border-teal-500 focus:ring-1 focus:ring-teal-500"
              >
                {[1, 2, 3, 4, 5].map((num) => (
                  <option key={num} value={num} className="bg-[#001a1a]">
                    {num}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex flex-col-reverse md:flex-row gap-6 items-center justify-center w-full">
            {/* Cancel Button */}
            <button
              type="button"
              className="flex- text-[#24A0B5] border border-[#24A0B5] w-full px-20 py-2 rounded-lg transition hover:bg-[#24A0B5]/20"
            >
              Cancel
            </button>

            {/* Next Button */}
            <button
              type="submit"
              className="flex- bg-[#24A0B5] w-full  text-white px-20 py-2 rounded-lg transition hover:bg-[#1E889A]"
            >
              Next
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Selection;

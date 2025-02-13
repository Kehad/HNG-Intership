import React from 'react'

function About() {
  return (
    <div className="min-h-screen  text-white flex items-center justify-center p-6">
      <div className="max-w-3xl w-full border  rounded-xl p-6 shadow-lg">
        <h1 className="text-xl font-bold text-teal-400 mb-4">
          Event Ticket Booking UI - Open Source Practice Project 🎟️
        </h1>
        <p className="text-gray-300 mb-4">
          This is a beginner-friendly and practical Event Ticket Booking UI
          designed for developers to clone, explore, and build upon.
        </p>
        <p>
          The project consists of a three-step ticket booking flow, and
          developers can extend it further by integrating payment solutions,
          user authentication (optional), and ticket validation systems.
        </p>
        <h2 className="text-lg font-semibold text-teal-400 mb-2">
          Flow & Features
        </h2>
        <div className="space-y-4">
          <div>
            <h3 className="text-md font-semibold text-teal-300">
              🎫 Ticket Selection
            </h3>
            <ul className="list-disc list-inside text-gray-400">
              <li>Users can view available tickets (Free & Paid).</li>
              <li>Ticket options are displayed in a list or card view.</li>
              <li>
                For Free Tickets → Clicking “Get Free Ticket” proceeds to
                attendee details.
              </li>
              <li>
                For Paid Tickets → Clicking “Purchase Ticket” would ideally open
                a payment modal.
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-md font-semibold text-teal-300">
              📝 Attendee Details Form
            </h3>
            <ul className="list-disc list-inside text-gray-400">
              <li>Users input their Name, Email, and optional Phone Number.</li>
              <li>Profile picture upload option with preview functionality.</li>
              <li>
                Ticket summary is visible to ensure users review their details
                before submission.
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-md font-semibold text-teal-300">
              ✅ Payment & Success Page
            </h3>
            <ul className="list-disc list-inside text-gray-400">
              <li>
                f the ticket is free, the user is taken directly to the Ticket
                Confirmation Page.
              </li>
              <li>
                If the ticket is paid, developers can integrate Stripe,
                Paystack, or Flutterwave to process payments before showing the
                confirmation page.
              </li>
              <li> Upon successful booking, users should receive:</li>
              <li>
                An option to download the ticket as PDF or save it to their
                device.
              </li>
              <li>An email confirmation containing ticket details.</li>
            </ul>
          </div>
        </div>
        <div>
          <h2 className="text-lg font-semibold text-teal-400 mt-6 mb-2">
            Tech Stack
          </h2>
          <ul className="list-disc list-inside text-gray-400">
            <li>React & Tailwind CSS</li>
            <li>Firebase Firestore for ticket storage</li>
            <li>Stripe, Paystack, Flutterwave for payments</li>
            <li>QR Code & Unique Ticket ID Generation</li>
          </ul>
        </div>
        <div className="my-5">
          <h3 className="text-2xl ">How to Build This 🚀</h3>
        </div>
        <p className="text-md font-semibold text-teal-300">
          This UI can be implemented using:
        </p>
        <div className="my-3">
          <h3 className="text-md font-semibold text-teal-300">
            📌 Frontend (Next.js or React)
          </h3>
          <ul className="list-disc list-inside text-gray-400">
            <li>Component Breakdown:</li>
            <li>TicketCard.tsx → Displays ticket details</li>
            <li>AttendeeForm.tsx → Captures user details</li>
            <li>PaymentModal.tsx → Handles payment processing</li>
            <li>SuccessScreen.tsx → Shows the final ticket preview</li>
            <li>
              State Management: React’s Context API, Zustand, or Redux (if
              needed).
            </li>
            <li>
              File Handling: Users should be able to upload images (profile
              picture for ticket) using Firebase Storage, Cloudinary, or local
              preview with URL.createObjectURL().
            </li>
          </ul>
        </div>
        <div className="my-3">
          <h3 className="text-md font-semibold text-teal-300">
            📌 Backend (Optional)
          </h3>
          <ul className="list-disc list-inside text-gray-400">
            <li>If persistence is required, a backend can be built using:</li>
            <li>Node.js & Express or Firebase Functions</li>
            <li>
              Database: MongoDB, PostgreSQL, or Firebase Firestore to store
              ticket records
            </li>
          </ul>
        </div>
        <div className="my-3">
          <h3 className="text-md font-semibold text-teal-300">
            📌 Payment Integration
          </h3>
          <ul className="list-disc list-inside text-gray-400">
            <li>For paid events, developers should integrate:</li>
            <li>Stripe Checkout (for international transactions)</li>
            <li>Paystack or Flutterwave (for African users)</li>
          </ul>
        </div>
        <div className="my-3">
          <h3 className="text-md font-semibold text-teal-300">
            What You’ll Learn 🧑‍💻
          </h3>
          <ul className="list-disc list-inside text-gray-400">
            <li>File handling & validation (profile picture uploads).</li>
            <li>Dynamic UI updates based on ticket selection.</li>
            <li>Persisting bookings using local state or a backend.</li>
            <li>Integrating payment gateways for ticket purchases.</li>
            <li>
              Generating & validating QR Codes for event check-in (Advanced).
            </li>
          </ul>
        </div>
        Need Help? Reach Out! 💬
        <div className="flex justify-center mt-6">
          <a
            href="https://www.figma.com/community/file/1470800949188681164/event-ticket-booking-ui-open-source-practice-project"
            className="border border-teal-600 px-4 py-2 rounded-lg text-teal-600 font-semibold mx-2"
          >
            Design File
          </a>
          <a
            href="https://github.com/Kehad/HNG-Intership"
            className="bg-teal-500 hover:bg-teal-600 px-4 py-2 rounded-lg text-white font-semibold mx-2"
          >
            GitHub Code
          </a>
        </div>
      </div>
    </div>
  );
}

export default About
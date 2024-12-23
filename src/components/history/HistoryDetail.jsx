import React, { useState, useEffect } from "react";
// import StatusButton from "./StatusButton";
import { motion } from "framer-motion";

const HistoryDetail = ({ history }) => {
  const [isLoading, setIsLoading] = useState(true);

  const formatTimeTo24Hour = (time) => {
    if (!time) return "Invalid time";
    try {
      const [timePart, modifier] = time.split(" ");
      let [hours, minutes] = timePart.split(":").map(Number);

      if (modifier === "PM" && hours < 12) hours += 12;
      if (modifier === "AM" && hours === 12) hours = 0;

      return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
    } catch (error) {
      console.error("Time parsing error:", error);
      return "Invalid time";
    }
  };

  const formatPrice = (price) => {
    if (typeof price !== "number") return "Invalid price";
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  const getStatusStyle = (status) => {
    if (!status) return "bg-gray-500 text-gray-700";
    switch (status) {
      case "CANCEL":
        return "bg-red-500 text-white";
      case "SUCCESS":
        return "bg-green-500 text-white";
      default:
        return "bg-gray-500 text-gray-700";
    }
  };

  return (
    <div>
      <div className="flex flex-col gap-1.5">
        <div className="flex items-center justify-between gap-5">
          <h3 className="text-gray-900 font-poppins text-lg font-bold">
            Detail Pesanan
          </h3>
          <div
            className={`${getStatusStyle(
              history.status
            )} px-3 py-1 rounded-full inline-block mb-1`}
          >
            {history.status}
          </div>
        </div>
        <div className="flex">
          <h4 className="text-gray-900 font-poppins text-lg font-bold mb-2">
            <span className="font-normal text-gray-900">Booking Code: </span>
            <span className="text-[#7126B5]">{history.bookingCode}</span>
          </h4>
        </div>
      </div>

      <div className="flex flex-col gap-15px">
        <div className="flex items-start">
          <div className="flex flex-1 flex-col items-start">
            <h5 className="text-gray-900 font-poppins w-33% text-sm font-bold leading-5 md:w-full">
              <span className="text-gray-900">
                {history.departureTime}
              </span>
              <br />
              <span className="font-poppins text-sm font-medium text-gray-900">
                {history.departureDate}
              </span>
            </h5>
            <p className="text-gray-900 font-poppins text-sm font-medium">
              {history.departureAirportName}
            </p>
          </div>
          <div className="relative ml-[-78px] flex">
            <h6 className="text-[#7126B5] font-poppins text-xs font-bold text-deep_purple-300">
              Keberangkatan
            </h6>
          </div>
        </div>
        <hr className="border-t-2 border-gray-300" />
      </div>

      <div className="flex flex-col gap-2 pt-2">
        <div className="flex">
          <div className="text-gray-900 font-poppins w-93% text-xs font-medium leading-18px">
            <span className="text-sm font-bold text-gray-900">
              {history.planeName} -{" "}
              {history.seatClassName}
              <br />
              {history.flightCode}
              <br />
            </span>
          </div>
        </div>
        <hr className="border-t-2 border-gray-300" />
      </div>

      <div className="flex flex-col gap-3.5 pt-3">
        <div>
          <div className="flex items-start">
            <div className="flex flex-1 flex-col items-start gap-0.5">
              <p className="text-gray-900 font-poppins w-41% text-sm font-bold leading-5 md:w-full">
                <span className="text-gray-900 ">
                  {history.arrivalTime}
                </span>
                <br />
                <span className="font-poppins text-sm font-medium text-gray-900">
                  {history.arrivalDate}
                </span>
              </p>
              <p className="text-gray-900 font-poppins text-sm font-medium">
                {history.arrivalAirportName} (
              </p>
            </div>
            <div className="relative ml-[-24px] flex">
              <p className="text-[#7126B5] font-poppins text-xs font-bold text-deep_purple-300">
                Kedatangan
              </p>
            </div>
          </div>
        </div>
        <hr className="border-t-2 border-gray-300" />
      </div>

      <div className="flex flex-col gap-0.5 py-2">
        <div className="flex">
          <p className="text-gray-900 font-poppins text-sm font-bold">
            Rincian Harga
          </p>
        </div>
        <div className="flex justify-between gap-5">
          <div className="flex flex-1">
            <p className="text-gray-900 font-poppins text-sm font-normal">
              Adults
            </p>
          </div>
          <div className="flex">
            <p className="text-gray-900 font-poppins text-sm font-normal">
              IDR {history.priceAdult}
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <div className="flex flex-1">
            <p className="text-gray-900 font-poppins text-sm font-normal">
              Children
            </p>
          </div>
          <p className="text-gray-900 font-poppins text-sm font-normal">
            IDR {history.priceChild || 0}
          </p>
        </div>
        <div className="flex gap-2">
          <div className="flex flex-1">
            <p className="text-gray-900 font-poppins text-sm font-normal">
                Baby
            </p>
          </div>
          <p className="text-gray-900 font-poppins text-sm font-normal">
            IDR {history.priceBaby || 0}
          </p>
        </div>
        <hr className="border-t-2 border-gray-300" />
        <div className="flex items-center gap-2 border-t border-solid border-blue-gray-100 py-2.5">
          <div className="flex flex-1">
            <h6 className="text-gray-900 font-poppins text-base font-bold">
              Total
            </h6>
          </div>
          <h6 className="text-[#7126B5] font-poppins text-lg font-bold">
            IDR {history.totalPrice}
          </h6>
        </div>
      </div>
      {/* <StatusButton
        status={history.status}
        bookingId={history.booking_id}
        paymentId={history.payment_id}
        seatClass={history.Tickets[0].Seat.seat_class}
      /> */}
    </div>
  );
};

export default HistoryDetail;
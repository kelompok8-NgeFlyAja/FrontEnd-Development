import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import SeatSelection from "@/components/checkout/SeatSelection";

import axios from "axios";
import { BillingDetail } from "@/components/checkout/BillingDetail";
import { FlightDetail } from "@/components/checkout/FlightDetail";
import { Passenger } from "@/components/checkout/Passengers";
import Cookies from "universal-cookie";

export const ReviewData = ({
  handleProceedToPayment,
  setBankDetails,
  billingDetails,
  flightDetails,
  passengerDetails,
  selectedSeats,
  setBillingDetails,
  setFlightDetails,
  setPassengerDetails,
  setSelectedSeats,
}) => {
  const [searchParams] = useSearchParams();
  const flightId = searchParams.get("flightId");
  const adultPassenger = parseInt(searchParams.get("adultPassenger"), 10) || 0;
  const childPassenger = parseInt(searchParams.get("childPassenger"), 10) || 0;
  const babyPassenger = parseInt(searchParams.get("babyPassenger"), 10) || 0;

  const cookies = new Cookies();
  const token = cookies.get("token");

  const bookingDetail = localStorage.getItem("bookingCode");
  useEffect(() => {
    const fetchFlightDetails = async () => {
      try {
        const response = await axios.get(
          `https://ngeflyaja.shop/ticket-details`,
          {
            params: { flightId, adultPassenger, childPassenger, babyPassenger },
          }
        );
        setFlightDetails(response.data);
      } catch (error) {
        console.error("Error fetching flight details:", error);
      }
    };

    if (flightId) fetchFlightDetails();
  }, [flightId, adultPassenger, childPassenger, babyPassenger]);

  const bookingId = localStorage.getItem("bookingId");

  const handleCreatePayment = async () => {
    try {
      const response = await axios.post(
        `https://ngeflyaja.shop/payment/${bookingId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setBankDetails(response.data.bankDetails);

      handleProceedToPayment();
    } catch (error) {
      console.error("Error creating order:", error);
    }
  };

  return (
    <div className="flex justify-center items-center w-full py-8">
      <div className="flex flex-col md:flex-row gap-8 max-w-[900px] w-full px-4">
        {/* Isi Data Pemesan */}
        <div className="flex-[2]">
          <BillingDetail billingDetails={billingDetails} readOnly={true} />
          <Passenger
            passengerDetails={passengerDetails}
            setPassengersDetails={(details) => setPassengerDetails(details)}
            readOnly={true}
          />
          <SeatSelection readOnly={true} />
          <button
            className="bg-[#D0D0D0] text-white py-3 mt-4 px-4 rounded-lg w-full"
            disabled
          >
            Simpan
          </button>
        </div>

        {/* Detail Penerbangan */}
        <div className="flex-[1]">
          <FlightDetail bookingDetail={bookingDetail} />
          <button
            onClick={handleCreatePayment}
            className="bg-[#FF0000] text-white py-3 mt-4 px-4 rounded-lg w-full"
          >
            Lanjut Bayar
          </button>
        </div>
      </div>
    </div>
  );
};

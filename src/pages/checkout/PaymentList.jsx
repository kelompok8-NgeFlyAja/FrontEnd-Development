import React, { useEffect, useState } from "react";

import { FlightDetail } from "@/components/checkout/FlightDetail";
import { useSearchParams } from "react-router-dom";
import { PaymentAccordion } from "@/components/checkout/PaymentAccordion";

export const PaymentList = ({ handlePaymentComplete }) => {
  const [searchParams] = useSearchParams();
  const [flightDetails, setFlightDetails] = useState(null);
  const flightId = searchParams.get("flightId");
  const adultPassenger = parseInt(searchParams.get("adultPassenger"), 10) || 0;
  const childPassenger = parseInt(searchParams.get("childPassenger"), 10) || 0;
  const babyPassenger = parseInt(searchParams.get("babyPassenger"), 10) || 0;

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

  return (
    <div className="mx-auto items-center justify-center py-8 flex flex-col md:flex-row gap-8 max-w-[900px] w-full px-4">
      <div className="flex-[2]">
        {/* Pass handlePaymentComplete to PaymentAccordion */}
        <PaymentAccordion handlePaymentComplete={handlePaymentComplete} />
      </div>
      <div className="flex-[1]">
        <FlightDetail data={flightDetails} />
      </div>
    </div>
  );
};

import React, { useEffect, useState } from "react";
import { formatPrice } from "@/lib/formatPrice";

const CheckoutPricing = ({ passengerInfo, ticketPrice }) => {
  const [passengers, setPassengers] = useState([]);
  const [adultPassengers, setAdultPassengers] = useState([]);
  const [childPassengers, setChildPassengers] = useState([]);
  const [infantPassengers, setInfantPassengers] = useState([]);
  const TICKET_PRICE = 4950000; // Harga tiket standar
  const TAX = 300000; // Pajak yang ditambahkan

  useEffect(() => {
    setPassengers(passengerInfo);
  }, [passengerInfo]);

  useEffect(() => {
    setAdultPassengers(passengers.filter((passenger) => passenger === "Adult"));
    setChildPassengers(passengers.filter((passenger) => passenger === "Child"));
    setInfantPassengers(
      passengers.filter((passenger) => passenger === "Infant")
    );
  }, [passengers]);

  const totalAdultPrice =
    adultPassengers.length === 2
      ? 9550000
      : TICKET_PRICE * adultPassengers.length;
  const totalChildPrice = 0 * childPassengers.length; // Child tidak dikenakan biaya
  const totalInfantPrice = TICKET_PRICE * 0.1 * infantPassengers.length;
  const totalPrice = totalAdultPrice + totalChildPrice + totalInfantPrice + TAX;

  return (
    <>
      {passengers.length > 0 && (
        <>
          <div className="my-2 border-0 border-y-2 border-y-gray-300 py-2 mx-2">
            <h3 className="text-sm font-bold mb-1"> Rincian Harga </h3>
            {adultPassengers.length > 0 && (
              <div className="flex justify-between text-sm">
                <p>{adultPassengers.length} Adult</p>
                <p>IDR {formatPrice(totalAdultPrice)}</p>
              </div>
            )}
            {childPassengers.length > 0 && (
              <div className="flex justify-between text-sm">
                <p>{childPassengers.length} Child </p>
                <p>IDR 0</p> {/* Child tidak dikenakan biaya */}
              </div>
            )}
            {infantPassengers.length > 0 && (
              <div className="flex justify-between text-sm">
                <p>{infantPassengers.length} Infant </p>
                <p>
                  IDR{" "}
                  {formatPrice(TICKET_PRICE * 0.1 * infantPassengers.length)}
                </p>
              </div>
            )}
            {/* Menambahkan Pajak pada Rincian Harga */}
            <div className="flex justify-between text-sm">
              <p>Tax</p>
              <p>IDR {formatPrice(TAX)}</p>
            </div>
          </div>
          <div className="flex justify-between mx-2">
            <h3 className="font-bold"> Total </h3>
            <h3 className="font-bold text-lg text-[#7126B5]">
              IDR {formatPrice(totalPrice)} {/* Total termasuk pajak */}
            </h3>
          </div>
        </>
      )}
    </>
  );
};

export default CheckoutPricing;

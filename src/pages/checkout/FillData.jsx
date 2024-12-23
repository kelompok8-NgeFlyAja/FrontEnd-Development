import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import SeatSelection from "@/components/checkout/SeatSelection";

import axios from "axios";
import { BillingDetail } from "@/components/checkout/BillingDetail";
import { FlightDetail } from "@/components/checkout/FlightDetail";
import { Passenger } from "@/components/checkout/Passengers";
import Cookies from "universal-cookie";

export const FillData = ({ handleSaveData }) => {
  const [searchParams] = useSearchParams();
  const flightId = searchParams.get("flightId");
  const adultPassenger = parseInt(searchParams.get("adultPassenger"), 10) || 0;
  const childPassenger = parseInt(searchParams.get("childPassenger"), 10) || 0;
  const babyPassenger = parseInt(searchParams.get("babyPassenger"), 10) || 0;
  const totalPassengers = adultPassenger + childPassenger + babyPassenger;

  const cookies = new Cookies();
  const token = cookies.get("token");

  const numberFlightId = Number(flightId);

  const [billingDetails, setBillingDetails] = useState({});
  const [flightDetails, setFlightDetails] = useState(null);
  const [passengerDetails, setPassengerDetails] = useState(
    Array(totalPassengers).fill({})
  );
  const [selectedSeats, setSelectedSeats] = useState([]);

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

  const handleSeatSelection = (seats) => {
    setSelectedSeats(seats);

    // Perbarui `passengerDetails` dengan `seatName`
    const updatedPassengers = passengerDetails.map((passenger, index) => ({
      ...passenger,
      seatName: seats[index] || null, // Pastikan `seats` sesuai dengan jumlah penumpang
    }));
    setPassengerDetails(updatedPassengers);
  };

  const handleCreateOrder = async () => {
    try {
      // Destructuring data untuk payload
      const passengersPayload = passengerDetails.map((passenger) => ({
        title: passenger.title || "", // Ambil data dari input title
        fullName: passenger.fullName || "", // Nama lengkap dari input
        familyName: passenger.familyName || "", // Nama keluarga dari input
        birthDate: passenger.birthDate || "", // Tanggal lahir dari input
        nationality: passenger.nationality || "", // Kewarganegaraan dari input
        identityNumber: passenger.documentNumber || "", // Nomor identitas dari input
        identityCountry: passenger.documentIssuer || "", // Negara penerbit identitas
        identityExpired: passenger.validUntil || "", // Tanggal berlaku identitas
        seatName: passenger.seatName || "", // Nomor kursi
      }));

      const payload = {
        bookingTicket: {
          flightId: numberFlightId,
          bookerName: billingDetails.name,
          bookerEmail: billingDetails.email,
          bookerPhone: billingDetails.phone,
        },
        passengerDetail: passengersPayload,
        adultPassenger: adultPassenger,
        childPassenger: childPassenger,
        babyPassenger: babyPassenger,
      };

      // Kirim data ke server
      const response = await axios.post(
        `https://ngeflyaja.shop/ticket-booking`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      localStorage.setItem(
        "passengerDetails",
        JSON.stringify(passengerDetails)
      );
      localStorage.setItem("bookingId", response.data.bookingId);
      localStorage.setItem("bookingCode", response.data.bookingCode);

      handleSaveData();
    } catch (error) {
      console.error("Error creating order:", error);
    }
  };

  return (
    <div className="flex items-center justify-center w-full py-8">
      <div className="flex flex-col md:flex-row gap-8 max-w-[900px] w-full px-4">
        <div className="flex-[2]">
          <BillingDetail
            billingDetails={billingDetails}
            setBillingDetails={setBillingDetails}
          />
          <Passenger
            passengerDetails={passengerDetails}
            setPassengersDetails={(details) => setPassengerDetails(details)}
          />

          <SeatSelection
            totalSeats={totalPassengers}
            onSeatSelect={handleSeatSelection}
          />
          <button
            onClick={() => {
              console.log("Button clicked");
              // handleSaveData();
              handleCreateOrder();
            }}
            className="bg-[#7126B5] text-white py-3 mt-4 px-4 rounded-lg w-full"
          >
            Simpan
          </button>
        </div>
        <div className="flex-[1]">
          <FlightDetail data={flightDetails} />
        </div>
      </div>
    </div>
  );
};

import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Cookies from "universal-cookie";

export const FlightDetail = ({ bookingDetail }) => {
  const [flightData, setFlightData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchParams] = useSearchParams();
  const cookies = new Cookies();
  const token = cookies.get("token");

  const adultCount = parseInt(searchParams.get("adultPassenger") || "0");
  const childCount = parseInt(searchParams.get("childPassenger") || "0");
  const babyCount = parseInt(searchParams.get("babyPassenger") || "0");

  useEffect(() => {
    const fetchFlightDetails = async () => {
      try {
        console.log("Fetching flight details...");
        const response = await fetch(
          `https://ngeflyaja.shop/ticket-details?flightId=1&adultPassenger=${adultCount}&childPassenger=${childCount}&babyPassenger=${babyCount}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        ).catch((error) => {
          console.error("Error fetching data:", error);
          if (error.response && error.response.status === 401) {
            console.error("Unauthorized. Please log in again.");
          }
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        console.log("API Response:", result);

        if (result.status === "Success") {
          setFlightData(result.data);
        } else {
          throw new Error(result.message || "Unknown error occurred");
        }
      } catch (err) {
        console.error("Error fetching flight details:", err);
        setError(err.message || "Failed to fetch flight details");
      } finally {
        setLoading(false);
      }
    };

    fetchFlightDetails();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="p-6 border rounded-lg shadow-md">
      <h2 className="mb-4 text-xl font-bold">Detail Penerbangan</h2>
      <div className="text-sm">
        {/* Keberangkatan */}
        <p className="font-bold">{flightData.departureTime}</p>
        <p>{flightData.departureDate}</p>
        <p>{flightData.departureAirportName}</p>

        <div className="mt-2 mb-2 font-semibold">
          {flightData.planeName} - {flightData.seatClassName}
        </div>
        <p>{flightData.planeCode}</p>

        <p className="flex items-center mt-2">
          <span className="mr-2">🌿</span>
          <strong>Informasi:</strong>
        </p>
        <ul className="pl-5 list-disc">
          <li>Baggage {flightData.baggage} kg</li>
          <li>Cabin baggage {flightData.cabinBaggage} kg</li>
          <li>{flightData.description}</li>
        </ul>

        {/* Kedatangan */}
        <p className="mt-4 font-bold">{flightData.arrivalTime}</p>
        <p>{flightData.arrivalDate}</p>
        <p>{flightData.arrivalAirportName}</p>

        {/* Rincian Harga */}
        <div className="pt-4 mt-4 border-t">
          <p className="font-semibold">Rincian Harga</p>
          <p>
            2 Adults{" "}
            <span className="float-right">
              IDR {flightData?.priceAdult?.toLocaleString()}
            </span>
          </p>
          <p>
            1 Child{" "}
            <span className="float-right">
              IDR {flightData?.priceChild?.toLocaleString()}
            </span>
          </p>
          <p>
            1 Baby{" "}
            <span className="float-right">
              IDR {flightData?.priceBaby?.toLocaleString()}
            </span>
          </p>
          <p>
            Tax{" "}
            <span className="float-right">
              IDR {flightData.tax.toLocaleString()}
            </span>
          </p>
          <p className="mt-2 font-bold">
            Total{" "}
            <span className="float-right text-purple-600">
              IDR{" "}
              {(
                flightData.priceAdult +
                flightData.priceChild +
                flightData.priceBaby +
                flightData.tax
              ).toLocaleString()}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

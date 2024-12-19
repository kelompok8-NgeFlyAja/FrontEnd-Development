import React, { useState, useEffect } from "react";

export const FlightDetail = () => {
  const [flightData, setFlightData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchFlightDetails = async () => {
      try {
        console.log("Fetching flight details...");
        const response = await fetch(
          "https://ngeflyaja.shop/ticket-details?flightId=1&ap=2&cp=1&bp=1"
        );

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
    <div className="border rounded-lg p-6 shadow-md">
      <h2 className="font-bold text-xl mb-4">Detail Penerbangan</h2>
      <div className="text-sm">
        {/* Keberangkatan */}
        <p className="font-bold">{flightData.departureTime}</p>
        <p>{flightData.departureDate}</p>
        <p>{flightData.departureAirportName}</p>

        <div className="font-semibold mt-2 mb-2">
          {flightData.planeName} - {flightData.seatClassName}
        </div>
        <p>{flightData.planeCode}</p>

        <p className="flex items-center mt-2">
          <span className="mr-2">🌿</span>
          <strong>Informasi:</strong>
        </p>
        <ul className="list-disc pl-5">
          <li>Baggage {flightData.baggage} kg</li>
          <li>Cabin baggage {flightData.cabinBaggage} kg</li>
          <li>{flightData.description}</li>
        </ul>

        {/* Kedatangan */}
        <p className="font-bold mt-4">{flightData.arrivalTime}</p>
        <p>{flightData.arrivalDate}</p>
        <p>{flightData.arrivalAirportName}</p>

        {/* Rincian Harga */}
        <div className="mt-4 border-t pt-4">
          <p className="font-semibold">Rincian Harga</p>
          <p>
            2 Adults{" "}
            <span className="float-right">
              IDR {flightData.priceAdult.toLocaleString()}
            </span>
          </p>
          <p>
            1 Child{" "}
            <span className="float-right">
              IDR {flightData.priceChild.toLocaleString()}
            </span>
          </p>
          <p>
            1 Baby{" "}
            <span className="float-right">
              IDR {flightData.priceBaby.toLocaleString()}
            </span>
          </p>
          <p>
            Tax{" "}
            <span className="float-right">
              IDR {flightData.tax.toLocaleString()}
            </span>
          </p>
          <p className="font-bold mt-2">
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

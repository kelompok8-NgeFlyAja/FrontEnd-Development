import React from "react";

export const FlightDetail = () => {
  return (
    <div className="border rounded-lg p-6 shadow-md">
      <h2 className="font-bold text-xl mb-4">Detail Penerbangan</h2>
      <div className="text-sm">
        {/* Keberangkatan */}
        <p className="font-bold">07:00</p>
        <p>3 Maret 2023</p>
        <p>Soekarno Hatta - Terminal 1A Domestik</p>

        <div className="font-semibold mt-2 mb-2">Jet Air - Economy</div>
        <p>JT - 203</p>

        <p className="flex items-center mt-2">
          <span className="mr-2">🌿</span>
          <strong>Informasi:</strong>
        </p>
        <ul className="list-disc pl-5">
          <li>Baggage 20 kg</li>
          <li>Cabin baggage 7 kg</li>
          <li>In Flight Entertainment</li>
        </ul>

        {/* Kedatangan */}
        <p className="font-bold mt-4">11:00</p>
        <p>3 Maret 2023</p>
        <p>Melbourne International Airport</p>

        {/* Rincian Harga */}
        <div className="mt-4 border-t pt-4">
          <p className="font-semibold">Rincian Harga</p>
          <p>
            2 Adults <span className="float-right">IDR 9.550.000</span>
          </p>
          <p>
            1 Baby <span className="float-right">IDR 0</span>
          </p>
          <p>
            Tax <span className="float-right">IDR 300.000</span>
          </p>
          <p className="font-bold mt-2">
            Total{" "}
            <span className="float-right text-purple-600">IDR 9.850.000</span>
          </p>
        </div>
      </div>
    </div>
  );
};

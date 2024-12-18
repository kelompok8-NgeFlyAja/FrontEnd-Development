import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const SeatSelection = () => {
  const [seats, setSeats] = useState({});
  const [selectedSeats, setSelectedSeats] = useState([]); // Menyimpan kursi yang dipilih
  const [currentPassenger, setCurrentPassenger] = useState(0); // Penumpang aktif
  const totalPassengers = 3; // Total jumlah penumpang

  // Fetch Data
  useEffect(() => {
    fetch("https://ngeflyaja.shop/plane-seat/1")
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success") setSeats(data.data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const handleSelectSeat = (seatNumber) => {
    setSelectedSeats((prevSeats) => {
      const updatedSeats = [...prevSeats];
      updatedSeats[currentPassenger] = seatNumber; // Menyimpan kursi untuk penumpang aktif
      return updatedSeats;
    });

    // Pindah ke penumpang berikutnya jika belum selesai
    if (currentPassenger < totalPassengers - 1) {
      setCurrentPassenger((prev) => prev + 1);
    }
  };

  const renderSeats = () => {
    const rows = Array.from({ length: 12 }, (_, i) => i + 1);
    const columnsLeft = ["A", "B", "C"];
    const columnsRight = ["D", "E", "F"];

    return rows.map((row) => (
      <div
        key={row}
        className="flex items-center justify-center gap-10 mb-2 text-center"
      >
        {/* Kursi Kiri */}
        <div className="flex gap-4">
          {columnsLeft.map((col) => renderSeat(row, col))}
        </div>

        {/* Row Number */}
        <div className="w-[1px] rounded flex items-center justify-center">
          {row}
        </div>

        {/* Kursi Kanan */}
        <div className="flex gap-4">
          {columnsRight.map((col) => renderSeat(row, col))}
        </div>
      </div>
    ));
  };

  const renderSeat = (row, col) => {
    const seatNumber = `${row}${col}`;
    const seat = seats[col]?.find((s) => s.seatNumber === seatNumber);

    const isAvailable = seat?.isAvailable;
    const isSelectedIndex = selectedSeats.indexOf(seatNumber);
    const isSelected = isSelectedIndex !== -1;

    const bgColor = !isAvailable
      ? "bg-gray-300" // Tidak tersedia
      : isSelected
      ? "bg-purple-700 text-white" // Dipilih
      : "bg-green-500"; // Tersedia

    return (
      <div
        key={seatNumber}
        onClick={() => isAvailable && handleSelectSeat(seatNumber)}
        className={`w-[50px] h-[50px] rounded flex items-center justify-center font-bold cursor-pointer ${bgColor}`}
      >
        {!isAvailable ? "X" : isSelected ? `P${isSelectedIndex + 1}` : ""}
      </div>
    );
  };

  return (
    <Card className="max-w-2xl mx-auto mt-10">
      <CardHeader>
        <CardTitle>Pilih Kursi</CardTitle>
      </CardHeader>
      <CardContent>
        {/* Header Kursi */}
        <div className="flex justify-center gap-10 mb-4">
          <div className="flex gap-4">
            {["A", "B", "C"].map((col) => (
              <div
                key={col}
                className="w-[50px] text-center font-bold flex items-center justify-center"
              >
                {col}
              </div>
            ))}
          </div>
          <div className="w-10"></div>
          <div className="flex gap-4">
            {["D", "E", "F"].map((col) => (
              <div
                key={col}
                className="w-[50px] text-center font-bold flex items-center justify-center"
              >
                {col}
              </div>
            ))}
          </div>
        </div>

        {/* Kursi */}
        {Object.keys(seats).length > 0 ? (
          renderSeats()
        ) : (
          <p>Loading seats...</p>
        )}
      </CardContent>
    </Card>
  );
};

export default SeatSelection;

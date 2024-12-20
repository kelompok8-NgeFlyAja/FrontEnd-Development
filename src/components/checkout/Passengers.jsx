import React, { useState, useEffect } from "react";
import { Switch } from "@/components/ui/switch";
import { useSearchParams } from "react-router-dom";

const titles = ["Mr.", "Mrs.", "Ms."];
const countries = ["Indonesia", "United States", "Singapore", "Japan"];

export const Passenger = () => {
  const [searchParams] = useSearchParams();
  const [passengers, setPassengers] = useState([]);

  useEffect(() => {
    // Parse query parameters
    const adultCount = parseInt(searchParams.get("ap") || "0");
    const childCount = parseInt(searchParams.get("cp") || "0");
    const babyCount = parseInt(searchParams.get("bp") || "0");

    // Generate passenger data
    const allPassengers = [
      ...Array(adultCount).fill({ type: "Adult", hasFamilyName: false }),
      ...Array(childCount).fill({ type: "Child", hasFamilyName: false }),
      ...Array(babyCount).fill({ type: "Baby", hasFamilyName: false }),
    ];
    setPassengers(allPassengers);
  }, [searchParams]);

  return (
    <div className="border rounded-lg p-6 shadow-md mt-10">
      <h1 className="text-2xl font-bold mb-6">Isi Data Penumpang</h1>
      {passengers.map((passenger, index) => (
        <div key={index} className="mt-6">
          <div className="flex h-10 items-center gap-2 self-stretch [background:var(--Neutral-04,#3C3C3C)] px-4 py-2 mb-4 rounded-t-lg">
            <h2 className="font-bold text-white text-xs">
              Data Diri Penumpang {index + 1} - ({passenger.type})
            </h2>
          </div>

          {/* Title */}
          <div className="mb-4">
            <label className="block font-semibold mb-1 text-sm">Title</label>
            <select className="w-full border rounded-md p-2">
              {titles.map((title, idx) => (
                <option key={idx} value={title}>
                  {title}
                </option>
              ))}
            </select>
          </div>

          {/* Nama Lengkap */}
          <div className="mb-4">
            <label className="block font-semibold mb-1 text-sm">
              Nama Lengkap
            </label>
            <input
              type="text"
              placeholder="Contoh: Harry"
              className="w-full border rounded-md p-2"
            />
          </div>

          {/* Switch Nama Keluarga */}
          <div className="flex items-center justify-between mb-4">
            <label className="block font-semibold text-sm">
              Punya Nama Keluarga?
            </label>
            <Switch
              checked={passenger.hasFamilyName}
              onCheckedChange={(checked) => {
                const updatedPassengers = [...passengers];
                updatedPassengers[index].hasFamilyName = checked;
                setPassengers(updatedPassengers);
              }}
            />
          </div>

          {/* Input Nama Keluarga */}
          {passenger.hasFamilyName && (
            <div className="mb-4">
              <label className="block font-semibold mb-1 text-sm">
                Nama Keluarga
              </label>
              <input
                type="text"
                placeholder="Contoh: Potter"
                className="w-full border rounded-md p-2"
              />
            </div>
          )}

          {/* Tanggal Lahir */}
          <div className="mb-4">
            <label className="block font-semibold mb-1 text-sm">
              Tanggal Lahir
            </label>
            <input type="date" className="w-full border rounded-md p-2" />
          </div>

          {/* Kewarganegaraan */}
          <div className="mb-4">
            <label className="block font-semibold mb-1 text-sm">
              Kewarganegaraan
            </label>
            <input
              type="text"
              placeholder="Indonesia"
              className="w-full border rounded-md p-2"
            />
          </div>

          {/* KTP & Paspor */}
          <div className="mb-4">
            <label className="block font-semibold mb-1 text-sm">
              KTP & Paspor
            </label>
            <input
              type="text"
              placeholder="Nomor Dokumen"
              className="w-full border rounded-md p-2"
            />
          </div>

          {/* Negara Penerbit */}
          <div className="mb-4">
            <label className="block font-semibold mb-1 text-sm">
              Negara Penerbit
            </label>
            <select className="w-full border rounded-md p-2">
              {countries.map((country, idx) => (
                <option key={idx} value={country}>
                  {country}
                </option>
              ))}
            </select>
          </div>

          {/* Berlaku Sampai */}
          <div className="mb-4">
            <label className="block font-semibold mb-1 text-sm">
              Berlaku Sampai
            </label>
            <input type="date" className="w-full border rounded-md p-2" />
          </div>
        </div>
      ))}
    </div>
  );
};

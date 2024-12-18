import React, { useState } from "react";
import { Switch } from "@/components/ui/switch"; // Pastikan komponen Switch dari shadcn sudah di-import dengan benar.
import { Card } from "@/components/ui/card";

export const FillData = ({ handleSaveData }) => {
  const [hasFamilyName, setHasFamilyName] = useState(false);

  return (
    <div className="flex justify-center items-center w-full py-8">
      <div className="flex flex-col md:flex-row gap-8 max-w-[900px] w-full px-4">
        {/* Isi Data Pemesan */}
        <div className="flex-[2]">
          <div className="border rounded-lg p-6 shadow-md">
            <h2 className="font-bold text-xl mb-4">Isi Data Pemesan</h2>

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
                checked={hasFamilyName}
                onCheckedChange={(checked) => setHasFamilyName(checked)}
              />
            </div>

            {/* Input Nama Keluarga */}
            {hasFamilyName && (
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

            {/* Nomor Telepon */}
            <div className="mb-4">
              <label className="block font-semibold mb-1 text-sm">
                Nomor Telepon
              </label>
              <input
                type="text"
                placeholder="Contoh: 08123456789"
                className="w-full border rounded-md p-2"
              />
            </div>

            {/* Email */}
            <div className="mb-4">
              <label className="block font-semibold mb-1 text-sm">Email</label>
              <input
                type="email"
                placeholder="Contoh: johndoe@gmail.com"
                className="w-full border rounded-md p-2"
              />
            </div>
          </div>

          <button
            onClick={handleSaveData}
            className="bg-[#7126B5] text-white py-3 mt-4 px-4 rounded-lg w-full"
          >
            Simpan
          </button>
        </div>

        {/* Detail Penerbangan */}
        <div className="flex-[1] border rounded-lg p-6 shadow-md">
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
                <span className="float-right text-purple-600">
                  IDR 9.850.000
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

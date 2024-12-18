import React, { useState } from "react";
import { Switch } from "@/components/ui/switch";

export const BillingDetail = () => {
  const [hasFamilyName, setHasFamilyName] = useState(false);

  return (
    <div>
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
    </div>
  );
};

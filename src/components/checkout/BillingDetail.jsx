import React, { useState } from "react";
import { Switch } from "@/components/ui/switch";

export const BillingDetail = ({ billingDetails, setBillingDetails }) => {
  const handleChange = (field, value) => {
    setBillingDetails((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const [email, setEmail] = useState("");

  const validateEmail = (email) => {
    const re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

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
            value={billingDetails?.name || ""}
            onChange={(e) => handleChange("name", e.target.value)}
            className="w-full border rounded-md p-2"
          />
        </div>

        {/* Switch Nama Keluarga */}
        <div className="flex items-center justify-between mb-4">
          <label className="block font-semibold text-sm">
            Punya Nama Keluarga?
          </label>
          <Switch
            checked={!!billingDetails?.hasFamilyName}
            onCheckedChange={(checked) =>
              handleChange("hasFamilyName", checked)
            }
          />
        </div>

        {/* Input Nama Keluarga */}
        {billingDetails?.hasFamilyName && (
          <div className="mb-4">
            <label className="block font-semibold mb-1 text-sm">
              Nama Keluarga
            </label>
            <input
              type="text"
              placeholder="Contoh: Potter"
              value={billingDetails?.familyName || ""}
              onChange={(e) => handleChange("familyName", e.target.value)}
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
            value={billingDetails?.phone || ""}
            onChange={(e) => handleChange("phone", e.target.value)}
            className="w-full border rounded-md p-2"
          />
        </div>

        {/* Email */}
        <div className="mb-4">
          <div className="flex items-center gap-1">
            <label className="block font-semibold mb-1 text-sm">Email</label>
            {email && !validateEmail(email) && (
              <p className="font-semibold mb-1 text-sm text-red-500">
                Email is not valid
              </p>
            )}
          </div>
          <input
            type="email"
            placeholder="Contoh: johndoe@gmail.com"
            value={billingDetails?.email || ""}
            onChange={(e) => {
              setEmail(e.target.value);
              handleChange("email", e.target.value);
            }}
            className="w-full border rounded-md p-2"
          />
        </div>
      </div>
    </div>
  );
};

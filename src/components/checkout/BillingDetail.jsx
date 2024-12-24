import React from "react";
import { Switch } from "@/components/ui/switch";

export const BillingDetail = ({
  billingDetails,
  setBillingDetails,
  readOnly,
}) => {
  const handleChange = (field, value) => {
    if (!readOnly) {
      setBillingDetails((prev) => ({
        ...prev,
        [field]: value,
      }));
    }
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
            disabled={readOnly}
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
            disabled={readOnly}
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
              disabled={readOnly}
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
            disabled={readOnly}
          />
        </div>

        {/* Email */}
        <div className="mb-4">
          <label className="block font-semibold mb-1 text-sm">Email</label>
          <input
            type="email"
            placeholder="Contoh: johndoe@gmail.com"
            value={billingDetails?.email || ""}
            onChange={(e) => handleChange("email", e.target.value)}
            className="w-full border rounded-md p-2"
            disabled={readOnly}
          />
        </div>
      </div>
    </div>
  );
};

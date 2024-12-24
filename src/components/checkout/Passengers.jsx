import React, { useEffect, useState } from "react";
import { Switch } from "@/components/ui/switch";
import { useSearchParams } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";

const titles = ["Mr.", "Mrs.", "Ms."];
const countries = ["Indonesia", "United States", "Singapore", "Japan"];

export const Passenger = ({
  passengerDetails,
  setPassengersDetails,
  readOnly,
}) => {
  const [searchParams] = useSearchParams();
  const { control, handleSubmit, watch } = useForm();
  const [passengers, setPassengers] = useState([]);

  useEffect(() => {
    const adultCount = parseInt(searchParams.get("adultPassenger") || "0");
    const childCount = parseInt(searchParams.get("childPassenger") || "0");
    const babyCount = parseInt(searchParams.get("babyPassenger") || "0");

    const allPassengers = [
      ...Array(adultCount).fill({ type: "Adult", hasFamilyName: false }),
      ...Array(childCount).fill({ type: "Child", hasFamilyName: false }),
      ...Array(babyCount).fill({ type: "Baby", hasFamilyName: false }),
    ];
    setPassengers(allPassengers);
  }, [searchParams]);

  // Update `setPassengersDetails` whenever `passengers` changes
  useEffect(() => {
    if (!readOnly) {
      const subscription = watch((value) => {
        const updatedPassengers = passengerDetails.map((passenger, index) => ({
          ...passenger,
          ...value.passengers[index],
        }));

        setPassengersDetails(updatedPassengers);
      });

      return () => subscription.unsubscribe();
    }
    setPassengers(passengerDetails);
  }, [watch, setPassengersDetails, passengerDetails, readOnly]);

  const onSubmit = (data) => {
    console.log(data);
    // You can handle the form submission here if needed
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="p-6 mt-10 border rounded-lg shadow-md"
    >
      <h1 className="mb-6 text-2xl font-bold">Isi Data Penumpang</h1>
      {passengers.map((passenger, index) => (
        <div key={index} className="mt-6">
          <div className="flex h-10 items-center gap-2 self-stretch [background:var(--Neutral-04,#3C3C3C)] px-4 py-2 mb-4 rounded-t-lg">
            <h2 className="text-xs font-bold text-white">
              Data Diri Penumpang {index + 1} - ({passenger.type})
            </h2>
          </div>

          {/* Title */}
          <div className="mb-4">
            <label className="block mb-1 text-sm font-semibold">Title</label>
            <Controller
              name={`passengers.${index}.title`}
              control={control}
              render={({ field }) => (
                <select
                  {...field}
                  className="w-full p-2 border rounded-md"
                  disabled={readOnly}
                >
                  {readOnly ? (
                    <option value={passenger.title} disabled selected>
                      {passenger.title}
                    </option>
                  ) : (
                    <option value="" disabled selected>
                      Please select
                    </option>
                  )}
                  {!readOnly &&
                    titles.map((title, idx) => (
                      <option key={idx} value={title}>
                        {title}
                      </option>
                    ))}
                </select>
              )}
            />
          </div>

          {/* Nama Lengkap */}
          <div className="mb-4">
            <label className="block mb-1 text-sm font-semibold">
              Nama Lengkap
            </label>
            <Controller
              name={`passengers.${index}.fullName`}
              control={control}
              render={({ field }) => (
                <input
                  type="text"
                  placeholder="Contoh: Harry"
                  className="w-full p-2 border rounded-md"
                  {...field}
                  value={readOnly ? passenger.fullName : field.value}
                  readOnly={readOnly}
                />
              )}
            />
          </div>

          {/* Switch Nama Keluarga */}
          <div className="flex items-center justify-between mb-4">
            <label className="block text-sm font-semibold">
              Punya Nama Keluarga?
            </label>
            <Controller
              name={`passengers.${index}.hasFamilyName`}
              control={control}
              render={({ field }) => (
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              )}
            />
          </div>

          {/* Input Nama Keluarga */}
          {passenger.hasFamilyName && (
            <div className="mb-4">
              <label className="block mb-1 text-sm font-semibold">
                Nama Keluarga
              </label>
              <Controller
                name={`passengers.${index}.familyName`}
                control={control}
                render={({ field }) => (
                  <input
                    type="text"
                    placeholder="Contoh: Potter"
                    className="w-full p-2 border rounded-md"
                    {...field}
                  />
                )}
              />
            </div>
          )}

          {/* Tanggal Lahir */}
          <div className="mb-4">
            <label className="block mb-1 text-sm font-semibold">
              Tanggal Lahir
            </label>
            <Controller
              name={`passengers.${index}.birthDate`}
              control={control}
              render={({ field }) => (
                <input
                  type="date"
                  className="w-full p-2 border rounded-md"
                  {...field}
                  value={readOnly ? passenger.birthDate : field.value} // Gunakan nilai dari passenger.birthDate jika readOnly
                  readOnly={readOnly} // Tambahkan atribut readOnly
                />
              )}
            />
          </div>

          {/* Kewarganegaraan */}
          <div className="mb-4">
            <label className="block mb-1 text-sm font-semibold">
              Kewarganegaraan
            </label>
            <Controller
              name={`passengers.${index}.nationality`}
              control={control}
              render={({ field }) => (
                <input
                  type="text"
                  placeholder="Indonesia"
                  className="w-full p-2 border rounded-md"
                  {...field}
                  value={readOnly ? passenger.nationality : field.value} // Gunakan nilai dari passenger.nationality jika readOnly
                  readOnly={readOnly} // Tambahkan atribut readOnly
                />
              )}
            />
          </div>

          {/* KTP & Paspor */}
          <div className="mb-4">
            <label className="block mb-1 text-sm font-semibold">
              KTP & Paspor
            </label>
            <Controller
              name={`passengers.${index}.documentNumber`}
              control={control}
              render={({ field }) => (
                <input
                  type="text"
                  placeholder="Nomor Dokumen"
                  className="w-full p-2 border rounded-md"
                  {...field}
                  value={readOnly ? passenger.documentNumber : field.value} // Gunakan nilai dari passenger.documentNumber jika readOnly
                  readOnly={readOnly} // Tambahkan atribut readOnly
                />
              )}
            />
          </div>

          {/* Negara Penerbit */}
          <div className="mb-4">
            <label className="block mb-1 text-sm font-semibold">
              Negara Penerbit
            </label>
            <Controller
              name={`passengers.${index}.documentIssuer`}
              control={control}
              render={({ field }) => (
                <select
                  {...field}
                  className="w-full p-2 border rounded-md"
                  defaultValue={readOnly ? passenger.documentIssuer : ""}
                  disabled={readOnly}
                >
                  <option value="" disabled>
                    Please select
                  </option>
                  {countries.map((country, idx) => (
                    <option key={idx} value={country}>
                      {country}
                    </option>
                  ))}
                </select>
              )}
            />
          </div>

          {/* Berlaku Sampai */}
          <div className="mb-4">
            <label className="block mb-1 text-sm font-semibold">
              Berlaku Sampai
            </label>
            <Controller
              name={`passengers.${index}.validUntil`}
              control={control}
              render={({ field }) => (
                <input
                  type="date"
                  className="w-full p-2 border rounded-md"
                  {...field}
                  value={readOnly ? passenger.validUntil : field.value} // Gunakan nilai dari passenger.validUntil jika readOnly
                  readOnly={readOnly} // Tambahkan atribut readOnly
                />
              )}
            />
          </div>
        </div>
      ))}
    </form>
  );
};

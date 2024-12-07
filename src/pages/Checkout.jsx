import React, { useEffect, useState } from "react";
import Seats from "@/components/chart/Seats";
import CheckoutCards from "@/components/chart/CheckoutCards";
import CheckoutForm from "@/components/chart/CheckoutForm";
import CheckoutInput from "@/components/chart/CheckoutInput";
import CheckoutDropdown from "@/components/chart/CheckoutDropdown";
import { AnimatePresence, motion } from "framer-motion";
import FlightDetails from "@/components/chart/FlightDetails";
import { flightDetails } from "@/lib/flightDummy";
import Navbar from "@/components/Navbar";
import CheckoutAlert from "@/components/chart/CheckoutAlert";
import Breadcrumbs from "@/components/chart/Breadcrumbs";
import { passenger } from "@/lib/generatePassenger";
import CheckoutPricing from "@/components/chart/CheckoutPricing";
import { getSeats } from "@/lib/seatsDummy";
import { FormProvider, useForm } from "react-hook-form";

const Checkout = () => {
  const [datas, setDatas] = useState([]);
  const [isCustomerFamilyName, setIsCustomerFamilyName] = useState(false);
  const [isPassengerFamilyName, setIsPassengerFamilyName] = useState([]);
  const [flightDetail, setFlightDetail] = useState([]);
  const [isDataSaved, setIsDataSaved] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [passengerInfo, setPassengerInfo] = useState([]);
  const methods = useForm();

  const onSubmit = methods.handleSubmit((data) => {
    const passengersData = [];
    let customerData = {};

    for (const key in data) {
      if (key.startsWith("customer")) {
        customerData[key] = data[key];
        continue;
      }
      const index = key.split("_")[1];

      if (!passengersData[index]) {
        passengersData[index] = {};
      }

      passengersData[index][key.split("_")[0]] = data[key];
    }

    const objectData = {
      customerData,
      passengersData: passengersData,
    };
  });

  useEffect(() => {
    try {
      getSeats()
        .then((res) => setDatas(res))
        .catch((err) => console.log(err));
    } catch (error) {
      console.log(err);
    }

    setFlightDetail(flightDetails());
    setPassengerInfo(passenger.sort());
  }, []);

  function handleCustomerBtn() {
    if (isCustomerFamilyName) {
      setIsCustomerFamilyName(false);
    } else {
      setIsCustomerFamilyName(true);
    }
  }

  function handlePassengerBtn(id) {
    setIsPassengerFamilyName((prev) =>
      prev.map((item, index) => (index === id ? !item : item))
    );
  }

  return (
    <>
      <Navbar isLogin={isLogin} />
      <Breadcrumbs isPayment={isDataSaved} isSuccess={false} />

      {isDataSaved ? (
        <CheckoutAlert type="Success" message="Data anda berhasil disimpan!" />
      ) : (
        <CheckoutAlert type="Danger" message="Selesaikan dalam 00:15:00" />
      )}

      <div className="my-5 flex flex-col lg:flex-row md:justify-center md:items-center lg:items-start lg:justify-center gap-10">
        <FormProvider {...methods}>
          <form onSubmit={(e) => e.preventDefault()} noValidate>
            <div className="flex flex-col gap-10">
              {/* Form Data Customer */}
              <div className="flex flex-col gap-10 px-2">
                <CheckoutCards>
                  <h3 className="text-xl font-bold mb-4"> Isi Data Pemesan </h3>
                  <CheckoutForm title="Data Diri Pemesan" isSaved={isDataSaved}>
                    <CheckoutInput
                      label="Nama Lengkap"
                      placeholder="Harry"
                      name="customerFullName"
                      type="text"
                      validation={{
                        required: {
                          value: true,
                          message: "Harap isi input ini!",
                        },
                      }}
                      isSaved={isDataSaved}
                    />
                    <div className="flex justify-between px-4">
                      <p> Punya nama keluarga? </p>
                      <div className="relative">
                        <input
                          type="checkbox"
                          onClick={handleCustomerBtn}
                          disabled={isDataSaved}
                          className="absolute left-1/2 -translate-x-1/2 w-full h-full peer appearance-none rounded-md"
                        />
                        <span className="w-10 h-6 flex items-center flex-shrink-0 ml-4 p-1 bg-slate-300  rounded-full duration-300 ease-in-out peer-checked:bg-[#4B1979] after:w-4 after:h-4 after:bg-white after:rounded-full after:shadow-md after:duration-300 peer-checked:after:translate-x-4 group-hover:after:translate-x-1"></span>
                      </div>
                    </div>
                    <AnimatePresence>
                      {isCustomerFamilyName && (
                        <motion.div
                          key="customerFamilyInput"
                          initial={{ translateY: -10 }}
                          animate={{ translateY: 0 }}
                          transition={{
                            duration: 0.3,
                          }}
                        >
                          <CheckoutInput
                            label="Nama Keluarga"
                            placeholder="Potter"
                            name="customerFamilyName"
                            type="text"
                            isSaved={isDataSaved}
                          />
                        </motion.div>
                      )}
                      <motion.div layout transition={{ duration: 0.3 }}>
                        <CheckoutInput
                          label="Nomor Telepon"
                          placeholder="081217177979"
                          name="customerPhoneNumber"
                          type="number"
                          validation={{
                            required: {
                              value: true,
                              message: "Harap isi input ini!",
                            },
                          }}
                          isSaved={isDataSaved}
                        />
                        <CheckoutInput
                          label="Email"
                          placeholder="johndoe@gmail.com"
                          name="customerEmail"
                          type="email"
                          validation={{
                            required: {
                              value: true,
                              message: "Harap isi input ini!",
                            },
                          }}
                          isSaved={isDataSaved}
                        />
                      </motion.div>
                    </AnimatePresence>
                  </CheckoutForm>
                </CheckoutCards>
                {/* Batas Form Data Customer */}

                {/* Form Data Penumpang (di map berdasarkan jumlah tiket yang dipesan) */}
                {passengerInfo.length > 0 && (
                  <CheckoutCards>
                    <h3 className="text-xl font-bold mb-4">
                      Isi Data Penumpang
                    </h3>
                    <div className="flex flex-col gap-7">
                      {passengerInfo.map((item, index) => (
                        <CheckoutForm
                          key={`checkoutForm_${index}`}
                          title={`Data Diri Penumpang ${index + 1} - ${item}`}
                          isSaved={isDataSaved}
                        >
                          <CheckoutInput
                            label="Nama Lengkap"
                            placeholder="Harry"
                            name={`fullname_${index}`}
                            type="text"
                            validation={{
                              required: {
                                value: true,
                                message: "Harap isi input ini!",
                              },
                            }}
                            isSaved={isDataSaved}
                          />
                          <div className="flex justify-between px-4 items-center">
                            <p> Punya nama keluarga? </p>
                            <div className="relative">
                              <input
                                type="checkbox"
                                onClick={() => handlePassengerBtn(index)}
                                className="absolute left-1/2 -translate-x-1/2 w-full h-full peer appearance-none rounded-md"
                                disabled={isDataSaved}
                              />
                              <span className="w-10 h-6 flex items-center flex-shrink-0 ml-4 p-1 bg-slate-300  rounded-full duration-300 ease-in-out peer-checked:bg-[#4B1979] after:w-4 after:h-4 after:bg-white after:rounded-full after:shadow-md after:duration-300 peer-checked:after:translate-x-4 group-hover:after:translate-x-1"></span>
                            </div>
                          </div>
                          <AnimatePresence>
                            {isPassengerFamilyName[index] && (
                              <motion.div
                                key={`passengerFamilyInput_${index}`}
                                initial={{ translateY: -10 }}
                                animate={{ translateY: 0 }}
                                transition={{
                                  duration: 0.3,
                                }}
                              >
                                <CheckoutInput
                                  label="Nama Keluarga"
                                  placeholder="Potter"
                                  type="text"
                                  name={`familyName_${index}`}
                                  isSaved={isDataSaved}
                                />
                              </motion.div>
                            )}
                            <motion.div layout transition={{ duration: 0.3 }}>
                              <CheckoutInput
                                label="Tanggal Lahir"
                                placeholder="dd/mm/yy"
                                type="date"
                                name={`birthDate_${index}`}
                                validation={{
                                  required: {
                                    value: true,
                                    message: "Harap isi input ini!",
                                  },
                                }}
                                isSaved={isDataSaved}
                              />
                              <CheckoutInput
                                label="Kewarnegaraan"
                                placeholder="Indonesia"
                                type="text"
                                name={`citizenship_${index}`}
                                validation={{
                                  required: {
                                    value: true,
                                    message: "Harap isi input ini!",
                                  },
                                }}
                                isSaved={isDataSaved}
                              />
                              <CheckoutInput
                                label="KTP/Paspor"
                                placeholder="Masukkan Nomor Paspor"
                                type="text"
                                name={`citizenship_${index}`}
                                validation={{
                                  required: {
                                    value: true,
                                    message: "Harap isi input ini!",
                                  },
                                }}
                                isSaved={isDataSaved}
                              />
                              <CheckoutInput
                                label="Negara Penerbit"
                                placeholder="Indonesia"
                                type="text"
                                name={`issuingCountry_${index}`}
                                validation={{
                                  required: {
                                    value: true,
                                    message: "Harap isi input ini!",
                                  },
                                }}
                                isSaved={isDataSaved}
                              />
                              <CheckoutInput
                                label="Berlaku Sampai"
                                type="date"
                                name={`birthDate_${index}`}
                                validation={{
                                  required: {
                                    value: true,
                                    message: "Harap isi input ini!",
                                  },
                                }}
                                isSaved={isDataSaved}
                              />
                            </motion.div>
                          </AnimatePresence>
                        </CheckoutForm>
                      ))}
                    </div>
                  </CheckoutCards>
                )}
                {/* Batas Form Data Passenger */}
              </div>
              <div className="flex flex-col gap-5 px-2">
                <CheckoutCards>
                  <Seats
                    datas={datas}
                    maxSeatsSelected={passengerInfo.length}
                  />
                </CheckoutCards>
                <button
                  className={`py-4 text-center w-full ${
                    isDataSaved ? "bg-[#D0D0D0]" : "bg-[#7126B5]"
                  }  rounded-xl text-white shadow-xl text-xl font-semibold transition-all`}
                  // disabled={isDataSaved}
                  onClick={onSubmit}
                >
                  Simpan
                </button>
              </div>
            </div>
          </form>
        </FormProvider>
        <div className="px-5 lg:px-0">
          <FlightDetails
            flightDetail={flightDetail}
            isSavedData={isDataSaved}
          />
          <CheckoutPricing passengerInfo={passengerInfo} />
          {isDataSaved && (
            <button className="bg-[#FF0000] font-medium py-4 w-full text-white rounded-xl mt-4">
              Lanjut Bayar
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default Checkout;

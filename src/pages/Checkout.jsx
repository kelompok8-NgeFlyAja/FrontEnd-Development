import React, { useEffect, useState } from "react";
import Seats from "../components/Seats";
import CheckoutCards from "../components/CheckoutCards";
import CheckoutForm from "../components/CheckoutForm";
import CheckoutInput from "../components/CheckoutInput";
import { AnimatePresence, motion } from "framer-motion";
import FlightDetails from "../components/FlightDetails";
import { flightDetails } from "../lib/flightDummy";
import { getSeatsData } from "../lib/seatsDummy";
import Navbar from "../components/Navbar";
import CheckoutAlert from "../components/CheckoutAlert";
import Breadcrumbs from "../components/Breadcrumbs";

const Checkout = () => {
  const [datas, setDatas] = useState([]);
  const [isCustomerFamilyName, setIsCustomerFamilyName] = useState(false);
  const [isPassengerFamilyName, setIsPassengerFamilyName] = useState([]);
  const [flightDetail, setFlightDetail] = useState([]);
  const [isDataSaved, setIsDataSaved] = useState(false);

  useEffect(() => {
    setDatas(getSeatsData());
    setFlightDetail(flightDetails());

    // Kurang Dinamis
    setIsPassengerFamilyName(new Array(2).fill(false));
  }, []);

  function handleCustomerBtn() {
    if (isCustomerFamilyName) {
      setIsCustomerFamilyName(false);
    } else {
      setIsCustomerFamilyName(true);
    }
  }
  // Menampilkan Form Keluarga Tiap Masing - Masing Form
  function handlePassengerBtn(id) {
    setIsPassengerFamilyName((prev) =>
      prev.map((item, index) => (index === id ? !item : item))
    );
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log("Form Submitted!");
  }

  return (
    <>
      <Navbar /> {/* Default value set to false */}
      <Breadcrumbs isPayment={false} isSuccess={false} /> {/* Default values */}
      {/* You can adjust the message based on your conditions */}
      <CheckoutAlert type="Danger" message="Selesaikan dalam 00:15:00" />
      {isDataSaved && (
        <CheckoutAlert type="Success" message="Data anda berhasil disimpan!" />
      )}
      <div className="my-5 flex justify-center gap-10">
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-10">
            {/*  Data Customer */}
            <CheckoutCards>
              <h3 className="text-xl font-bold mb-4"> Isi Data Pemesan </h3>
              <CheckoutForm title="Data Diri Pemesan" isSaved={false}>
                {" "}
                {/* Default value */}
                <CheckoutInput label="Nama Lengkap" placeholder="Harry" />
                <div className="flex justify-between px-4">
                  <p> Punya nama keluarga? </p>
                  <div className="relative">
                    <input
                      type="checkbox"
                      onClick={handleCustomerBtn}
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
                        name="familyName"
                      />
                    </motion.div>
                  )}
                  <motion.div layout transition={{ duration: 0.3 }}>
                    <CheckoutInput
                      label="Nomor Telepon"
                      placeholder="081217177979"
                    />
                    <CheckoutInput
                      label="Email"
                      placeholder="Contoh:johndoe@gmail.com"
                    />
                  </motion.div>
                </AnimatePresence>
              </CheckoutForm>
            </CheckoutCards>
            {/* Form Data Penumpang */}
            <CheckoutCards>
              <h3 className="text-xl font-bold mb-4"> Isi Data Penumpang </h3>
              <div className="flex flex-col gap-7">
                {/* Penumpang 1 */}
                <CheckoutForm
                  title="Data Diri Penumpang 1 - Adult"
                  isSaved={false}
                >
                  <CheckoutInput
                    label="Nama Lengkap"
                    placeholder="Harry"
                    name="fullName_0"
                  />
                  <div className="flex justify-between px-4 items-center">
                    <p> Punya nama keluarga? </p>
                    <div className="relative">
                      <input
                        type="checkbox"
                        onClick={() => handlePassengerBtn(0)}
                        className="absolute left-1/2 -translate-x-1/2 w-full h-full peer appearance-none rounded-md"
                      />
                      <span className="w-10 h-6 flex items-center flex-shrink-0 ml-4 p-1 bg-slate-300  rounded-full duration-300 ease-in-out peer-checked:bg-[#4B1979] after:w-4 after:h-4 after:bg-white after:rounded-full after:shadow-md after:duration-300 peer-checked:after:translate-x-4 group-hover:after:translate-x-1"></span>
                    </div>
                  </div>
                  <AnimatePresence>
                    {isPassengerFamilyName[0] && (
                      <motion.div
                        key="passengerFamilyInput_0"
                        initial={{ translateY: -10 }}
                        animate={{ translateY: 0 }}
                        transition={{
                          duration: 0.3,
                        }}
                      >
                        <CheckoutInput
                          label="Nama Keluarga"
                          placeholder="Potter"
                          name="familyName_0"
                        />
                      </motion.div>
                    )}
                    <motion.div layout transition={{ duration: 0.3 }}>
                      <CheckoutInput
                        label="Nomor Telepon"
                        placeholder="081217177979"
                        name="phoneNumber_0"
                      />
                      <CheckoutInput
                        label="Email"
                        placeholder="johndoe@gmail.com"
                        name="email_0"
                      />
                      <CheckoutInput
                        label="Tanggal Lahir"
                        placeholder="dd/mm/yy"
                        type="date"
                        name="birthDate_0"
                      />
                      <CheckoutInput
                        label="Kewarnegaraan"
                        placeholder="Indonesia"
                        type="text"
                        name="citizenship_0"
                      />
                      <CheckoutInput
                        label="KTP/Paspor"
                        placeholder="Masukkan nomor paspor"
                        type="text"
                        name="passport_number_0"
                      />
                      <CheckoutInput
                        label="Negara Penerbit"
                        placeholder="Indonesia"
                        type="text"
                        name="citizenship_0"
                      />
                      <CheckoutInput
                        label="Berlaku Sampai"
                        placeholder="dd/mm/yy"
                        type="date"
                        name="validuntil_0"
                      />
                    </motion.div>
                  </AnimatePresence>
                </CheckoutForm>
                {/* Penumpang 2 */}
                <CheckoutForm
                  title="Data Diri Penumpang 2 - Adult"
                  isSaved={false}
                >
                  <CheckoutInput
                    label="Nama Lengkap"
                    placeholder="Harry"
                    name="fullName_1"
                  />
                  <div className="flex justify-between px-4 items-center">
                    <p> Punya nama keluarga? </p>
                    <div className="relative">
                      <input
                        type="checkbox"
                        onClick={() => handlePassengerBtn(1)}
                        className="absolute left-1/2 -translate-x-1/2 w-full h-full peer appearance-none rounded-md"
                      />
                      <span className="w-10 h-6 flex items-center flex-shrink-0 ml-4 p-1 bg-slate-300  rounded-full duration-300 ease-in-out peer-checked:bg-[#4B1979] after:w-4 after:h-4 after:bg-white after:rounded-full after:shadow-md after:duration-300 peer-checked:after:translate-x-4 group-hover:after:translate-x-1"></span>
                    </div>
                  </div>
                  <AnimatePresence>
                    {isPassengerFamilyName[1] && (
                      <motion.div
                        key="passengerFamilyInput_1"
                        initial={{ translateY: -10 }}
                        animate={{ translateY: 0 }}
                        transition={{
                          duration: 0.3,
                        }}
                      >
                        <CheckoutInput
                          label="Nama Keluarga"
                          placeholder="Potter"
                          name="familyName_1"
                        />
                      </motion.div>
                    )}
                    <motion.div layout transition={{ duration: 0.3 }}>
                      <CheckoutInput
                        label="Nomor Telepon"
                        placeholder="081217177979"
                        name="phoneNumber_1"
                      />
                      <CheckoutInput
                        label="Email"
                        placeholder="johndoe@mail.com"
                        name="email_1"
                      />
                      <CheckoutInput
                        label="Tanggal Lahir"
                        placeholder="dd/mm/yy"
                        type="date"
                        name="birthDate_1"
                      />
                      <CheckoutInput
                        label="Kewarnegaraan"
                        placeholder="Indonesia"
                        type="text"
                        name="citizenship_1"
                      />
                      <CheckoutInput
                        label="KTP/Paspor"
                        placeholder="Masukkan nomor paspor"
                        type="text"
                        name="passport_number_0"
                      />
                      <CheckoutInput
                        label="Negara Penerbit"
                        placeholder="Indonesia"
                        type="text"
                        name="citizenship_1"
                      />
                      <CheckoutInput
                        label="Berlaku Sampai"
                        placeholder="dd/mm/yy"
                        type="date"
                        name="validuntil_1"
                      />
                    </motion.div>
                  </AnimatePresence>
                </CheckoutForm>
              </div>
            </CheckoutCards>
            {/*Pilih Kursi Penumpang*/}
            <div className="flex flex-col gap-5">
              <CheckoutCards>
                <Seats datas={datas} />
              </CheckoutCards>
              {isDataSaved ? (
                <button
                  className="py-4 text-center w-full bg-[#D0D0D0] rounded-xl text-white shadow-xl text-xl font-semibold"
                  disabled
                >
                  Simpan
                </button>
              ) : (
                <button
                  type="submit"
                  className="py-4 text-center w-full bg-[#7126B5] rounded-xl text-white shadow-xl text-xl font-semibold"
                >
                  Simpan
                </button>
              )}
            </div>
            {/* Detail Penerbangan */}
            <FlightDetails
              flightDetail={flightDetail}
              isSavedData={isDataSaved}
            />
          </div>
        </form>
      </div>
    </>
  );
};

export default Checkout;

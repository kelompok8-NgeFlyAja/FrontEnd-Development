import { useState, useRef, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { IoMdSearch, IoMdPerson, IoIosList } from "react-icons/io";
import { FiBell } from "react-icons/fi";
import NavbarItems from "./NavbarItems";
import useSend from "@/hooks/useSend";
import Cookies from "universal-cookie";

const Topnav = ({ isLogin = false, isSearch, isOTP = false }) => {
  const { loading, sendData } = useSend();
  const [searchText, setSearchText] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false); 
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const dialogRef = useRef();
  const navigate = useNavigate();
  const location = useLocation();
  const cookies = new Cookies();

  const handleResize = () => {
    if (window.innerWidth >= 768) {
      setIsModalOpen(false);
      setIsSearchOpen(false);
    }
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleSearchToggle = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  const handleHamburgerToggle = () => {
    setIsModalOpen(!isModalOpen); 
  };

  const handleInputChange = (event) => {
    setSearchText(event.target.value);
  };

  const handleSearch = () => {
    console.log("Search text:", searchText);
    setIsSearchOpen(false);
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 left-0 w-full z-50 py-4 px-4 xl:px-28 flex justify-between items-center">
      <div className="flex flex-1 gap-10 items-center">
        <a href="/" onClick={() => navigate("/")}>
          <img src="/logo.svg" alt="navbar logo" className="h-[53px]" />
        </a>
        {isSearch && (
          <div className="relative w-full max-w-md hidden md:block">
            <input
              type="text"
              placeholder="Cari di sini ..."
              value={searchText}
              onChange={handleInputChange}
              className="pl-4 pr-10 rounded-[16px] bg-[#EEEEEE] h-12 md:h-[48px] text-left w-full"
            />
            <img
              className="w-6 h-6 absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
              src="/icons/search.svg"
              alt="search icon"
            />
          </div>
        )}
      </div>

      <div className="flex gap-6 items-center">
        {isSearch && (
          <button className="md:hidden text-4xl" onClick={handleSearchToggle}>
            <img
              className="w-6 h-6 text-gray-500"
              src="/icons/search.svg"
              alt="search icon"
            />
          </button>
        )}

        {!isOTP && (
          <>
            {isLogin ? (
              <>
                <NavbarItems>
                  <Link to="/riwayat-pesanan">
                    <IoIosList className="text-2xl" />
                  </Link>
                  <Link to="/notification" className="relative">
                    <FiBell className="text-2xl" />
                    <span className="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full -top-3 -end-3 dark:border-gray-900">
                      {notifications}
                    </span>
                  </Link>
                  <Link to="/account">
                    <IoMdPerson className="text-2xl" />
                  </Link>
                </NavbarItems>
                <button
                  className="flex flex-col justify-center items-center md:hidden border border-[#7126B5] p-2 rounded"
                  onClick={handleHamburgerToggle}
                >
                  <span
                    className={`bg-black block h-0.5 w-6 rounded-sm transition-transform ${isModalOpen ? "rotate-45 translate-y-2" : ""}`}
                  ></span>
                  <span
                    className={`bg-black block h-0.5 w-6 rounded-sm my-1 transition-opacity ${isModalOpen ? "opacity-0" : "opacity-100"}`}
                  ></span>
                  <span
                    className={`bg-black block h-0.5 w-6 rounded-sm transition-transform ${isModalOpen ? "-rotate-45 -translate-y-2" : ""}`}
                  ></span>
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="bg-[#7126B5] py-3 px-4 rounded-xl text-white flex gap-2 items-center hover:opacity-80 transition-all"
              >
                <img
                  src="/icons/login.svg"
                  alt="button icon"
                  width={20}
                  height={20}
                />
                Masuk
              </Link>
            )}
          </>
        )}
      </div>

      {/* Hamburger Menu for Phone View */}
      <AnimatePresence>
        {isModalOpen && (
          <div
            className="fixed inset-0 bg-gray-800 bg-opacity-75 z-40"
            ref={dialogRef}
            onClick={() => setIsModalOpen(false)}
          >
            <motion.div 
              initial={{ opacity: 0, x: 75 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 75 }}
              transition={{ duration: 0.75, delay: 0.25 }}
              className="absolute top-0 right-0 w-64 h-full bg-white shadow-lg flex flex-col p-6"
            >
              <button
                className="self-end text-gray-600"
                onClick={handleHamburgerToggle}
              >
                ✖
              </button>
              <nav className="mt-6">
                <ul className="space-y-4">
                  <li>
                    <Link
                      to="/"
                      className={`text-gray-800 hover:text-violet-900 ${
                        location.pathname === "/" ? "font-bold text-violet-700" : ""
                      }`}
                      onClick={handleHamburgerToggle} 
                    >
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/riwayat-pesanan"
                      className={`text-gray-800 hover:text-violet-900 ${
                        location.pathname === "/riwayat-pesanan"
                          ? "font-bold text-violet-700"
                          : ""
                      }`}
                      onClick={handleHamburgerToggle} 
                    >
                      Riwayat Pesanan
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/notification"
                      className={`text-gray-800 hover:text-violet-900 ${
                        location.pathname === "/notification"
                          ? "font-bold text-violet-700"
                          : ""
                      }`}
                      onClick={handleHamburgerToggle} 
                    >
                      Notifikasi
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/account"
                      className={`text-gray-800 hover:text-violet-900 ${
                        location.pathname === "/account"
                          ? "font-bold text-violet-700"
                          : ""
                      }`}
                      onClick={handleHamburgerToggle} 
                    >
                      Akun
                    </Link>
                  </li>
                </ul>
              </nav>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Topnav;

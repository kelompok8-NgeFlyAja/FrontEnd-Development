import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoMdSearch, IoMdPerson, IoIosList } from "react-icons/io";
import { FiBell } from "react-icons/fi";
import NavbarItems from "./NavbarItems";
import InputSearch from "./search/InputSearch";
import useSend from "@/hooks/useSend";
import Cookies from "universal-cookie";

const Topnav = ({ isLogin = false, isSearch, isOTP = false }) => {
  const { loading, sendData } = useSend();
  const [searchText, setSearchText] = useState("");
  const [isOpen, setIsOpen] = useState(true);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isSearchVisible, setIsSearchVisible] = useState(true);
  const [notifications, setNotifications] = useState([]);
  const dialogRef = useRef();
  const searchRef = useRef();
  const navigate = useNavigate();
  const cookies = new Cookies();

  const handleResize = () => {
    if (window.innerWidth >= 768) {
      if (dialogRef.current?.open) {
        dialogRef.current.close();
        setIsOpen(true);
      }
      setIsSearchVisible(false);
      setIsSearchOpen(false);
    } else {
      setIsSearchVisible(true);
    }
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const clickOutsideModal = (e) => {
    if (e.target.id !== "dialog") {
      dialogRef.current.close();
      setIsOpen(true);
    }
  };

  const handleHamburger = () => {
    setIsOpen(!isOpen);
    if (isOpen) {
      dialogRef.current.showModal();
    } else {
      dialogRef.current.close();
    }
  };

  const handleSearchToggle = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  const handleInputChange = (event) => {
    setSearchText(event.target.value);
  };

  const handleSearch = () => {
    console.log("Search text:", searchText);
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 left-0 w-full z-50 py-4 px-4 xl:px-28 flex justify-between items-center">
      <div className="flex flex-1 gap-10 items-center">
        <a href="/" onClick={() => navigate("/")}>
          <img src="/logo.svg" alt="navbar logo" className="h-[53px]" />
        </a>
        {isSearch && (
          <div className="relative w-full max-w-md">
            <input
              ref={searchRef}
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
            {isSearchOpen ? (
              <button
                className="text-red-500"
                onClick={() => {
                  setSearchText("");
                }}
              >
                X
              </button>
            ) : (
              <IoMdSearch />
            )}
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
                  onClick={handleHamburger}
                >
                  <span
                    className={`bg-black block transition-all ease-out duration-300 h-0.5 w-6 rounded-sm py-0.5 ${
                      !isOpen ? "rotate-45 translate-y-2" : "-tranlate-y-1"
                    }`}
                  ></span>
                  <span
                    className={`bg-black block transition-all ease-in-out duration-300 h-0.5 w-6 rounded-sm py-0.5 my-1 ${
                      !isOpen ? "opacity-0 translate-x-8" : "opacity-100"
                    }`}
                  ></span>
                  <span
                    className={`bg-black block transition-all ease-out duration-300 h-0.5 w-6 rounded-sm py-0.5 ${
                      !isOpen ? "-rotate-45 -translate-y-2" : "tranlate-y-1"
                    }`}
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
    </nav>
  );
};

export default Topnav;

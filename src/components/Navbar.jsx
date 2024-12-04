import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  return (
    <nav className="bg-white shadow-md flex justify-between py-4 px-2 xl:px-28 md:items-center">
      <div className="flex flex-1 flex-col md:flex-row md:ps-10 gap-3 md:gap-10">
        <img
          src="/logo.svg"
          alt="Tiketku Logo"
          height={53}
          onClick={() => navigate("/")}
        />
        <div className="w-full max-w-md relative">
          <Input
            type="search"
            placeholder="Cari di sini ..."
            className="pl-4 pr-10 rounded-[16px] bg-[#EEEEEE] h-12 md:h-[48px] text-left flex items-center"
          />
          <img
            className="w-6 h-6 absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400"
            src="/icons/search.svg"
          />
        </div>
      </div>

      <Button>
        <img src="/icons/login.svg" alt="button icon" /> Masuk
      </Button>
    </nav>
  );
}

import { useNavigate } from "react-router-dom";

const TopnavWithOnlyLogo = () => {
  const navigate = useNavigate();
 

  return (
    <nav className="bg-white shadow-md sticky top-0 left-0 w-full z-50 py-4 px-4 xl:px-28 flex justify-between items-center">
      <div className="flex flex-1 gap-10 items-center">
        <a href="/" onClick={() => navigate("/")}>
          <img src="/logo.svg" alt="navbar logo" className="h-[53px]" />
        </a>
      </div>
    </nav>
  );
};

export default TopnavWithOnlyLogo;

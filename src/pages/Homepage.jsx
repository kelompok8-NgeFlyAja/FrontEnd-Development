import Banner from "@/components/Banner";
import FeauteredFlightCard from "@/components/homepage/FeauteredFlightCard";
import SearchFeatured from "@/components/homepage/FeautredSearch";
import FlightSearch from "@/components/homepage/FligthSearch";
import Topnav from "@/components/TopNavbar";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";

export default function Homepage() {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();
  const cookies = new Cookies();

  useEffect(() => {
    const checkToken = cookies.get("token");
    if (checkToken) {
      if (checkToken === "undefined") {
        setIsLogin(false);
      } else {
        setIsLogin(true);
      }
    } else {
      setIsLogin(false);
    }
  }, []);
  
  return (
    <div>
      <Topnav isLogin={isLogin} isSearch={true} />
      <Banner />
      <FlightSearch />
      <SearchFeatured />
      <FeauteredFlightCard />
    </div>
  );
}

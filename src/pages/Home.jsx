import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import Beranda from "@/components/homepage/Beranda";
import Topnav from "@/components/TopNavbar";
import useSend from "@/hooks/useSend";

const Home = () => {
  const { loading, sendData } = useSend();
  const [isLogin, setIsLogin] = useState(false);
  const [airport, setAirport] = useState([]);
  const [favorite, setFavorite] = useState([]);
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
  }, [navigate]);

  const fetchSearchForm = async () => {
    try {
      const {
        data: {
          data: {
            pagination: { totalData },
          },
        },
      } = await sendData("/api/v1/airport/?limit=1", "GET");
      const {
        data: {
          data: { airport },
        },
      } = await sendData(`/api/v1/airport/?limit=${totalData}`, "GET");
      const {
        data: { data: favorite },
      } = await sendData("/api/v1/flight/favorites", "GET");
      setAirport(airport);
      setFavorite(favorite);
    } catch (err) {
      if (err.statusCode === 500) {
        navigate("/error");
      } else {
        console.log(err);
      }
    }
  };

  useEffect(() => {
    fetchSearchForm();
  }, []);

  return (
    <>
      <Topnav isLogin={isLogin} isSearch={true} />
      <Beranda airport={airport} favorite={favorite} />
    </>
  );
};

export default Home;

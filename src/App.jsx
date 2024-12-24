import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import axios from "axios";
import Homepage from "./pages/Homepage";
import Search from "./pages/Search";
import { Checkout } from "./pages/Checkout";
import Login from "./pages/Login";
import VerifyToken from "./pages/VerifyToken";
import Reset from "./pages/Reset";
import Register from "./pages/Register";
import Otp from "./pages/Otp";
import Send from "./pages/Send";
import Notification from "./pages/Notification";
import Account from "./pages/Account";
import History from "./pages/History";
import Topnav from "./components/TopNavbar";

function App() {
  const [isLogin, setIsLogin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cookies = new Cookies();
    const checkToken = cookies.get("token");

    if (checkToken && checkToken !== "undefined") {
      verifyToken(checkToken);
    } else {
      setLoading(false);
    }

    const unsubscribe = cookies.addChangeListener(({ name, value }) => {
      if (name === "token") {
        if (value && value !== "undefined") {
          verifyToken(value);
        } else {
          setIsLogin(false);
        }
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const verifyToken = async (token) => {
    try {
      const response = await axios.get("https://ngeflyaja.shop/user", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.data) {
        setIsLogin(true); 
      } else {
        setIsLogin(false); 
      }
    } catch (error) {
      setIsLogin(false); 
    }
    setLoading(false); 
  };

  const authRoutes = [
    "/login",
    "/send-email",
    "/verify-token",
    "/reset-password",
    "/register",
    "/otp",
  ];

  function Layout() {
    const location = useLocation();
    const hideTopnav = authRoutes.some((path) =>
      location.pathname.startsWith(path)
    );

    if (loading) {
      return (
        <div className="fixed inset-0 flex justify-center items-center bg-white bg-opacity-75 z-50">
          <div className="w-16 h-16 border-4 border-t-4 border-purple-600 border-solid rounded-full animate-spin"></div>
        </div>
      );
    }

    return (
      <>
        {!hideTopnav && <Topnav isLogin={isLogin} isSearch={true} />}

        <Routes>
          {/* Non-Login */}
          <Route path="/" element={<Homepage />} />
          <Route path="/search" element={<Search />} />

          {/* Login Required */}
          <Route
            path="/checkout"
            element={isLogin ? <Checkout /> : <Navigate to="/login" />}
          />
          <Route
            path="/notification"
            element={isLogin ? <Notification /> : <Navigate to="/login" />}
          />
          <Route path="/account" element={<Account />} />
          <Route
            path="/riwayat-pesanan"
            element={isLogin ? <History /> : <Navigate to="/login" />}
          />

          {/* Auth */}
          <Route
            path="/login"
            element={!isLogin ? <Login /> : <Navigate to="/" />}
          />
          <Route
            path="/send-email"
            element={!isLogin ? <Send /> : <Navigate to="/" />}
          />
          <Route
            path="/verify-token/:token"
            element={!isLogin ? <VerifyToken /> : <Navigate to="/" />}
          />
          <Route
            path="/reset-password/:token"
            element={!isLogin ? <Reset /> : <Navigate to="/" />}
          />
          <Route
            path="/register"
            element={!isLogin ? <Register /> : <Navigate to="/" />}
          />
          <Route
            path="/otp"
            element={!isLogin ? <Otp /> : <Navigate to="/" />}
          />
        </Routes>
      </>
    );
  }

  return <Layout />;
}

export default App;

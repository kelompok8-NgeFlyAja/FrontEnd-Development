import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import Cookies from "universal-cookie";
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
import Riwayat from "./pages/Riwayat";
import Topnav from "./components/TopNavbar";

function App() {
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    const cookies = new Cookies();
    const checkToken = cookies.get("token");
    setIsLogin(!!checkToken && checkToken !== "undefined");

    const unsubscribe = cookies.addChangeListener(({ name, value }) => {
      if (name === "token") {
        setIsLogin(!!value && value !== "undefined");
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const authRoutes = ["/login", "/send-email", "/verify-token", "/reset-password", "/register", "/otp"];

  function Layout() {
    const location = useLocation();
    const hideTopnav = authRoutes.some((path) => location.pathname.startsWith(path));

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
          <Route
            path="/account"
            element={isLogin ? <Account /> : <Navigate to="/login" />}
          />
          <Route
            path="/riwayat-pesanan"
            element={isLogin ? <Riwayat /> : <Navigate to="/login" />}
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

import React from "react";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <Routes>
        <Route path="/Beranda" element={<Beranda />} />
        <Route
          path="*"
          element={
            <div className="grid place-items-center">For 404 Not Found</div>
          }
        />
      </Routes>
    </>
  );
}

export default App;

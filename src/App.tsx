import React from "react";
import "./App.css";
import "./reset.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import IntersectionObserverVideoPage from "./pages/IntersectionObserverVideoPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/intersection-observer-video"
          element={<IntersectionObserverVideoPage />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

import { BrowserRouter, Route, Routes } from "react-router-dom";
import Coins from "./Routes/Coins";
import Coin from "./Routes/Coin";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Coins />} />
        <Route path="/:coinId/*" element={<Coin />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;

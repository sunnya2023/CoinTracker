import { createBrowserRouter } from "react-router-dom";
import Coins from "./Coins";
import Coin from "./Coin";
import Chart from "./Chart";
import Price from "./Price";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <Coins />,
    },
    {
      path: "/:coinId",
      element: <Coin />,
      children: [
        {
          path: "chart",
          element: <Chart />,
        },
        {
          path: "price",
          element: <Price />,
        },
      ],
    },
  ],
  { basename: "/CoinTracker" }
);

export default router;

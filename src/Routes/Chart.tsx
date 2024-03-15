import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useOutletContext } from "react-router-dom";
import { fetchCoinHistory } from "../api";
import ApexChart from "react-apexcharts";
import { isDarkAtom } from "../atoms";
import { useRecoilValue } from "recoil";

interface ICoinID {
  coinId: string;
}

interface IHistory {
  time_open: number;
  time_close: number;
  open: string;
  high: string;
  low: string;
  close: string;
  volume: string;
  market_cap: number;
}

function Chart() {
  const isDark = useRecoilValue(isDarkAtom);

  const { coinId } = useOutletContext<ICoinID>();
  const { isLoading, data } = useQuery<IHistory[]>({
    queryKey: ["ohlcv", coinId],
    queryFn: () => fetchCoinHistory(coinId),
  });

  return (
    <div>
      {isLoading ? (
        "Loading Chart..."
      ) : (
        <ApexChart
          type="candlestick"
          series={[
            {
              data: data?.map((price) => {
                return {
                  x: price.time_close,
                  y: [price.open, price.high, price.low, price.close],
                };
              }) as any[],
            },
          ]}
          options={{
            theme: {
              mode: isDark ? "dark" : "light",
            },
            chart: {
              height: 500,
              width: 500,
              toolbar: {
                show: false,
              },
              background: "transparent",
            },
            grid: {
              show: false,
            },

            yaxis: {
              show: false,
            },
            xaxis: {
              axisBorder: {
                show: false,
              },
              axisTicks: {
                show: false,
              },
              labels: {
                show: false,
              },
            },
          }}
        />
      )}
    </div>
  );
}

export default Chart;

// import { useQuery } from "@tanstack/react-query";
// import { fetchCoinHistory } from "./api";
// import ApexCharts from "react-apexcharts";
// import { useOutletContext } from "react-router-dom";
// import { useRecoilValue } from 'recoil';
// import { isDarkAtom } from '../atoms';
// interface IChartProps {
//   coinId: string;
// }
// interface IHistorial {
//   time_open: number;
//   time_close: number;
//   open: string;
//   high: string;
//   low: string;
//   close: string;
//   volume: string;
//   market_cap: number;
// }

// export default function Chart() {
//   const isDark = useRecoilValue(isDarkAtom);

//   const { coinId } = useOutletContext<IChartProps>();
//   const { isLoading, data } = useQuery<IHistorial[]>({
//     queryKey: ["ohclv", coinId],
//     queryFn: () => fetchCoinHistory(coinId),
//   });
//   return (
//     <div>
//       {isLoading ? (
//         "Loading..."
//       ) : (
//         <ApexCharts
//           type="line"
//           series={[
//             {
//               name: "sales",
//               data: data?.map((price) => parseFloat(price.close)) ?? [],
//             },
//           ]}
//           options={{
//             theme: {
//               mode: isDark? "dark" : "light",
//             },
//             chart: {
//               height: 500,
//               width: 500,
//               background: "transparent",
//               toolbar: {
//                 show: false,
//               },
//             },
//             grid: {
//               show: false,
//             },
//             stroke: {
//               curve: "smooth",
//               width: 3,
//             },

//             yaxis: {
//               show: false,
//             },
//             xaxis: {
//               type: "datetime",
//               axisTicks: {
//                 show: false,
//               },
//               axisBorder: {
//                 show: false,
//               },
//               labels: {
//                 show: false,
//               },
//               categories: data?.map((val) =>
//                 new Date(val.time_close * 1000).toISOString()
//               ),
//             },
//             fill: {
//               type: "gradient",
//               gradient: {
//                 gradientToColors: ["#2bcbba"],
//                 stops: [0, 100],
//               },
//             },
//             colors: ["#4b7bec"],
//             tooltip: {
//               y: {
//                 formatter: (value) => `${value.toFixed(3)}`,
//               },
//             },
//           }}
//         />
//       )}
//     </div>
//   );
// }

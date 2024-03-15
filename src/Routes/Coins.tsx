import { Link, Outlet } from "react-router-dom";
import styled from "styled-components";
import { fetchCoins } from "../api";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { isDarkAtom } from "../atoms";
import { Switch } from "@mui/material";

const Container = styled.div`
  padding: 0 20px;
  max-width: 480px;
  margin: 0 auto;
`;
const Header = styled.header`
  height: 10vh;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 20px;
`;
const CoinList = styled.ul``;

const Coin = styled.li`
  background-color: white;
  color: ${(props) => props.theme.textColor};
  padding: 20px;
  border-radius: 15px;
  margin-bottom: 10px;
  border: 1px solid ${(props) => props.theme.bgColor};
  a {
    padding: 20px;
    transition: color 0.5s ease-in-out;
    display: flex;
    align-items: center;
  }
  &:hover {
    a {
      color: ${(props) => props.theme.accentColor};
    }
  }
`;
const Text = styled.span`
  color: ${(props) => props.theme.textColor};
`;
const Title = styled.h1`
  font-size: 48px;
  color: ${(props) => props.theme.titleColor};
  flex: 1;
  text-align: center;
`;
const Loader = styled.span`
  display: block;
  text-align: center;
`;
const Img = styled.img`
  width: 35px;
  height: 35px;
  margin-right: 10px;
`;

const label = { inputProps: { "aria-label": "Switch demo" } };
interface ICoins {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
}
const Coins = () => {
  const isDark = useRecoilValue(isDarkAtom);
  const setterFn = useSetRecoilState(isDarkAtom);
  const { isLoading, data } = useQuery<ICoins[]>({
    queryKey: ["allCoins"],
    queryFn: fetchCoins,
  });

  return (
    <>
      <Container>
        <Helmet>
          <title>Cointraker</title>
        </Helmet>

        <Header>
          <Title>코인</Title>

          <Switch
            {...label}
            defaultChecked
            onClick={() => setterFn((current) => !current)}
          />
        </Header>

        {isLoading ? (
          <Loader>Loading...</Loader>
        ) : (
          <CoinList>
            {data?.slice(0, 100).map((coin) => (
              <Coin key={coin.id}>
                <Link to={`/${coin.id}`} state={{ name: coin.name }}>
                  <Img
                    src={`https://coinicons-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`}
                    alt="아이콘 이미지"
                  />
                  <Text>{coin.name} &rarr</Text>;
                </Link>
              </Coin>
            ))}
          </CoinList>
        )}
        <Outlet />
      </Container>
    </>
  );
};

export default Coins;

// import React, { useEffect, useState } from "react";
// import { useQuery } from "@tanstack/react-query";
// import {
//   Link,
//   useOutlet,
//   useOutletContext,
//   useSearchParams,
// } from "react-router-dom";
// import styled from "styled-components";
// import fetchCoins from "../api";
// import { Helmet } from "react-helmet-async";
// import { useRecoilValue, useSetRecoilState } from "recoil";
// import { isDarkAtom } from "../atoms";

// const Container = styled.div`
//   padding: 0 20px;
//   max-width: 480px;
//   margin: 0 auto;
// `;
// const Header = styled.header`
//   height: 10vh;
//   display: flex;
//   justify-content: center;
//   align-items: center;
// `;
// const CoinList = styled.ul``;

// const Coin = styled.li`
//   background-color: white;
//   color: ${(props) => props.theme.textColor};
//   padding: 20px;
//   border-radius: 15px;
//   margin-bottom: 10px;
//   a {
//     display: flex;
//     transition: color 0.2s ease-in;
//     align-items: center;
//     /* display: block; */
//   }
//   &:hover {
//     a {
//       color: ${(props) => props.theme.accentColor};
//     }
//   }
// `;

// const Title = styled.h1`
//   margin-bottom: 20px;
//   font-size: 48px;
//   color: ${(props) => props.theme.title};
// `;

// const Loader = styled.span`
//   text-align: center;
//   display: block;
// `;
// const Img = styled.img`
//   width: 35px;
//   height: 35px;
//   margin-right: 10px;
// `;

// // const coins = [
// //   {
// //     id: "btc-bitcoin",
// //     name: "Bitcoin",
// //     symbol: "BTC",
// //     rank: 1,
// //     is_new: false,
// //     is_active: true,
// //     type: "coin",
// //   },
// //   {
// //     id: "eth-ethereum",
// //     name: "Ethereum",
// //     symbol: "ETH",
// //     rank: 2,
// //     is_new: false,
// //     is_active: true,
// //     type: "coin",
// //   },
// //   {
// //     id: "hex-hex",
// //     name: "HEX",
// //     symbol: "HEX",
// //     rank: 3,
// //     is_new: false,
// //     is_active: true,
// //     type: "token",
// //   },
// // ];

// interface ICoin {
//   id: string;
//   name: string;
//   symbol: string;
//   rank: number;
//   is_new: boolean;
//   is_active: boolean;
//   type: string;
// }

// const Coins = () => {
//   const { isLoading, data } = useQuery<ICoin>({
//     queryKey: ["allCoins"],
//     queryFn: fetchCoins,
//     refetchInterval: 10000,
//   });
//   // const [coins, setCoins] = useState<CoinInterface[]>([]);
//   // const [loading, setLoading] = useState(true);
//   // const url = `https://api.coinpaprika.com/v1/coins`;
//   // useEffect(() => {
//   //   (async () => {
//   //     const respons = await fetch(url);
//   //     const json = await respons.json();
//   //     //   console.log(json);
//   //     setCoins(json.slice(0, 100));
//   //     setLoading(false);
//   //   })();
//   // }, []);
//   // console.log(coins);
//   // if (error) {
//   //   return <div>err</div>;
//   // }
//   const setterFn = useSetRecoilState(isDarkAtom);
//   const toggleDarkAtom = () => setterFn((prev) => !prev);
//   return (
//     <Container>
//       <Helmet>
//         <title>코인</title>
//       </Helmet>
//       <Header>
//         <Title>코인</Title>
//         <button onClick={toggleDarkAtom}>Toggle Mode</button>
//       </Header>
//       <CoinList>
//         {isLoading ? (
//           <Loader>Loading...</Loader>
//         ) : (
//           data?.slice(0, 100).map((coin) => (
//             <Coin key={coin.id}>
//               <Link to={`/${coin.id}`} state={{ name: coin.name }}>
//                 <Img
//                   src={`https://coinicons-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`}
//                 />
//                 {coin.name} &rarr;
//               </Link>
//             </Coin>
//           ))
//         )}
//       </CoinList>
//     </Container>
//   );
// };

// export default Coins;

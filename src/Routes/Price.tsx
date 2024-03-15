import { useQuery } from "@tanstack/react-query";
import { useOutletContext } from "react-router-dom";
import { fetchCoinHistory, fetchCoinTickers } from "../api";
import styled from "styled-components";

const CoinList = styled.ul``;

const Coin = styled.li`
  background-color: white;
  color: ${(props) => props.theme.bgColor};
  padding: 20px;
  border-radius: 15px;
  margin-bottom: 10px;
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
const Title = styled.h1`
  font-size: 48px;
  color: ${(props) => props.theme.titleColor};
`;

const Loader = styled.span`
  display: block;
  text-align: center;
`;
interface ICoinID {
  coinId: string;
}

interface IpriceData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  total_supply: number;
  max_supply: number;
  beta_value: number;
  first_data_at: string;
  last_updated: string;
  quotes: {
    USD: {
      price: number;
      volume_24h: number;
      volume_24h_change_24h: number;
      market_cap: number;
      market_cap_change_24h: number;
      percent_change_15m: number;
      percent_change_30m: number;
      percent_change_1h: number;
      percent_change_6h: number;
      percent_change_12h: number;
      percent_change_24h: number;
      percent_change_7d: number;
      percent_change_30d: number;
      percent_change_1y: number;
      ath_price: number;
      ath_date: string;
      percent_from_price_ath: number;
    };
  };
}

const Price = () => {
  const { coinId } = useOutletContext<ICoinID>();

  const { isLoading: tickersLoading, data: tickersData } = useQuery<IpriceData>(
    {
      queryKey: ["tickers", coinId],
      queryFn: () => fetchCoinTickers(String(coinId)),
      // refetchInterval: 10000,
    }
  );
  console.log(tickersData);
  return (
    <>
      {tickersLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <div>
          <CoinList>
            <Coin>30분: ${tickersData?.quotes.USD.percent_change_30m}</Coin>
            <Coin>1시간: ${tickersData?.quotes.USD.percent_change_1h}</Coin>
            <Coin>
              close price: ${tickersData?.quotes.USD.percent_change_12h}
            </Coin>
            <Coin>
              close price: ${tickersData?.quotes.USD.percent_change_24h}
            </Coin>
          </CoinList>
        </div>
      )}
    </>
  );
};

export default Price;

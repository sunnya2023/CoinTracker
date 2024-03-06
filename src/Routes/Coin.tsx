import { useEffect, useState } from "react";
import { Route, Routes, useLocation, useParams } from "react-router-dom";
import styled from "styled-components";
import Price from './Price';
import Chart from './Chart';

interface RouteParams {
  coinId: string;
}

const Container = styled.div`
  padding: 0 20px;
  max-width: 480px;
  margin: 0 auto;
`;
const Header = styled.header`
  /* height: 10vh; */
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h1`
  font-size: 48px;
  color: ${(props) => props.theme.textColor};
`;

const Loader = styled.span`
  margin-top: 30%;
  text-align: center;
  display: block;
`;

const Overview = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 10px 20px;
  border-radius: 15px;
`;

const OverviewItem = styled.div`

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
  span:first-child {
    text-align: center;
    font-size: 10px;
  }s
`;

const Description = styled.p`
  margin: 20px 10px;
`;

interface InfoData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
  logo: string;
  description: string;
  message: string;
  open_source: boolean;
  started_at: string;
  development_status: string;
  hardware_wallet: boolean;
  proof_type: string;
  org_structure: string;
  hash_algorithm: string;
  first_data_at: string;
  last_data_at: string;
}

interface PriceData {
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
      ath_date: string;
      ath_price: number;
      market_cap: number;
      percent_change_1h: number;
      percent_change_1y: number;
      percent_change_6h: number;
      percent_change_7d: number;
      percent_change_12h: number;
      percent_change_15m: number;
      percent_change_24h: number;
      percent_change_30d: number;
      percent_change_30m: number;
      percent_from_price_ath: number;
      price: number;
      volume_24h: number;
      volume_24h_change_24h: number;
    };
  };
}
const Coin = () => {
  const { coinId } = useParams<keyof RouteParams>();
  const [loading, setLoading] = useState(true);
  const { state } = useLocation();
  const [info, setInfo] = useState<InfoData>();
  const [prieInfo, setPriceInfo] = useState<PriceData>();
  const url = `https://api.coinpaprika.com/v1/coins/${coinId}`;
  const urlPrice = `https://api.coinpaprika.com/v1/tickers/${coinId}`;
  useEffect(() => {
    (async () => {
      const infoData = await (await fetch(url)).json();
      const priceData = await (await fetch(urlPrice)).json();
      console.log(infoData);
      console.log(priceData);
      setInfo(infoData);
      setPriceInfo(priceData);
      setLoading(false);
    })();
  }, []);

  return (
    <Container>
      <Header>
        <Title>
          {state?.name ? state.name : loading ? "Loading..." : info?.name}
        </Title>
      </Header>
      {loading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Overview>
            <OverviewItem>
              <span>RANK:</span>
              <span>{info?.rank}</span>
            </OverviewItem>
            <OverviewItem>
              <span>SYMBOL:</span>
              <span>{info?.symbol}</span>
            </OverviewItem>
            <OverviewItem>
              <span>OPEN SOURCE:</span>
              <span>{info?.open_source}</span>
            </OverviewItem>
          </Overview>
          <Description>{info?.description}</Description>
          <Overview>
            <OverviewItem>
              <span>TOTAL SUPLY:</span>
              <span>{prieInfo?.total_supply}</span>
            </OverviewItem>
            <OverviewItem>
              <span>MAX SUPLY:</span>
              <span>{prieInfo?.max_supply}</span>
            </OverviewItem>
          </Overview>
          <Routes>
            <Route path={`/${coinId}/price`} element={<Price/>}/>
            <Route path={`/${coinId}/chart`} element={<Chart/>}/>
          </Routes>
        </>
      )}
    </Container>
  );
};

export default Coin;

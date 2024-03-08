const BASE_URL = `https://api.coinpaprika.com/v1`;

async function fetchCoins() {
  return fetch(`${BASE_URL}/coins`).then((res) => res.json());
}

export default fetchCoins;

export function fetchCoinInfo(coinId: string) {
  return fetch(`${BASE_URL}/coins/${coinId}`).then((res) => res.json());
}
export function fetchCoinTickers(coinId: string) {
  return fetch(`${BASE_URL}/tickers/${coinId}`).then((res) => res.json());
}

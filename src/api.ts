const BASE_URL = `https://api.coinpaprika.com/v1`;

export async function fetchCoins() {
  return fetch(`${BASE_URL}/coins`).then((res) => res.json());
}

//   https://api.coinpaprika.com/v1/coins/btc-bitcoin
// https://api.coinpaprika.com/v1/tickers/btc-bitcoin

export async function fetchCoinInfo(coinId: string) {
  return fetch(`${BASE_URL}/coins/${coinId}`).then((res) => res.json());
}

export async function fetchCoinTickers(coinId: string) {
  return fetch(`${BASE_URL}/tickers/${coinId}`).then((res) => res.json());
}

//https://ohlcv-api.nomadcoders.workers.dev
//https://ohlcv-api.nomadcoders.workers.dev?coinId=btc-bitcoin
export async function fetchCoinHistory(coinId: string) {
  // const endDate = Math.floor(Date.now() / 1000);
  // const startDate = endDate - 60 * 60 * 24 * 7 * 2;
  return fetch(
    `https://ohlcv-api.nomadcoders.workers.dev?coinId=${coinId}`
  ).then((res) => res.json());
}

// const BASE_URL = `https://api.coinpaprika.com/v1`;

// async function fetchCoins() {
//   return fetch(`${BASE_URL}/coins`).then((res) => res.json());
// }

// export default fetchCoins;

// export function fetchCoinInfo(coinId: string) {
//   return fetch(`${BASE_URL}/coins/${coinId}`).then((res) => res.json());
// }
// export function fetchCoinTickers(coinId: string) {
//   return fetch(`${BASE_URL}/tickers/${coinId}`).then((res) => res.json());
// }

// export function fetchCoinHistory(coinId: string) {
//   const endDate = Math.floor(Date.now() / 1000);
//   const startDate = endDate - 60 * 60 * 24 * 7;
//   return fetch(
//     `https://ohlcv-api.nomadcoders.workers.dev?coinId=${coinId}`
//   ).then((res) => res.json());
// }

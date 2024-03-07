async function fetchCoins() {
 const response = await fetch(fetch(`https://api.coinpaprika.com/v1/coins`))
 const json = await response.json()
 return json.slice(0,100)
 ;
}

export default { fetchCoins };

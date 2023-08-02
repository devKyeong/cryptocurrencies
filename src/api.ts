const BASE_URL = `https://api.coinpaprika.com/v1`;
const SUB_URL = `https://ohlcv-api.nomadcoders.workers.dev`;

//coins/{coin_id}/ohlcv/historical

export function fetchCoins() {
  return fetch(`${BASE_URL}/coins`).then((response) => response.json());
}

export function fetchCoinDetail(coinId: string) {
  return fetch(`${BASE_URL}/coins/${coinId}`).then((response) =>
    response.json()
  );
}

export function fetchCoinPrice(coinId: string) {
  return fetch(`${BASE_URL}/tickers/${coinId}?quotes=KRW`).then((response) =>
    response.json()
  );
}

export function fetchCoinHistory(coinId: string) {
  //const start = Math.ceil(Date.now() / 1000) - 60 * 60 * 24;
  //`${BASE_URL}/coins/${coinId}/ohlcv/today?quotes=KRW`
  return fetch(
    `https://ohlcv-api.nomadcoders.workers.dev?coinId=${coinId}`
  ).then((response) => response.json());
}

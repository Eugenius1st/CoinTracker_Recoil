const BASE_URL = `https://api.coinpaprika.com/v1`;

export async function fetchCoins() {
  // const response = await fetch(`${BASE_URL}/coins`);
  // const json = await response.json();
  // return json;
  //가독성 높은 오래된 방법
  return fetch(`${BASE_URL}/coins`).then((response) => response.json());
  // 두 코드는 같은 것이다. fetcher 함수인 fetchCoin 은 URL을 부르고 URL로 부터 json을 return 한다.
}

export async function fetchCoinInfo(coinId: string) {
  //coinId 타입 명시 필요, coin Id를 fetch하는 함수
  return fetch(`${BASE_URL}/coins/${coinId}`).then((response) => response.json());
}

export async function fetchCoinTickers(coinId: string) {
  //coinId 타입 명시 필요 coin Ticker를 fetch하는 함수
  return fetch(`${BASE_URL}/tickers/${coinId}`).then((response) => response.json());
}

export function fetchCoinHistory(coinId: string) {
  const endDate = Math.floor(Date.now() / 1000);
  const startDate = endDate - 60 * 60 * 24 * 7 * 2;
  return fetch(
    `${BASE_URL}/coins/${coinId}/ohlcv/historical?start=${startDate}&end=${endDate}`
  ).then((response) => response.json());
}

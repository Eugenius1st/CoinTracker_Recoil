import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useQuery } from 'react-query';
import { fetchCoins } from './api';
import { Helmet } from 'react-helmet';
import Header from './Header';
const Container = styled.div`
  padding: 0px 20px;
  max-width: 480px;
  margin: 0 auto;
`;

const CoinsList = styled.ul`
  padding-top: 13vh;
`;

const Coin = styled.li`
  background-color: white;
  color: ${(props) => props.theme.bgColor};
  margin-bottom: 10px;
  padding: 20px;
  border-radius: 15px;

  a {
    padding: 5px; // 좀 더 넓은 범위에서 transition 효과 적용 가능
    transition: color 0.2s ease-in;
  }

  &:hover {
    a {
      color: ${(props) => props.theme.accentColor};
    }
    // 아래에서는 a가 아닌 Link라는 이름으로 사용했지만
    // css에서는 anchor 를 선택해야 했다. 이건 모든 react router link들이
    // 결국에는 anchor로 바뀔거기도 하고,
    // react router dom이 우리 대신 설정을 도와줄 특별한 event listener들이 있기도 하다
  }
`;

const Title = styled.h1`
  font-size: 48px;
  color: ${(props) => props.theme.accentColor};
`;

const Loader = styled.span`
  text-align: center;
  display: block;
`;

const Img = styled.img`
  width: 25px;
  height: 25px;
  margin-right: 10px;
`;

const BackBtn = styled.button`
  border: 0;
  background-color: transparent;
  font-size: 30px;
  border: 1px solid white;
  border-radius: 50%;
  padding: 1% 1%;
`;

interface ICoin {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
}

function Coins() {
  const { isLoading, data } = useQuery<ICoin[]>('allCoins', fetchCoins);
  console.log(isLoading, data);
  //useQery는 두개의 식별자가 필요하다. 첫번째는 고유식별자, 두번째는 fetcher함수이다.
  // useQuery는 isLoading 이라고 불리는 boolean값을 return하는데 이전에 있던
  // const[loading,setLoading]과 setLoading(false)를 대체할 수 있는 것이다.
  // 총 설명: useQuery hook에서 fetcher함수 fetchCoins를 불러오고 그함수가
  // isLoading 즉, fetcher함수가 끝난다면 react Query가 말해줄 것이다.
  // 그리고 return 값을 data에 넣어줄 것이다. 아래에서 state에 넣었던 것처럼..
  // +) data 타입을 명시하기 위해 <CoinInterface[]>를 넣어준다.

  // 위 코드와 아래 코드는 같다.

  // const [coins, setCoins] = useState<CoinInterface[]>([]);
  // const [loading, setLoading] = useState(true);
  // useEffect(() => {
  //   (async () => {
  //     const response = await fetch('https://api.coinpaprika.com/v1/coins');
  //     const json = await response.json();
  //     setCoins(json.slice(0, 100));
  //     setLoading(false);
  //   })();
  // }, []);

  return (
    <>
      <Header />
      <Container>
        <Helmet>
          <title>코인</title>
        </Helmet>
        {isLoading ? (
          <Loader>"Loading..."</Loader>
        ) : (
          //loading 이 참이면 Loading... 출력, 거짓이면 CoinsList 보여줌
          <CoinsList>
            {data?.slice(0, 100).map((coin) => (
              <Coin key={coin.id}>
                <Img
                  src={`https://raw.githubusercontent.com/ErikThiart/cryptocurrency-icons/master/16/${coin.name
                    .toLowerCase()
                    .split(' ')
                    .join('-')}.png`}
                />
                <Link
                  to={{
                    pathname: `/${coin.id}`,
                    state: { name: coin.name },
                    //Link를 이용해 string 이외에 더 많은 데이터를 보낼 수 있다
                  }}
                >
                  {coin.id}
                </Link>
              </Coin>
            ))}
          </CoinsList>
        )}
      </Container>
    </>
  );
}

export default Coins;

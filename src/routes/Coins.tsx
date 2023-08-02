import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { styled } from "styled-components";
import { fetchCoins } from "../api";
import { Helmet } from "react-helmet";

const Container = styled.main`
  padding: 0px 20px;
  max-width: 480px;
  margin: 0 auto;
`;

const Header = styled.header`
  height: 15vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CoinList = styled.ul``;

const Coin = styled.li`
  background-color: ${({ theme: { colors } }) => colors.text};

  color: ${({ theme: { colors } }) => colors.background};

  margin-bottom: 10px;
  border-radius: 15px;

  a {
    padding: 20px;
    transition: color 0.2s ease-in;
    display: block;
  }

  &:hover {
    a {
      color: ${({ theme: { colors } }) => colors.accent};
    }
  }
`;

const CoinArticle = styled.article`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-weight: 400;

  img {
    width: 40px;
    height: 40px;
    margin-right: 10px;
  }
`;

const Title = styled.h1`
  font-weight: 400;
  font-size: 48px;
  color: ${({ theme: { colors } }) => colors.accent};
`;

const Loader = styled.span`
  display: block;
  text-align: center;
`;

interface ICoinBasic {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
}

function Coins() {
  const { isLoading, data } = useQuery<ICoinBasic[]>("allCoins", fetchCoins);

  return (
    <Container>
      <Helmet>
        <title>COINS</title>
      </Helmet>
      <Header>
        <Title>Coins</Title>
      </Header>
      {isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <CoinList>
          {data?.slice(0, 100).map((coin) => (
            <Coin key={coin.id}>
              <Link to={{ pathname: `/${coin.id}`, state: coin }}>
                <CoinArticle>
                  <img
                    alt={coin.symbol}
                    src={`https://coinicons-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`}
                  />
                  <span>{coin.name} &rarr;</span>
                </CoinArticle>
              </Link>
            </Coin>
          ))}
        </CoinList>
      )}
    </Container>
  );
}

export default Coins;

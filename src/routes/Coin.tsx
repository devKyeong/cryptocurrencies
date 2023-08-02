import { useQuery } from "react-query";
import {
  Link,
  Route,
  Switch,
  useLocation,
  useParams,
  useRouteMatch,
} from "react-router-dom";
import { styled } from "styled-components";
import { Helmet } from "react-helmet";
import { fetchCoinDetail, fetchCoinPrice } from "../api";
import Chart from "./Chart";
import Price from "./Price";

interface RouteParams {
  coinId: string;
}
interface RouteState {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
}

interface ICoinDetail {
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

interface ICoinPrice {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  beta_value: number;
  first_data_at: string;
  last_updated: string;
  quotes: {
    KRW: {
      ath_date: string;
      ath_price: number;
      market_cap: number;
      market_cap_change_24h: number;
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

function Coin() {
  const priceMatch = useRouteMatch("/:coinId/price");
  const chartMatch = useRouteMatch("/:coinId/chart");

  const { coinId } = useParams<RouteParams>();
  const { state } = useLocation<RouteState>();

  const { isLoading: detailLoading, data: detail } = useQuery<ICoinDetail>(
    ["coinDetail", coinId],
    () => fetchCoinDetail(coinId)
  );
  const { isLoading: priceLoading, data: price } = useQuery<ICoinPrice>(
    ["coinPrice", coinId],
    () => fetchCoinPrice(coinId)
  );

  const loading = detailLoading || priceLoading;

  return (
    <Container>
      <Helmet>
        <title>{state?.name || detail?.name || "Loading..."}</title>
      </Helmet>
      <Nav>
        <Link to={{ pathname: "/" }}>&lt; Home</Link>
      </Nav>
      <Header>
        <Title>
          {state?.name || detail?.name || <Loader>Loading...</Loader>}
        </Title>
      </Header>
      {loading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <OverView>
            <OverViewItem>
              <span>순위</span>
              <span>{detail?.rank}</span>
            </OverViewItem>
            <OverViewItem>
              <span>종목 코드</span>
              <span>{detail?.symbol}</span>
            </OverViewItem>
            <OverViewItem>
              <span>현재가(₩)</span>
              <span>
                ₩ {Math.round(price?.quotes.KRW.price || 0).toLocaleString()}
              </span>
            </OverViewItem>
          </OverView>
          <OverView>
            <OverViewItem>
              <span>총 발행량</span>
              <span>{price?.total_supply.toLocaleString()}</span>
            </OverViewItem>
            <OverViewItem>
              <span>총 시가(₩10,000)</span>
              <span>
                ₩{" "}
                {Math.round(
                  (price?.quotes.KRW.market_cap || 0) / (100 * 100)
                ).toLocaleString()}
              </span>
            </OverViewItem>
          </OverView>
          <Description>{detail?.description}</Description>

          <TabSection>
            <TabList>
              <Tab $active={priceMatch ? true : false}>
                <Link to={`/${coinId}/price`}>PRICE</Link>
              </Tab>
              <Tab $active={chartMatch ? true : false}>
                <Link to={`/${coinId}/chart`}>CHART</Link>
              </Tab>
            </TabList>
            <TabContent>
              <Switch>
                <Route path="/:coinId/chart">
                  <Chart
                    coinId={coinId}
                    coinName={state?.name || detail?.name}
                  />
                </Route>
                <Route path="/:coinId/price">
                  <Price coinId={coinId} price={price?.quotes.KRW} />
                </Route>
              </Switch>
            </TabContent>
          </TabSection>
        </>
      )}
    </Container>
  );
}

const Container = styled.main`
  padding: 0 20px;
  max-width: 480px;
  margin: 0 auto;
`;

const Header = styled.header`
  height: 25vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Nav = styled.nav`
  padding: 20px 0;
  font-size: 15px;
`;

const Title = styled.h1`
  font-size: 60px;
  color: ${({ theme: { colors } }) => colors.accent};
`;

const OverView = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.4);
  padding: 10px 20px;
  border-radius: 10px;
  margin-bottom: 10px;
`;

const OverViewItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  :first-child {
    font-size: 12px;
    font-weight: 400;
    text-transform: uppercase;
    margin-bottom: 5px;
  }
`;

const Description = styled.p`
  padding: 20px 10px;
`;

const TabSection = styled.section`
  margin-top: 30px;
`;

const TabList = styled.ul`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
`;

const Tab = styled("li")<{ $active: boolean }>`
  text-align: center;
  text-transform: uppercase;
  font-size: 13px;
  font-weight: 400;

  background-color: ${({ $active, theme: { colors } }) =>
    $active ? colors.text : `rgba(0, 0, 0, 0.4)`};
  color: ${({ $active, theme: { colors } }) =>
    $active ? colors.background : colors.text};

  border-radius: 15px;

  a {
    padding: 10px 0;
    display: block;
  }
`;

const TabContent = styled.div`
  margin-top: 20px;
  padding: 0 10px;
`;

const Loader = styled.span`
  display: block;
  text-align: center;
`;

export default Coin;

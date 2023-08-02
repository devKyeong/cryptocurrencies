import { styled } from "styled-components";

interface IPrice {
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
}

interface PriceProps {
  coinId: string;
  price?: IPrice;
}

function Price({ coinId, price }: PriceProps) {
  return (
    <>
      <OverView>
        <OverViewItem>
          <span>최고가</span>
          <span>₩ {Math.round(price?.ath_price || 0).toLocaleString()}</span>
        </OverViewItem>
        <OverViewItem>
          <span>기록일자</span>
          <span>
            {
              new Date(price?.ath_date || Date.now())
                .toISOString()
                .split("T")[0]
            }
          </span>
        </OverViewItem>
      </OverView>
      {price && (
        <Trending>
          <TrendingItem trendingArrow={price?.percent_change_24h}>
            <div>
              <span>하루 전보다</span>
              <span>{price?.percent_change_24h}</span>
            </div>
            <div>
              <span className="material-symbols-outlined">
                {price?.percent_change_24h === 0
                  ? "trending_flat"
                  : price?.percent_change_24h > 0
                  ? "trending_up"
                  : price?.percent_change_24h < 0 && "trending_down"}
              </span>
            </div>
          </TrendingItem>
          <TrendingItem trendingArrow={price?.percent_change_7d}>
            <div>
              <span>일주일 전보다</span>
              <span>{price?.percent_change_7d}</span>
            </div>
            <div>
              <span className="material-symbols-outlined">
                {price?.percent_change_7d === 0
                  ? "trending_flat"
                  : price?.percent_change_7d > 0
                  ? "trending_up"
                  : price?.percent_change_7d < 0 && "trending_down"}
              </span>
            </div>
          </TrendingItem>
          <TrendingItem trendingArrow={price?.percent_change_30d}>
            <div>
              <span>한달 전보다</span>
              <span>{price?.percent_change_30d}</span>
            </div>
            <div>
              <span className="material-symbols-outlined">
                {price?.percent_change_30d === 0
                  ? "trending_flat"
                  : price?.percent_change_30d > 0
                  ? "trending_up"
                  : price?.percent_change_30d < 0 && "trending_down"}
              </span>
            </div>
          </TrendingItem>
          <TrendingItem trendingArrow={price?.percent_change_1y}>
            <div>
              <span>일년 전보다</span>
              <span>{price?.percent_change_1y}</span>
            </div>
            <div>
              <span className="material-symbols-outlined">
                {price?.percent_change_1y === 0
                  ? "trending_flat"
                  : price?.percent_change_1y > 0
                  ? "trending_up"
                  : price?.percent_change_1y < 0 && "trending_down"}
              </span>
            </div>
          </TrendingItem>
        </Trending>
      )}
    </>
  );
}

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

const Trending = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
`;
const TrendingItem = styled.div<{ trendingArrow: number }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.4);
  padding: 10px 20px;
  border-radius: 10px;

  & > :first-child {
    display: flex;
    flex-direction: column;

    font-size: 13px;

    :last-child {
      color: ${({ trendingArrow }) =>
        trendingArrow > 0
          ? "#FC427B"
          : trendingArrow < 0
          ? "#1B9CFC"
          : "inherit"};
      font-size: 40px;
    }
  }

  span.material-symbols-outlined {
    font-size: 60px;
    color: ${({ trendingArrow }) =>
      trendingArrow > 0
        ? "#FC427B"
        : trendingArrow < 0
        ? "#1B9CFC"
        : "inherit"};
  }
`;

export default Price;

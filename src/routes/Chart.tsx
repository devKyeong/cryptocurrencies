import ReactApexChart from "react-apexcharts";
import { useQuery } from "react-query";
import { fetchCoinHistory } from "../api";
import { useRecoilValue } from "recoil";
import { isDarkAtom } from "../atoms";

interface ChartProps {
  coinId: string;
  coinName: string | undefined;
}

interface ICoinHistory {
  time_open: number;
  time_close: number;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  market_cap: number;
}

function Chart({ coinId, coinName }: ChartProps) {
  const { isLoading, data } = useQuery<ICoinHistory[]>(
    ["coinHistory", coinId],
    () => fetchCoinHistory(coinId)
  );

  const isDark = useRecoilValue(isDarkAtom);

  let chartData = data ?? [];
  if ("error" in chartData) chartData = [];

  if (isLoading) return <h1>Loading...</h1>;

  return (
    <ReactApexChart
      series={[
        {
          type: "candlestick",
          data:
            chartData?.map((price) => ({
              x: new Date(price.time_close * 1000),
              y: [price.open, price.high, price.low, price.close],
            })) || [],
        },
      ]}
      options={{
        noData: {
          text: "데이터가 없습니다.",
        },
        theme: {
          mode: isDark ? "dark" : "light",
        },
        chart: {
          type: "candlestick",
          background: "transparent",
          toolbar: { show: false },
        },
        title: {
          text: `${coinName} price`,
          align: "left",
        },
        xaxis: {
          type: "datetime",
        },
        yaxis: {
          labels: {
            formatter: (val) => `$ ${val.toLocaleString()}`,
          },
        },
        tooltip: {
          shared: true,
          custom: [
            ({ seriesIndex, dataPointIndex, w }) => {
              var o = w.globals.seriesCandleO[seriesIndex][dataPointIndex];
              var h = w.globals.seriesCandleH[seriesIndex][dataPointIndex];
              var l = w.globals.seriesCandleL[seriesIndex][dataPointIndex];
              var c = w.globals.seriesCandleC[seriesIndex][dataPointIndex];
              return `<ul style='background:transparent;font-size:12px;padding:5px'>
                <li>OPEN : <span style='font-weight:400'>${Math.round(
                  parseFloat(o)
                ).toLocaleString()}</span></li>
                <li>CLOSE : <span style='font-weight:400'>${Math.round(
                  parseFloat(c)
                ).toLocaleString()}</span></li>
                <li>HIGH : <span style='font-weight:400'>${Math.round(
                  parseFloat(h)
                ).toLocaleString()}</span></li>
                <li>LOW : <span style='font-weight:400'>${Math.round(
                  parseFloat(l)
                ).toLocaleString()}</span></li>
              </ul>`;
            },
          ],
        },
        stroke: {
          curve: ["smooth"],
          width: [1],
        },
        plotOptions: {
          candlestick: {
            colors: {
              upward: "#EAB543",
              downward: "#1B9CFC",
            },
            wick: {
              useFillColor: true,
            },
          },
        },
        legend: { show: false },
      }}
    />
  );
}

export default Chart;

import { useQuery } from 'react-query';
import { fetchCoinHistory } from './api';
import ApexChart from 'react-apexcharts';
import React from 'react';
import ReactDOM from 'react-dom';

interface IHistorycal {
  time_open: string;
  time_close: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  market_cap: number;
}
interface ChartProps {
  coinId: string;
}

function Price({ coinId }: ChartProps) {
  const { isLoading, data } = useQuery<IHistorycal[]>(
    ['ohlcv', coinId],
    () => fetchCoinHistory(coinId),
    {
      refetchInterval: 10000,
    }
  );

  return (
    <ApexChart
      type="candlestick"
      name="candle"
      series={
        [
          // {
          //   data: data?.map((price) => {
          //     return [Date.parse(price.time_close), price.open, price.high, price.low, price.close];
          //   }),
          // },
        ]
      }
      options={{
        theme: {
          mode: 'dark',
        },
        chart: {
          type: 'candlestick',
          height: 350,
          width: 500,
          toolbar: {
            show: false,
          },
          background: 'transparent',
        },
        stroke: {
          curve: 'smooth',
          width: 2,
        },
        yaxis: {
          show: false,
        },
        xaxis: {
          type: 'datetime',
          categories: data?.map((price) => price.time_close),
          labels: {
            style: {
              colors: '#9c88ff',
            },
          },
        },
        plotOptions: {
          candlestick: {
            colors: {
              upward: '#3C90EB',
              downward: '#DF7D46',
            },
          },
        },
      }}
    />
  );
}
export default Price;

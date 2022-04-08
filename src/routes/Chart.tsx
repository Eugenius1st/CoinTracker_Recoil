import { useQuery } from 'react-query';
import { fetchCoinHistory } from './api';
import ApexChart from 'react-apexcharts';

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

function Chart({ coinId }: ChartProps) {
  const { isLoading, data } = useQuery<IHistorycal[]>(
    ['ohlcv', coinId],
    () => fetchCoinHistory(coinId),
    {
      refetchInterval: 10000,
    }
  );
  //14개를 받아와야 하므로 배열로 전달.
  return (
    <div>
      {isLoading ? (
        'Loading chart...'
      ) : (
        <ApexChart
          type="line"
          series={[
            {
              name: 'price',
              data: data?.map((price) => price.close) as number[],

              // 맵함수는 리턴하는 값으로 array를 만들어 준다.
              //as 를 이용하셔도 됩니다. 저 데이터는 number 배열이다! 라고강제함.
              // 맵함수는 리턴하는 값으로 array를 만들어 준다.
            },
          ]}
          //series는 보내고 싶은 모든 data가 들어있다.
          options={{
            theme: { mode: 'dark' },
            chart: {
              width: 500,
              height: 300,
              toolbar: { show: false },
              background: 'transparents',
            },
            grid: { show: false },
            stroke: { curve: 'smooth', width: 3 },
            yaxis: { show: false },
            xaxis: {
              labels: { show: false },
              axisTicks: { show: false },
              axisBorder: { show: false },
              type: 'datetime',
              categories: data?.map((price) => price.time_close),
            },
            fill: {
              type: 'gradient',
              gradient: { gradientToColors: ['#0be881'], stops: [0, 100] },
            },
            colors: ['blue'],
            tooltip: { y: { formatter: (value) => `$ ${value.toFixed(3)}` } },
          }}
        />
        //apexvhart는 위와같이 다양한 옵션이 있다.
        //일일히 options 수정하는게 어렵다면 apex사이트의 [demos] 로 가서 이미 만들어져 있는 것들을 사용하자.
      )}
    </div>
  );
}
// const params = useParams();
// console.log(params);
//coinId 가져오기 또는 서브 Router 에서 porps로 받아오기 한다..
export default Chart;

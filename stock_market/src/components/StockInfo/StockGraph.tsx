import { useSelector } from "react-redux";
import { RootState } from "../../redux/store/Store";
import { useEffect, useState } from "react";
import { Bar } from 'react-chartjs-2';
import "chart.js/auto";
import zoomPlugin from 'chartjs-plugin-zoom';
import { Chart as ChartJS} from 'chart.js';
ChartJS.register(zoomPlugin);


export default function StockGraph() {
  const { stockDetail } = useSelector((state: RootState) => state.stocks);
  const [prices, setPrices] = useState<number[]>([]);
  const [labels, setLabels] = useState<number[]>([]);
  const [time, setTime] = useState<number>(0);
  const [color, setColor] = useState<string[]>([]);

  useEffect(() => {
    if (stockDetail && stockDetail.newPrice < 500) {
      setPrices(prevPrices => [...prevPrices, stockDetail.newPrice]);
      setLabels(prevLabels => [...prevLabels, time]);
      setTime(prevTime => prevTime + 5);
      setColor(prev => [...prev,stockDetail.isPositive ? '#2f9e44' : '#e03131']);
    }
  }, [stockDetail]);


  const chartData = {
    labels: labels, 
    datasets: [
      {
        label: 'Stock Price',
        backgroundColor: color, 
        borderColor: 'rgba(0, 0, 0, 1)',
        borderWidth: 2,
        data: prices,
        barPercentage: 1,
        categoryPercentage: 1,
        barThickness: 20
      },
    ],
  };

  return (
    <div style={{height: '500px', overflowX: 'scroll' }}>
      <Bar
        data={chartData}
        options={{
          maintainAspectRatio: false,
          scales: {
            x: {
              beginAtZero: true,
              min: 0,
              type: 'linear',
              grid: {
                display: true,
              },
              ticks: {
                stepSize: 5,
              },
            },
            y: {
              beginAtZero: true,
              type: 'linear',
              grid: {
                display: true,
              },
            },
          },
          plugins: {
            legend: {
              display: false,
            },
            zoom: { 
              pan: {
                enabled: true,
                mode: 'x',
              },
              limits: {
                x: { min: 5, max: 7 },
              },

            },
          },
          indexAxis: 'x', 
        }} 
      />
    </div>
  );
}

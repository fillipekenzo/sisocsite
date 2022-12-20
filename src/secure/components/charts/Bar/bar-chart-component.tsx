import React from "react";
import { Bar, Line } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, Title, BarElement } from 'chart.js';
import Style from './bar-chart-component.module.scss'

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);


interface BarChartProp {
  data: any
}


export const options = {
  maintainAspectRatio: false,
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
  },
};


const BarChart: React.FC<BarChartProp> = (props) => {
  return (
    <>
      <article className={Style.canvasContainer}>
        <Bar data={props.data} redraw={true} options={options}></Bar>
      </article>
    </>
  );
}

export default BarChart;

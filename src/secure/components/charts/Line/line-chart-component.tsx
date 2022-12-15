import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);


interface LineChartProp{
    data:any
}


const LineChart: React.FC<LineChartProp> = (props) => {
  return (
    <>
        <LineChart data={props.data}></LineChart>
    </>
  );
}

export default LineChart;

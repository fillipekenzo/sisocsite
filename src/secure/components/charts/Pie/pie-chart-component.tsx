import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import Style from './pie-chart-component.module.scss'

ChartJS.register(ArcElement, Tooltip, Legend);


interface LineChartProp {
    data: any
}

const options = {
    maintainAspectRatio: false	// Don't maintain w/h ratio
  }

const PieChart: React.FC<LineChartProp> = (props) => {
    return (
        <>
            <article className={Style.canvasContainer}> 
                <Pie data={props.data} redraw={true} options={options} ></Pie>
            </article>
        </>
    );
}

export default PieChart;

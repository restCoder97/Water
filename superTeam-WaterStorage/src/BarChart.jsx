// References
// https://www.youtube.com/watch?v=RF57yDglDfE
// https://codesandbox.io/s/jebqk?file=/App.tsx:328-335

import { useState, useEffect } from "react";
import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

import { Bar } from 'react-chartjs-2';
// 新增代码
import sendGetRequest from "./request";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

// Set fond size of tick labels in the stacked bar chart
ChartJS.defaults.font.size = 15;

// Options for the style of the chart js
export const options = {
  plugins: {
    legend: {
      display: false,
    },
  },
  aspectRatio: 1.5,
  responsive: true,
  scales: {
    x: {
      stacked: true,
      tickWidth: 10,
      grid: {
        borderWidth: 2,
        borderColor: 'grey',
        display: false,
      },
      ticks: {
        maxRotation: 60,
        minRotation: 60,
      },
    },
    y: {
      stacked: true,
      grid: {
        borderWidth: 2,
        borderColor: 'grey',
        display: false,
      },      
    },
  },
};

// Hard coded reservoir name, code and capacity
const reservoirNames = ['Shasta', 'Ororville', 'Trinity Lake', 'New Melones', 'San Luis', 'Don Pedro', 'Berryessa'];
const reservoirCodes = ['SHA', 'ORO', 'CLE', 'NML', 'SNL', 'DNP', 'BER'];
const reservoirCaps  = [4552000, 3537577, 2447650, 2400000, 2041000, 2030000, 1602000];

// Component function for BarChart
function BarChart({ chartData }) {
  // Construct data to show on stacked bar chart
  const data = {
    labels: reservoirNames,
    datasets: [
      {
        label: 'water level',
        data: chartData,
        backgroundColor: '#429198',
        barPercentage: 0.7,
      },
      {
        label: 'remaining capacity',
        data: reservoirCaps.map((cap, idx) => cap - chartData[idx]),
        backgroundColor: '#78c7e3',
        barPercentage: 0.7,
      },
    ],
  };

  // Return components, using chart.js definition
  return <Bar data={data} options={options} />;
}

export default BarChart;

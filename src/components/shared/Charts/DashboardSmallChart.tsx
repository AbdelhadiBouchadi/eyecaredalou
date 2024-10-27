'use client';

import React from 'react';
import Chart from 'react-apexcharts';

interface DashboardSmallChartProps {
  data: number[]; // Array of numbers for chart data
  colors: string; // Color of the bars
}

const DashboardSmallChart = ({ data, colors }: DashboardSmallChartProps) => {
  const options: ApexCharts.ApexOptions = {
    chart: {
      id: 'basic-bar',
      sparkline: {
        enabled: true,
      },
      toolbar: {
        show: false,
      },
      animations: {
        enabled: true,
        easing: 'easeinout',
        speed: 400,
        animateGradually: {
          enabled: true,
          delay: 150,
        },
        dynamicAnimation: {
          enabled: true,
          speed: 150,
        },
      },
    },
    xaxis: {
      categories: [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
      ],
      labels: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    yaxis: {
      show: false,
    },
    dataLabels: {
      enabled: false,
    },
    tooltip: {
      custom: function ({ series, seriesIndex, dataPointIndex }) {
        return `<div class="bg-white py-2 px-2 text-xs border-[.5px] border-border"> 
                 Total: <span class="font-semibold"> ${series[seriesIndex][dataPointIndex]} </span>
               </div>`;
      },
    },
    grid: {
      show: false,
    },
    plotOptions: {
      bar: {
        columnWidth: '75%',
        distributed: false,
        borderRadius: 2,
      },
    },
    colors: [colors],
  };

  const series = [
    {
      name: 'series-1',
      data: data,
    },
  ];

  return (
    <Chart
      options={options}
      series={series}
      type="bar"
      width="100%"
      height={50}
    />
  );
};

export default DashboardSmallChart;

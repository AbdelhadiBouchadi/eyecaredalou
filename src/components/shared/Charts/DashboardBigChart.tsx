'use client';

import React from 'react';
import Chart from 'react-apexcharts';

const DashboardBigChart = () => {
  const options: ApexCharts.ApexOptions = {
    chart: {
      id: 'area-datetime',
      toolbar: {
        show: false,
      },
      animations: {
        enabled: true,
        easing: 'easeinout',
        speed: 1000,
        animateGradually: {
          enabled: true,
          delay: 150,
        },
        dynamicAnimation: {
          enabled: true,
          speed: 800,
        },
      },
    },
    xaxis: {
      categories: [
        'Janvier',
        'Février',
        'Mars',
        'Avril',
        'Mai',
        'Juin',
        'Juillet',
        'Août',
        'Septembre',
        'Octobre',
        'Novembre',
        'Décembre',
      ],
      labels: {
        show: true,
        style: {
          colors: '#A0A0A0',
          fontSize: '12px',
          fontWeight: 400,
        },
      },
      axisTicks: {
        show: false,
      },
    },

    yaxis: {
      show: true,
      labels: {
        show: true,
        style: {
          colors: '#A0A0A0',
          fontSize: '10px',
          fontWeight: 400,
        },
        formatter: function (value) {
          return value + 'k';
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
    tooltip: {
      custom: function ({ series, seriesIndex, dataPointIndex, w }) {
        return (
          '<div className="bg-white py-2 px-2 text-xs border-[.5px] border-border">' +
          'Total:' +
          ' ' +
          '<span className="font-semibold">' +
          series[seriesIndex][dataPointIndex] +
          '</span>' +
          '</div>'
        );
      },
    },
    grid: {
      show: true,
      borderColor: '#E8EBEE',
      strokeDashArray: 4,
      position: 'back',
    },
    stroke: {
      curve: 'smooth',
      width: 1,
    },

    fill: {
      type: 'gradient',
      gradient: {
        shade: 'light',
        type: 'vertical',
        shadeIntensity: 0.5,
        inverseColors: true,
        opacityFrom: 0.5,
        opacityTo: 0,
        stops: [0, 100],
      },
    },
    colors: ['#07b8db'],
  };
  const series = [
    {
      name: 'Total',
      data: [30, 40, 25, 50, 49, 21, 70, 51, 42, 60, 40, 20],
    },
  ];

  return (
    <Chart
      options={options}
      series={series}
      type="area"
      width="100%"
      height={300}
    />
  );
};

export default DashboardBigChart;

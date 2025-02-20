'use client';

import React from 'react';
import dynamic from 'next/dynamic';
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

interface DashboardBigChartProps {
  patientStats: number[];
  appointmentStats: number[];
}

const DashboardBigChart = ({
  patientStats,
  appointmentStats,
}: DashboardBigChartProps) => {
  // Get current month index (0-11)
  const currentMonth = new Date().getMonth();

  // Get month names starting from current month
  const months = [
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
  ];

  // Rotate the months array so it starts with the current month
  const rotatedMonths = [
    ...months.slice(currentMonth),
    ...months.slice(0, currentMonth),
  ];

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
      categories: rotatedMonths,
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
      },
    },
    dataLabels: {
      enabled: false,
    },
    tooltip: {
      shared: true,
      custom: undefined,
      x: {
        format: 'dd MMM yyyy',
      },
      y: {
        formatter: function (value) {
          return value.toString();
        },
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
      width: 2,
    },
    fill: {
      type: 'gradient',
      gradient: {
        shade: 'light',
        type: 'vertical',
        shadeIntensity: 0.5,
        inverseColors: false,
        opacityFrom: 0.5,
        opacityTo: 0,
        stops: [0, 100],
      },
    },
    colors: ['#07b8db', '#F9C851'],
    legend: {
      show: true,
      position: 'top',
      horizontalAlign: 'right',
    },
  };

  const series = [
    {
      name: 'Patients',
      data: patientStats,
    },
    {
      name: 'Rendez-vous',
      data: appointmentStats,
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

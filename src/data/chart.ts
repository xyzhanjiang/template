export default [
  {
    series: [{
      name: 'series1',
      data: [31, 40, 28, 51, 42, 109, 100]
    }, {
      name: 'series2',
      data: [11, 32, 45, 32, 34, 52, 41]
    }],
    chart: {
      height: 350,
      type: 'area'
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: 'smooth'
    },
    xaxis: {
      type: 'datetime',
      categories: [
        '2020-07-19T00:00:00.000Z',
        '2020-07-19T01:30:00.000Z',
        '2020-07-19T02:30:00.000Z',
        '2020-07-19T03:30:00.000Z',
        '2020-07-19T04:30:00.000Z',
        '2020-07-19T05:30:00.000Z',
        '2020-07-19T06:30:00.000Z'
      ]
    },
    tooltip: {
      x: {
        format: 'dd/MM/yy HH:mm'
      },
    },
  },
  {
    series: [{
      name: 'Label',
      type: 'column',
      data: [440, 505, 414, 671, 227, 413, 201, 352, 752, 320, 257, 160]
    }, {
      name: 'Label',
      type: 'line',
      data: [23, 42, 35, 27, 43, 22, 17, 31, 22, 22, 12, 16]
    }],
    chart: {
      height: 350,
      type: 'line',
    },
    stroke: {
      width: [0, 4]
    },
    title: {
      text: 'Traffic Sources'
    },
    dataLabels: {
      enabled: true,
      enabledOnSeries: [1]
    },
    labels: ['01 Jan 2001', '02 Jan 2001', '03 Jan 2001', '04 Jan 2001', '05 Jan 2001', '06 Jan 2001', '07 Jan 2001', '08 Jan 2001', '09 Jan 2001', '10 Jan 2001', '11 Jan 2001', '12 Jan 2001'],
    xaxis: {
      type: 'datetime'
    },
    yaxis: [{
      title: {
        text: 'Website Blog',
      },
    }, {
      opposite: true,
      title: {
        text: 'Social Media'
      }
    }]
  }
]

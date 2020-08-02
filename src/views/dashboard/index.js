import React from 'react'
import { Link } from 'react-router-dom'
import ApexCharts from 'apexcharts'

import chartData from '@/data/chart'

export default function Dashboard() {

  React.useEffect(() => {
    let chart1 = new ApexCharts(document.querySelector('#chart1'), chartData[0])
    chart1.render()

    let chart2 = new ApexCharts(document.querySelector('#chart2'), chartData[1])
    chart2.render()

    return () => {
      chart1.destroy() // 插件的方法
      chart1 = null

      chart2.destroy()
      chart2 = null
    }
  }, [])

  return (
    <>
      <nav className="breadcrumb" aria-label="breadcrumbs">
        <ul>
          <li><Link to="/">Home</Link></li>
          <li className="is-active"><a href="#" aria-current="page">Dashboard</a></li>
        </ul>
      </nav>
      <section className="section">
        <div className="tile is-ancestor has-text-centered">
          <div className="tile is-parent">
            <article className="tile is-child box notification is-primary">
              <p className="title">439k</p>
              <p className="subtitle">Users</p>
            </article>
          </div>
          <div className="tile is-parent">
            <article className="tile is-child box notification is-warning">
              <p className="title">59k</p>
              <p className="subtitle">Products</p>
            </article>
          </div>
          <div className="tile is-parent">
            <article className="tile is-child box notification is-info">
              <p className="title">3.4k</p>
              <p className="subtitle">Open Orders</p>
            </article>
          </div>
          <div className="tile is-parent">
            <article className="tile is-child box notification is-danger">
              <p className="title">19</p>
              <p className="subtitle">Exceptions</p>
            </article>
          </div>
        </div>
        <div className="columns">
          <div className="column">
            <article className="message is-link">
              <div className="message-header">
                <p>Chart</p>
              </div>
              <div className="message-body">
                <div id="chart1"></div>
              </div>
            </article>
          </div>
          <div className="column">
            <article className="message is-success">
              <div className="message-header">
                <p>Chart</p>
              </div>
              <div className="message-body">
                <div id="chart2"></div>
              </div>
            </article>
          </div>
        </div>
      </section>
    </>
  )
}
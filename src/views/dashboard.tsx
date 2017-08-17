import * as React from "react";
import {Page, Toolbar, List, ListItem, PullHook} from "react-onsenui";
import {notification} from "onsenui";


import {Task, AppState, TaskState} from "../data";
import * as Chart from "react-chartjs-2";

export interface DashboardPageProps extends AppState{
}

export class DashboardPage extends React.Component<DashboardPageProps, {}> {

  state = {
  }

  randomData(max: number, length: number){
      const list:number[] = [];
      for(let i=0 ; i<length ; i++){
        const element = Math.floor(Math.random() * (max + 1));
        list.push(element);
      }
      return list
  }

  render() {
    const barOptions = {
        title:{
            display:false,
            text:""
        },
        tooltips: {
            mode: 'index',
            intersect: false
        },
        responsive: true,
        scales: {
            xAxes: [{
                stacked: true,
            }],
            yAxes: [{
                stacked: true,
                tickes:{
                    stepSize: 1
                }
            }]
        }
    }
    const barData = {
        labels: ["2週間前","","","","","","","1週間前","","","","","","","今日"],
        datasets: [{
            label: "足し算",
            backgroundColor: "#FCC",
            data: this.randomData(2,15)
        },{
            label: "引き算",
            backgroundColor: "#CCF",
            data: this.randomData(2,15)
        }]
    }

    const doughnutOptions = {
        responsive: true,
        legend: {
            position: 'top',
        },
        title: {
            display: false,
            text: ''
        },
        animation: {
            animateScale: true,
            animateRotate: true
        }
    }

    const doughnutData = {
        datasets: [{
            data: [75, 25],
            backgroundColor:["#FCC", "#DDD"]
        }],
        labels: ["完了", "残り"]
    }

    return <Page renderToolbar={() =>{
          return <Toolbar>
                    <div className="center">活動</div>
            </Toolbar>
        }}>
        <div className="scrollable fill">
            <h2>過去2週間の完了ミッション</h2>
            <Chart.Bar
                data={barData}
                options={barOptions}
                width={300}
                height={160}/>
                <h2>キャンペーン</h2>
            <div className="dashboard-campaign-container">
            <Chart.Doughnut
                data={doughnutData}
                options={doughnutOptions}
                width={120}
                height={120}/>
            </div>
        </div>
      </Page>
  }
}
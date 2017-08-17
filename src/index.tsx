import * as React from "react";
import * as ReactDOM from "react-dom";
import * as ReactRouter from "react-router";

import {Page, Tabbar, Tab, Toolbar, Navigator} from "react-onsenui";
import "onsenui";

import "../style/index.css";
import {Task, Mode, AppState, TaskState, Scheduler} from "./data";
import {HomePage} from "./views/home";
import {DashboardPage} from "./views/dashboard";
import {RegisterPage} from "./views/register";
import {RegisterWizardPage} from "./views/register-wizard";

const injectTapEventPlugin = require("react-tap-event-plugin");
injectTapEventPlugin();


class SettingsPage extends React.Component<any, any> {
    render() {
        return <Page renderToolbar={() => {
                return <Toolbar>
                        <div className="center">設定</div>
                    </Toolbar>
                }}>
                <div>
                    おうちMission
                </div>
            </Page>
    }
}

class SchedulePage extends React.Component<any, any> {
  render() {
      return <Page renderToolbar={() => {
              return <Toolbar>
                      <div className="center">スケジュール</div>
                  </Toolbar>
              }}>
              <div>
                  おうちMission
              </div>
          </Page>
  }
}

class Root extends React.Component<{}, AppState> {
  state:AppState = {
    mode: Mode.Normal,
    history: [],
    tasks: [{
      id: "a0",
      type: "minus",
      kind: "掃除",
      title: "玄関を掃除する",
      rank: 1,
      state: TaskState.Ready,
      doneDate: null,
      dueDate: new Date()
    },{
      id: "a1",
      type: "minus",
      kind: "ゴミ出し",
      title: "燃えるゴミを出す",
      rank: 1,
      state: TaskState.Ready,
      doneDate: null,
      dueDate: new Date()
    },{
      id: "a2",
      type: "plus",
      kind: "買い物",
      title: "ゴミ袋を買う",
      rank: 1,
      state: TaskState.Ready,
      doneDate: null,
      dueDate: new Date()
    }],
    schedules: [],
    tabIndex: 2
  }

  componentDidMount(){
    window["root"] = this;
  }

  componentWillUnmount(){
    window["root"] = null;
  }

  onRequestChangeMode(navigator, mode: Mode){
    console.log(mode);
    navigator.resetPage({
      title: Mode[mode],
      hasBackButton: false
    });
  }

  onRequestCreateNewSchedule(task: Task, schedular: Scheduler){
    if(schedular.repeat === "now"){
      task.state = TaskState.Ready;
    }

    const tasks = this.state.tasks.concat(task);
    this.setState({tasks: tasks});
  }

  onRequestDoneTask(task: Task){
    const tasks = [].concat(this.state.tasks);
    for(let i=0; i<tasks.length; i++){
      const target = tasks[i];
      if(target.id === task.id){
        const newTask = {...target, doneDate: new Date(), state: TaskState.Done};
        tasks[i] = newTask;
      }
    }
    this.setState({tasks: tasks});
  }

  renderTabs(route, navigator, index) {
    console.log("render-tabs", index);
    return [
      {
        content: <RegisterPage onRequestChangeMode={this.onRequestChangeMode.bind(this, navigator)}/>,
        tab: <Tab label="タスク登録" icon="md-plus-square" />
      },
      {
        content: <HomePage {...this.state} onRequestDoneTask={this.onRequestDoneTask.bind(this)}/>,
        tab: <Tab label="ミッション" icon="md-home" />
      },
      {
        content: <DashboardPage {...this.state}/>,
        tab: <Tab label="活動" icon="md-trending-up" />
      },
      {
        content: <SchedulePage />,
        tab: <Tab label="スケジュール" icon="md-alarm" />
      },
      {
        content: <SettingsPage />,
        tab: <Tab label="設定" icon="md-settings" />
      }
    ]
  }

  renderPage(route, navigator){
    const mode:Mode = Mode[route.title as string];
    if(mode === Mode.Normal){
      return <Page key={mode}>
          <Tabbar index={this.state.tabIndex}
            renderTabs={this.renderTabs.bind(this, route, navigator)}
            animation="none"
            onPreChange={(event)=> {
              if(this.state.tabIndex !== event.index){
                this.setState({tabIndex: event.index}) 
              }
              }} />
      </Page>
    }else if(mode === Mode.RegisterWizardPlus){
      return <RegisterWizardPage
        key={mode}
        type="plus"
        onRequestChangeMode={this.onRequestChangeMode.bind(this, navigator)}
        onRequestCreate={this.onRequestCreateNewSchedule.bind(this)}/>
    }else if(mode === Mode.RegisterWizardMinus){
      return <RegisterWizardPage
        key={mode}
        type="minus"
        onRequestChangeMode={this.onRequestChangeMode.bind(this, navigator)}
        onRequestCreate={this.onRequestCreateNewSchedule.bind(this)}/>
    }else{
      return <Page key={mode}/>
    }
  }

  render() {
    return <Navigator
      renderPage={this.renderPage.bind(this)}
      initialRoute={{
        title: Mode[this.state.mode],
        hasBackButton: false
      }}
      animation="lift"
    />
  }
}


document.addEventListener("DOMContentLoaded", ()=>{
    function isScrollable(element: HTMLElement){
      if(element.className.indexOf("scrollable") >= 0){
        return true;
      } else {
        if (element === document.body) {
          return false;
        } else {
          const parent = element.parentElement;
          if (parent) {
            return isScrollable(parent);
          } else {
            return false;
          }
        }
      }
    }
    function preventScroll(e :TouchEvent){
      if(isScrollable(e.target as any)){

      }else{
        e.preventDefault();
      }
    }

    window.addEventListener("beforeunload", ()=>{
      document.getElementById("content").removeEventListener("touchmove", preventScroll);

      ReactDOM.unmountComponentAtNode(document.getElementById("content"));
    });

    ReactDOM.render(<Root/>, document.getElementById("content"));

    document.getElementById("content").addEventListener("touchmove", preventScroll, true);
});


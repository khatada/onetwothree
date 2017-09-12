import * as React from "react";
import {Page, Toolbar, List, ListItem, PullHook} from "react-onsenui";
import {notification} from "onsenui";

import {TaskView} from "./components/task";
import {Task, AppState, TaskState} from "../data";

export interface HomePageProps extends AppState{
  onRequestDoneTask: (task: Task)=>void;
}

export class HomePage extends React.Component<HomePageProps, {}> {

  state = {
    pullHookState: "initial",
    segment: 0
  }

  handlePullHookChange(e){
    this.setState({pullHookState: e.state});
  }

  onTaskClick(task: Task){
    notification.confirm({
      title: "確認",
      message: `"${task.title}"を完了します`,
      callback: (result)=>{
          if(result){
              this.props.onRequestDoneTask(task);
          }
      }
  })
  }

  onChageSegment(id, e){
    this.setState({segment: id});
  }

  renderPullHookContent(){
    switch (this.state.pullHookState) {
      case "initial":
        return "Pull to refresh";
      case "preaction":
        return "Release";
      case "action":
        return "Loading...";
    }
  }

  renderRow(row: Task, index: number) {
    return <ListItem key={index} onClick={this.onTaskClick.bind(this, row)}>
      <div className="left">
          <img src={row.image} className="list-item__thumbnail" />
      </div>
      <div className='center'>
        {row.title}
      </div>
    </ListItem>
  }

  render() {
    return <Page renderToolbar={() =>{
          return <Toolbar>
                    <div className="center">ミッション</div>
      </Toolbar>
    }}>
      <PullHook onChange={this.handlePullHookChange.bind(this)} thresholdHeight={200}>
        {this.renderPullHookContent()}
      </PullHook>
      <div style={{padding: 10}}>
        <div className="segment" style={{ width: "100%", margin: 0}}>
          <div className="segment__item">
            <input type="radio" className="segment__input" name="segment-a" onChange={this.onChageSegment.bind(this, 0)} checked={this.state.segment === 0} />
            <button className={this.state.segment === 0 ? "segment__button segment-radio-selected-fix" : "segment__button"}>
              今日のミッション
              </button>
          </div>
          <div className="segment__item">
            <input type="radio" className="segment__input" name="segment-a" onChange={this.onChageSegment.bind(this, 1)} checked={this.state.segment === 1}/>
            <button className={this.state.segment === 1 ? "segment__button segment-radio-selected-fix" : "segment__button"}>
              完了したミッション
              </button>
          </div>
        </div>
      </div>
      {(()=>{
        if (this.state.segment === 0) {
          return <List dataSource={this.props.tasks.filter((task) => task.state === TaskState.Ready)}
            renderRow={this.renderRow.bind(this)}>
          </List>
        } else {
          return <List dataSource={this.props.tasks.filter((task) => task.state === TaskState.Done)}
            renderRow={this.renderRow.bind(this)}>
          </List>
        }
      })()}

    </Page>
  }
}
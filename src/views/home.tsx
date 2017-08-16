import * as React from "react";
import {Page, Toolbar, List, ListItem, PullHook} from "react-onsenui";

import {TaskView} from "./components/task";
import {Task, AppState} from "../data";

export class HomePage extends React.Component<AppState, {}> {

  state = {
    pullHookState: "initial"
  }

  handlePullHookChange(e){
    this.setState({pullHookState: e.state});
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
    return <ListItem key={index}>
      <div className="left">
          <img src={`http://placekitten.com/g/40/40`} className="list-item__thumbnail" />
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
        <List dataSource={this.props.tasks} renderRow={this.renderRow.bind(this)}>
        </List>
      </Page>
  }
}
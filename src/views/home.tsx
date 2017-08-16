import * as React from "react";
import {Page, Tabbar, Tab, Toolbar} from "react-onsenui";

import {TaskView} from "./components/task";
import {Task, AppState} from "../data";

// export class Home extends React.Component<AppState, any> {
//     render() {
//         return <div className="fill">
//             <AppBar title="ミッション" showMenuIconButton={false}/>
//             <div className="task-list">
//                 {this.props.todayTasks.map((task)=>{
//                     return <TaskView task={task}/>
//                 })}
//             </div>
//         </div>
//     }
// }

export class HomePage extends React.Component<any, any> {
  render() {
    return <Page renderToolbar={() =>{
          return <Toolbar>
                    <div className='center'>Title</div>
            </Toolbar>
        }}>
        <div>
            Home Page
        </div>
      </Page>
  }
}
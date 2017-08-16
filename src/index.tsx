import * as React from "react";
import * as ReactDOM from "react-dom";
import * as ReactRouter from "react-router";

import {Page, Tabbar, Tab, Toolbar} from "react-onsenui";
import "onsenui";

import "../style/index.css";
import {Task, AppState} from "./data";
import {HomePage} from "./views/home";
import {Goal} from "./views/goal";
import {Register} from "./views/register";

const injectTapEventPlugin = require("react-tap-event-plugin");
injectTapEventPlugin();


// export class Root extends React.Component<any, any> {
//     render() {
//         return <MuiThemeProvider>
//             <ReactRouter.Router ref="router" history={ReactRouter.hashHistory}>
//                 <ReactRouter.Route path="/" component={App}>
//                     <ReactRouter.IndexRoute component={Home}/>
//                     <ReactRouter.Route path="/register" component={Register}/>
//                     <ReactRouter.Route path="/goal" component={Goal}/>
//                     <ReactRouter.Route path="/setting" component={Home}/>
//                     <ReactRouter.Route path="/*" component={Home}/>
//                 </ReactRouter.Route>
//             </ReactRouter.Router>
//         </MuiThemeProvider>
//     }
// }

class SettingsPage extends React.Component<any, any> {
    render() {
        return <Page renderToolbar={() => {
                return <Toolbar>
                        <div className='center'>Title</div>
                    </Toolbar>
                }}>
                <div>
                    Settings Page
                </div>
            </Page>
    }
}

class Root extends React.Component<any, any> {
  renderTabs() {
    return [
      {
        content: <HomePage />,
        tab: <Tab label='Home' icon='md-home' />
      },
      {
        content: <SettingsPage />,
        tab: <Tab label='Settings' icon='md-settings' />
      }
    ]
  }

  render() {
    return <Tabbar index={0} renderTabs={this.renderTabs.bind(this)} animation="fade" />
  }
}


// export class App extends React.Component<any, AppState> {

//     state = {
//         todayTasks:[{
//             title: "トイレそうじ",
//             rank: 1
//         },{
//             title: "玄関そうじ",
//             rank: 2
//         },{
//             title: "ゴミ捨て（普通ゴミ）",
//             rank: 3
//         }]
//     };

//     navigate(path){
//         const history:ReactRouter.HistoryBase = this.props.history;
//         history.push(path);
//     }

//     render(){
//         return <div>
//             <div className="content-container">{React.cloneElement(this.props.children, {...this.state})}</div>
//             <div className="tab-container">
//                 <Tabs initialSelectedIndex={2}>
//                     <Tab disableTouchRipple={false} disableFocusRipple={false} icon={<FontIcon className="fa fa-plus-square-o"/>} onActive={this.navigate.bind(this, "/register")}/>
//                     <Tab disableTouchRipple={false} disableFocusRipple={false} icon={<FontIcon className="fa fa-heart-o"/>} onActive={this.navigate.bind(this, "/goal")}/>
//                     <Tab disableTouchRipple={false} disableFocusRipple={false} icon={<FontIcon className="fa fa-home"/>} onActive={this.navigate.bind(this, "/")}/>
//                     <Tab disableTouchRipple={false} disableFocusRipple={false} icon={<FontIcon className="fa fa-line-chart"/>} onActive={this.navigate.bind(this, "/setting")}/>
//                     <Tab disableTouchRipple={false} disableFocusRipple={false} icon={<FontIcon className="fa fa-cog"/>} onActive={this.navigate.bind(this, "/setting")}/>
//                 </Tabs>
//             </div>
//         </div>
//     }
// }

document.addEventListener("DOMContentLoaded", ()=>{
    window.addEventListener("beforeunload", ()=>{
        ReactDOM.unmountComponentAtNode(document.getElementById("content"));
    });

    ReactDOM.render(<Root/>, document.getElementById("content"));
});


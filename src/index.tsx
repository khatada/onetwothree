import * as React from "react";
import * as ReactDOM from "react-dom";
import * as ReactRouter from "react-router";

import {Page, Tabbar, Tab, Toolbar, Navigator} from "react-onsenui";
import "onsenui";

import "../style/index.css";
import {Task, Mode, AppState, TaskState} from "./data";
import {HomePage} from "./views/home";
import {RegisterPage} from "./views/register";
import {RegisterWizardPage} from "./views/register-wizard";

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
                        <div className="center">設定</div>
                    </Toolbar>
                }}>
                <div>
                    Settings Page
                </div>
            </Page>
    }
}

class Root extends React.Component<{}, AppState> {
  state:AppState = {
    mode: Mode.Normal,
    history: [],
    tasks: [{
      type: "minus",
      kind: "掃除",
      title: "玄関を掃除する",
      rank: 1,
      state: TaskState.Ready,
      doneDate: null,
      dueDate: new Date()
    },{
      type: "minus",
      kind: "ゴミ出し",
      title: "燃えるゴミを出す",
      rank: 1,
      state: TaskState.Ready,
      doneDate: null,
      dueDate: new Date()
    },{
      type: "plus",
      kind: "買い物",
      title: "ゴミ袋を買う",
      rank: 1,
      state: TaskState.Ready,
      doneDate: null,
      dueDate: new Date()
    }],
    schedules: []
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

  renderTabs(route, navigator) {
    return [
      {
        content: <RegisterPage onRequestChangeMode={this.onRequestChangeMode.bind(this, navigator)}/>,
        tab: <Tab label="タスク登録" icon="md-plus-square" />
      },
      {
        content: <HomePage {...this.state}/>,
        tab: <Tab label="ミッション" icon="md-home" />
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
          <Tabbar index={1} renderTabs={this.renderTabs.bind(this, route, navigator)} animation="fade" />
      </Page>
    }else if(mode === Mode.RegisterWizardPlus){
      return <RegisterWizardPage key={mode} type="plus" onRequestChangeMode={this.onRequestChangeMode.bind(this, navigator)}/>
    }else if(mode === Mode.RegisterWizardMinus){
      return <RegisterWizardPage key={mode} type="minus" onRequestChangeMode={this.onRequestChangeMode.bind(this, navigator)}/>
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
    function preventScroll(e :TouchEvent){
      e.preventDefault();
    }

    window.addEventListener("beforeunload", ()=>{
      document.getElementById("content").removeEventListener("touchmove", preventScroll);

      ReactDOM.unmountComponentAtNode(document.getElementById("content"));
    });

    ReactDOM.render(<Root/>, document.getElementById("content"));

    document.getElementById("content").addEventListener("touchmove", preventScroll, true);
});


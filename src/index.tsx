import * as React from "react";
import * as ReactDOM from "react-dom";
import * as ReactRouter from "react-router";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import {Tabs, Tab, FontIcon} from "material-ui";

import "../style/index.css";

const injectTapEventPlugin = require("react-tap-event-plugin");
injectTapEventPlugin();


export class Root extends React.Component<any, any> {
    render() {
        return <MuiThemeProvider>
            <ReactRouter.Router ref="router" history={ReactRouter.hashHistory}>
                <ReactRouter.Route path="/" component={App}>
                    <ReactRouter.IndexRoute component={Home}/>
                    <ReactRouter.Route path="/setting" component={Home}/>
                    <ReactRouter.Route path="/*" component={Home}/>
                </ReactRouter.Route>
            </ReactRouter.Router>
        </MuiThemeProvider>
    }
}

export class Home extends React.Component<any, any> {
    render() {
        return <div>Not Found</div>
    }
}

export class App extends React.Component<any, any> {

    navigate(){

    }

    render(){
        return <div>
            <div className="content-container">{React.cloneElement(this.props.children, {app: this.state})}</div>
            <div className="tab-container">
                <Tabs>
                    <Tab disableTouchRipple={true} disableFocusRipple={true} icon={<FontIcon className="fa fa-home"/>} onActive={this.navigate.bind(this, "/")} style={{backgroundColor: "#444"}}/>
                    <Tab disableTouchRipple={true} disableFocusRipple={true} icon={<FontIcon className="fa fa-cog"/>} onActive={this.navigate.bind(this, "/setting")} style={{backgroundColor: "#444"}}/>
                </Tabs>
            </div>
        </div>
    }
}

document.addEventListener("DOMContentLoaded", ()=>{
    window.addEventListener("beforeunload", ()=>{
        ReactDOM.unmountComponentAtNode(document.getElementById("content"));
    });

    ReactDOM.render(<Root/>, document.getElementById("content"));
});


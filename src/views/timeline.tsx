import * as React from "react";
import {Page, Toolbar, Card} from "react-onsenui";
import {notification} from "onsenui";

import {TaskView} from "./components/task";
import {Task, AppState, TaskState} from "../data";

export interface History{
    title: string;
    detail: string;
    image: string;
}

export class TimelinePage extends React.Component<any, any> {
    state = {
        history: [
            {
                title: "おもちゃ箱のお片付けをやったよ",
                detail: "2017/8/24 16:00",
                image: "./style/images/family.png"
            },{
                title: "片付けをやりました",
                detail: "2017/8/20 15:00"
            },
            {
                title: "掃除をしました",
                detail: "2017/8/20 17:00",
                image: "./style/images/timeline1.jpg"
            },{
                title: "片付けをやりました",
                detail: "2017/8/19 15:00"
            },{
                title: "掃除をしました",
                detail: "2017/8/18 17:00",
            },{
                title: "片付けをやりました",
                detail: "2017/8/17 15:00"
            }
        ] as History[]
    }
    render() {
        return <Page renderToolbar={() => {
                return <Toolbar>
                        <div className="center">タイムライン</div>
                    </Toolbar>
                }}>
                <div className="scrollable fill">
                    {this.state.history.map((h)=>{
                        return <Card>
                            <div className="timeline-title">{h.title}</div>
                            <div className="timeline-detail">{h.detail}</div>
                            {(()=>{
                                if(h.image){
                                    const image = `url(${h.image})`;
                                    return <div className="timeline-image" style={{backgroundImage: image}}></div>
                                }else{
                                    return null;
                                }
                            })()}
                        </Card>
                    })}
                </div>
            </Page>
    }
  }
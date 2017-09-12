import * as React from "react";
import {Page, Toolbar, Navigator, BackButton, Button, ToolbarButton, Icon, Col, Row, Radio, Input, Card, List, ListItem, PullHook, SearchInput} from "react-onsenui";
import {notification} from "onsenui";
import {Mode, TaskType, Task, TaskState, Scheduler, Repeat} from "../data";
import uuid = require("uuid/v4");

export interface RegisterWizardPageProps{
    onRequestChangeMode: (mode: Mode)=>void;
    onRequestCreate: (task: Task, schedular: Scheduler)=>void;
    type: TaskType;
}

export interface TaskKindPreset{
    label: string;
}

export interface TaskPreset{
    title: string;
    rate: number;
    detail: string;
    score: number;
    image: string;
}

const plusPresets:TaskKindPreset[] = [
    {label: "買い物"},
    {label: "料理"},
    {label: "補充"},
    {label: "探し物"},
    {label: ""},
    {label: ""},
    {label: ""},
    {label: ""},
    {label: "新規"}
];

const minusPresets: TaskKindPreset[] = [
    {label: "掃除"},
    {label: "洗濯"},
    {label: "ゴミ出し"},
    {label: "片付け"},
    {label: "食器洗い"},
    {label: ""},
    {label: ""},
    {label:  ""},
    {label: "新規"}
];

enum WizardPage{
    SelectKind,
    SelectList,
    SelectSchedule,
    Confirm,
}

const wizardPageTitle = {
    [WizardPage.SelectKind]: "種類を選ぶ",
    [WizardPage.SelectList]: "見つける",
    [WizardPage.SelectSchedule]: "日時を選ぶ",
    [WizardPage.Confirm]: "確認",
}

const repeateDurationMessage = {
    now: "今すぐ",
    once: "1回(日付指定)",
    everyday: "毎日",
    week: "1週間ごと",
    twoWeek: "2週間ごと",
    month: "1ヶ月ごと"
}

export class RegisterWizardPage extends React.Component<RegisterWizardPageProps, any> {
        state = {
            index: 0,
            newTask: {
                id: uuid(),
                type: null,
                kind: null,
                rank: 0,
                state: TaskState.None,
                doneDate: null,
                dueDate: null,
                title: null,
                image: null
            } as Task,
            schedular: {
                repeat: "now",
                date: new Date(),
                days: []
            } as Scheduler,
            pullHookState: "initial",
            presets: [{
                title: "おもちゃ箱のお片付け",
                detail: "時間になったらおもちゃ箱を片付けよう",
                rate: 3,
                score: 5,
                image: "./style/images/mission1_toybox.png"
            },{
                title: "食後のお片付け",
                detail: "ご飯を食べたら食器を台所へ持って行こう「ごちそうさま」の一言を忘れずに！",
                rate: 4,
                score: 8,
                image: "./style/images/mission2_carry.png"
            },{
                title: "食後にみんなでお片付け",
                rate: 5,
                detail: "みんなで仲良く洗いもの。笑い声が聞こえてきたらポイントアップ！",
                score: 7,
                image: "./style/images/mission3_washing.png"
            },{
                title: "週末のお風呂そうじ",
                detail: "週に一回、しっかりお風呂そうじ。きれいにできたか、あとでパパがチェック！",
                rate: 2,
                score: 10,
                image: "./style/images/mission4_scrubing.png"
            },{
                title: "年末の大そうじ",
                rate: 3,
                detail: "年に一度の大ミッション！これをクリアしないと年は越せない！？",
                score: 7,
                image: "./style/images/mission5_sweeping.png"
            },{
                title: "フローリングのお掃除（スポンサーミッション）",
                detail: "フローリンを掃除するならこれ！このミッションをクリアすればあなたのクイックルマスター！",
                rate: 1,
                score: 9,
                image: "./style/images/mission6_QuickleWiper.png"
            }] as TaskPreset[]
        }

        onBackClick(navigator){
            navigator.popPage();
        }

        onDiscardClick(){
            notification.confirm({
                title: "確認",
                message: "タスクの追加をキャンセルします",
                callback: (result)=>{
                    if(result){
                        this.props.onRequestChangeMode(Mode.Normal);
                    }
                }
            })
        }

        onSelectKindClick(navigator, kind: TaskKindPreset){
            const task = this.state.newTask;
            const newTask = {...task, kind: kind.label, title: kind.label};
            this.setState({newTask: newTask});

            navigator.pushPage({
                title: WizardPage[WizardPage.SelectList],
                hasBackButton: true
            });
        }

        onSelectRepeatClick(repeat: Repeat){
            const schedular = this.state.schedular;
            const newSchedular = {...schedular, repeat: repeat};
            this.setState({schedular: newSchedular});
        }

        onSelectScheduleClick(navigator){
            navigator.pushPage({
                title: WizardPage[WizardPage.Confirm],
                hasBackButton: true
            });
        }

        onSelectRepeatDurationClick(repeat: Repeat){
            const schedular = this.state.schedular;
            const newSchedular = {...schedular, repeat: repeat};
            this.setState({schedular: newSchedular});
        }

        onTaskClick(navigator, task: TaskPreset){
            const newTask = {...this.state.newTask, title: task.title, image: task.image};
            this.setState({newTask: newTask});


            navigator.pushPage({
                title: WizardPage[WizardPage.SelectSchedule],
                hasBackButton: true
            });
        }

        onConfirmClick(){
            notification.toast({
                message: "タスクを追加しました",
                timeout: 2000,
                animation: "fall"
            });
            this.props.onRequestCreate(this.state.newTask, this.state.schedular);
            this.props.onRequestChangeMode(Mode.Normal);
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

        renderToolbar(route, navigator){
            const wizardPage: WizardPage = WizardPage[route.title as string];
            const title = wizardPageTitle[wizardPage];
            const backButton = route.hasBackButton ? <BackButton onClick={this.onBackClick.bind(this, navigator)}>Back</BackButton> : null;
            return <Toolbar>
                    <div className="left">{backButton}</div>
                    <div className="center">
                        {title}
                    </div>
                    <div className="right">
                        <ToolbarButton onClick={this.onDiscardClick.bind(this)}>
                            <Icon icon="md-close"></Icon>
                        </ToolbarButton>
                    </div>
              </Toolbar>
        }

        renderRow(navigator, row: TaskPreset, index: number) {
            const score = Math.floor(row.score);
            const scoreClass = `task-preset-score task-preset-score-${score}`;
            const stars = [0,1,2,3,4].map((i)=>{
                if(i < row.rate){
                    return <Icon icon="md-star" style={{color: "#CC0"}}></Icon>
                }else{
                    return <Icon icon="md-star" style={{color: "#DDD"}}></Icon>
                }
            })
            return <ListItem key={index} onClick={this.onTaskClick.bind(this, navigator, row)}>
              <div className="left">
                  <img src={row.image} className="list-item__thumbnail" />
              </div>
              <div className='center'>
                <div>
                    <p className="task-preset-title">{row.title}</p>
                    <p className="task-preset-detail">{row.detail}</p>
                <div>
                    {stars}
                </div>
                </div>
              </div>
              <div className="right">
                <span className={scoreClass}>{row.score}</span>
              </div>
            </ListItem>
          }

        renderPage(route, navigator){
            const wizardPage: WizardPage = WizardPage[route.title as string];
            if(wizardPage === WizardPage.SelectKind){
                let kinds:TaskKindPreset[] = [];
                if(this.props.type === "plus"){
                    kinds = [].concat(plusPresets);
                }else{
                    kinds = [].concat(minusPresets);
                }
                const cols = 3;
                return <Page renderToolbar={this.renderToolbar.bind(this, route, navigator)}>
                    <div className="vertical-center">
                        <div className="register-select-kind-container">
                        {kinds.reduce((memo, kind, index)=>{
                            const arrayIndex = Math.floor(index / cols);
                            if(!memo[arrayIndex]){
                                memo.push([]);
                            }
                            memo[arrayIndex].push(kind);
                            return memo;
                        }, [] as TaskKindPreset[][]).map((kindCols)=>{
                            return <Row>
                                {kindCols.map((kind)=>{
                                    return <Col>
                                        <button className="register-select-kind-button" onClick={this.onSelectKindClick.bind(this, navigator, kind)}>
                                            {kind.label}
                                        </button>
                                    </Col>
                                })}                            
                            </Row>
                        })}
                        </div>
                    </div>
                </Page>
            }else if(wizardPage === WizardPage.SelectList){
                return <Page renderToolbar={this.renderToolbar.bind(this, route, navigator)}>
                    <SearchInput placeholder="検索" style={{width: "100%"}}/>
                    <List dataSource={this.state.presets}
                        renderRow={this.renderRow.bind(this, navigator)}
                        className="scrollable fill">
                    </List>
                </Page>
            }else if(wizardPage === WizardPage.SelectSchedule){
                const repeat = this.state.schedular.repeat;
                return <Page renderToolbar={this.renderToolbar.bind(this, route, navigator)}>
                    <Row>
                        <Col>
                            <Button modifier={repeat === "now" ? "large" : "large--quiet"}
                                    onClick={this.onSelectRepeatClick.bind(this, "now")}>
                                <Icon icon="md-check" className="schedular-select-button-check"/>
                                {repeateDurationMessage["now"]}
                            </Button>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Button modifier={repeat === "once" ? "large" : "large--quiet"}
                                    onClick={this.onSelectRepeatClick.bind(this, "once")}>
                                <Icon icon="md-check" className="schedular-select-button-check"/>
                                {repeateDurationMessage["once"]}
                            </Button>
                            {(()=>{
                                if(repeat === "once"){
                                    return <Card>
                                        <Input type="date" value={this.state.schedular.date as any} float={true} modifier="underbar" className="once-date-picker"/>
                                    </Card>
                                }
                            })()}
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Button modifier={["everyday","week", "twoWeek", "month"].indexOf(repeat) >= 0 ? "large" : "large--quiet"}
                                    onClick={this.onSelectRepeatClick.bind(this, "everyday")}>
                                <Icon icon="md-check" className="schedular-select-button-check"/>
                                繰り返し
                            </Button>
                            {(()=>{
                                if(["everyday","week", "twoWeek", "month"].indexOf(repeat) >= 0){
                                    return <Card>
                                        <List>
                                        {["everyday", "week", "twoWeek", "month"].map((duration)=>{
                                            return <ListItem>
                                                <Radio onChange={this.onSelectRepeatDurationClick.bind(this, duration)}
                                                        checked={repeat === duration}
                                                        inputId={`repeat-${duration}-radio`}/>
                                                <label htmlFor={`repeat-${duration}-radio`} className="center">
                                                    {repeateDurationMessage[duration]}
                                                </label>
                                            </ListItem>
                                        })}
                                        </List>
                                    </Card>
                                }
                            })()}
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Button modifier="large--cta"
                                    onClick={this.onSelectScheduleClick.bind(this, navigator)}>
                                日時を確定
                            </Button>
                        </Col>
                    </Row>
                </Page>
            }else if(wizardPage === WizardPage.Confirm){
                const repeat = this.state.schedular.repeat;
                return <Page renderToolbar={this.renderToolbar.bind(this, route, navigator)}>
                    <Row>
                        <Col>
                            <Card className="register-summary">
                                {(()=>{
                                    if(this.props.type === "plus"){
                                        return <h3 className="register-summary-type">足し算</h3>
                                    }else{
                                        return <h3 className="register-summary-type">引き算</h3>
                                    }
                                })()}
                                <span className="register-summary-label">種類</span>
                                <h2>
                                    {this.state.newTask.kind}
                                </h2>
                                <h3>
                                    {this.state.newTask.title}
                                </h3>
                                {(()=>{
                                    return <div>
                                        <span className="register-summary-label">日時</span>
                                        <h3>{repeateDurationMessage[repeat]}</h3>
                                    </div>
                                })()}
                            </Card>
                            <Button modifier="large--cta"
                                    onClick={this.onConfirmClick.bind(this, navigator)}>
                                タスクを追加
                            </Button>
                        </Col>
                    </Row>
                </Page>
            }
            
        }
    
        render() {
            return <Page>
                <Navigator
                renderPage={this.renderPage.bind(this)}
                initialRoute={{
                    title: WizardPage[WizardPage.SelectList],
                    hasBackButton: false,
                }}
                />
            </Page>
        }
    }
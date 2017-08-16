import * as React from "react";
import {Page, Toolbar, Navigator, BackButton, Button, ToolbarButton, Icon, Col, Row} from "react-onsenui";
import {notification} from "onsenui";
import {Mode, TaskType} from "../data";

export interface RegisterWizardPageProps{
    onRequestChangeMode: (mode: Mode)=>void;
    type: TaskType;
}

enum WizardPage{
    SelectKind,
    SelectSchedule,
    Confirm,
}

const wizardPageTitle = {
    [WizardPage.SelectKind]: "種類を選ぶ",
    [WizardPage.SelectSchedule]: "日時を選ぶ",
    [WizardPage.Confirm]: "確認",
}

export class RegisterWizardPage extends React.Component<RegisterWizardPageProps, any> {
        state = {
            index: 0
        }

        handleBack(navigator){

        }

        onDiscardClick(){
            notification.confirm({
                title: "確認",
                message: "タスクの作成をキャンセルします",
                callback: (result)=>{
                    if(result){
                        this.props.onRequestChangeMode(Mode.Normal);
                    }
                }
            })
        }

        pushPage(navigator) {
            const next = this.state.index + 1;
            this.setState({index: next});

            navigator.pushPage({
                title: `Another page ${next}`,
                hasBackButton: true
            });
        }

        renderToolbar(route, navigator){
            const wizardPage: WizardPage = WizardPage[route.title as string];
            const title = wizardPageTitle[wizardPage];
            const backButton = route.hasBackButton ? <BackButton onClick={this.handleBack.bind(this, navigator)}>Back</BackButton> : null;
            return <Toolbar>
                    <div className="left">{backButton}</div>
                    <div className="center">{title}</div>
                    <div className="right">
                        <ToolbarButton onClick={this.onDiscardClick.bind(this)}>
                            <Icon icon="md-close"></Icon>
                        </ToolbarButton>
                    </div>
              </Toolbar>
        }

        renderPage(route, navigator){
            const wizardPage: WizardPage = WizardPage[route.title as string];
            let kinds = [];
            if(this.props.type === "plus"){
                kinds = ["買い物", "料理", "補充", "探し物", "", "" , "" , "", "新規"];
            }else{
                kinds = ["掃除", "洗濯", "ゴミ出し", "片付け", "食器洗い", "", "" , "", "新規"];
            }
            const cols = 3;
            if(wizardPage === WizardPage.SelectKind){
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
                        }, []).map((kindCols)=>{
                            return <Row>
                                {kindCols.map((kind)=>{
                                    return <Col>
                                        <button className="register-select-kind-button">
                                            {kind}
                                        </button>
                                    </Col>
                                })}                            
                            </Row>
                        })}
                        </div>
                    </div>
                </Page>
            }else{

            }
            
        }
    
        render() {
            return <Page>
                <Navigator
                renderPage={this.renderPage.bind(this)}
                initialRoute={{
                    title: WizardPage[WizardPage.SelectKind],
                    hasBackButton: false,
                }}
                />
            </Page>
        }
    }
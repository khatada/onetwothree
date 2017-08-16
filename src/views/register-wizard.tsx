import * as React from "react";
import {Page, Toolbar, Navigator, BackButton, Button, ToolbarButton, Icon} from "react-onsenui";

export interface RegisterWizardPageProps{
    onRequestChangeMode: (mode: Mode)=>void;
}

export class RegisterWizardPage extends React.Component<any, any> {
    
        state = {
            index: 0
        }

        handleBack(navigator){

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
            const backButton = route.hasBackButton ? <BackButton onClick={this.handleBack.bind(this, navigator)}>Back</BackButton> : null;
            return <Toolbar>
                    <div className="left">{backButton}</div>
                    <div className="center">{route.title}</div>
                    <div className="right">
                        <ToolbarButton>
                            <Icon icon="md-close"></Icon>
                        </ToolbarButton>
                    </div>
              </Toolbar>
        }

        renderPage(route, navigator){
            return <Page renderToolbar={this.renderToolbar.bind(this, route, navigator)}>

            </Page>
        }
    
        render() {
            return <Page>
                <Navigator
                renderPage={this.renderPage.bind(this)}
                initialRoute={{
                    title: "種類",
                    hasBackButton: false
                }}
                />
            </Page>
        }
    }
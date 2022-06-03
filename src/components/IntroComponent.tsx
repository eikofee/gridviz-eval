import React from "react";
import Cookies from "universal-cookie";
import { EvalControllerComponent } from "./EvalControllerComponent";
import { TrainingComponent } from "./TrainingComponent";
import { Alert, Button, Col, Container, Nav, Row, Stack } from "react-bootstrap"
import Image from 'react-bootstrap/Image'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'katex/dist/katex.min.css';
import TeX from '@matejmazur/react-katex';
import { Locale, LocaleManager } from "../LocaleManager";


interface IProps {
    master: EvalControllerComponent;
    pageInit: number;
}

interface IState {
    page: number;
}

export class IntroComponent extends React.Component<IProps, IState> {
    public canSkipT1 = false;
    public canSkipT2 = false;
    public canSkipT3 = false;
    public canSkipT4 = false;
    public canSkipT5 = false;

    constructor(props: any) {
        super(props);
        this.state = {
            page:props.pageInit
        };

    }

    nextPage(ic: IntroComponent) {
        ic.setState({
            page: ic.state.page + 1
        })

        let cookies = new Cookies()
        cookies.set("currentSlide", ic.state.page + 1, {maxAge: 86400})
    }
    
    prevPage(ic: IntroComponent) {
        ic.setState({
            page: ic.state.page - 1
        })

        let cookies = new Cookies()
        cookies.set("currentSlide", ic.state.page - 1, {maxAge: 86400})
    }

    skipToEnd(ic : IntroComponent) {
        ic.setState({
            page: 14
        })
    }

    render(): React.ReactNode {
        let training = false;
        let trainingPhase = "";
        let prevLabel = LocaleManager.getText("previous");
        switch(this.state.page) {
            case 10:
                prevLabel = LocaleManager.getText("retry t1");
                break;
            case 12:
                prevLabel = LocaleManager.getText("retry t2");
                break;
            case 14:
                prevLabel = LocaleManager.getText("retry t3");
                break;
            case 16:
                prevLabel = LocaleManager.getText("retry t4");
                break;
        }
        let title = <Row className="justify-content-center"><Col className="col-auto">{LocaleManager.getText("intro-title")} ({this.state.page +1 }/17)</Col></Row>
        let nextLabel = navigator.cookieEnabled ? LocaleManager.getText("next") : LocaleManager.getText("no cookies")
        switch(this.state.page) {
            case 16:
                nextLabel = LocaleManager.getText("begin-eval")
                break;
        }
        let nextVariant = navigator.cookieEnabled ? "primary" : "danger disabled"
        let nav = <Row>
            <Col className="col-auto me-auto">
                <Button variant={this.state.page > 0 ? "primary" : "primary disabled"} onClick={() => this.prevPage(this)}>
                    {prevLabel}
                </Button>
            </Col>
            <Col className="col-auto">
                <Button variant={nextVariant} className="ms-auto" onClick={() => this.nextPage(this)}>{nextLabel}</Button>
            </Col>
        </Row>
        let text = <div></div>
        console.log(this.state.page)
        switch(this.state.page) {
            case 0:
                training = false;
                text =
                    <div>
                        {LocaleManager.getText("alert-cookies")}
                    <div>
                        {LocaleManager.getText("intro-0-1")}
                    </div>
                    <div>
                        {LocaleManager.getText("intro-0-2")}
                    </div>
                    <Row className="justify-content-center">
                        <Image className="col-8" fluid src={LocaleManager.getPath("intro-0")} />
                    </Row>
                    </div>
            break;
            case 1:
                training = false;
                text = <div>
                    <div>
                        {LocaleManager.getText("intro-1-1")}
                    </div>
                    <div>
                        {LocaleManager.getText("intro-1-2")}
                    </div>
                    <Row className="justify-content-center">
                        <Image fluid className="col-8" src={LocaleManager.getPath("intro-1")} />
                    </Row>
                </div>
                break;
            case 2:
                training = false;
                text = <div>
                    <div>
                        {LocaleManager.getText("intro-2-1")}
                    </div>
                    <Row className="justify-content-center">
                        <Image fluid className="col-8" src={LocaleManager.getPath("intro-2-1")} />
                    </Row>
                    <div>
                        {LocaleManager.getText("intro-2-2")}
                    </div>
                    <Row className="justify-content-center">
                        <Image fluid className="col-5" src={LocaleManager.getPath("intro-2-2")} />
                    </Row>
                    
                </div>
                break;
            case 3:
                text = <div>
                    <div>
                    {LocaleManager.getText("intro-3-1")}
                </div>
                <div>
                    {LocaleManager.getText("intro-3-2")}
                </div>
                <Row className="justify-content-center">
                <Image fluid className="col-8" src={LocaleManager.getPath("intro-3")} />
                </Row>
                {LocaleManager.getText("intro-3-3")}
                </div>
                break;
            case 4:
                text= <div>
                    {LocaleManager.getText("intro-4")}
                    <Row className="justify-content-center">
                <Image fluid className="col-8" src={LocaleManager.getPath("intro-4")} />
                </Row>
                </div>
                break;
            case 5:
                training = false;
                text = <div>
                        {LocaleManager.getText("intro-5-1")}
                        <Row className="justify-content-center">
                            <Image fluid className="col-8" src={LocaleManager.getPath("intro-5")} />
                    </Row>

                        {LocaleManager.getText("intro-5-2")}
                        </div>
                break;
            case 6:
                text=<div>
                    {LocaleManager.getText("intro-6")}
                    <Row className="justify-content-center">
                        <Col className="col-6 justify-content-center">
                            <Image fluid src={LocaleManager.getPath("intro-6-1")} />
                        </Col>
                        <Col className="col-6 justify-content-center">
                            <Image fluid src={LocaleManager.getPath("intro-6-2")} />
                        </Col>
                    </Row>
                </div>
            break;

            case 7:
                training = false;
                text = <div>{LocaleManager.getText("intro-7")}</div>
                break;
            case 8:
                training = false;
                text = <div>{LocaleManager.getText("intro-8")}</div>
                break;
            case 9:
                training = true;
                trainingPhase = "t1"
                break;
            case 10:
                training = false;
                text = <div>
                    {LocaleManager.getText("intro-10-1")}
                <Row className="justify-content-center">
                        <Col className="col-3 justify-content-center"><Image fluid src="intro/t3-prox.png" /></Col>
                        <Col className="col-3 justify-content-center"><Image fluid src="intro/t3-sep.png" /></Col>
                </Row>
                    {LocaleManager.getText("intro-10-2")}
                <Row className="justify-content-center">
                        <Col className="col-5 justify-content-center"><Image fluid src={LocaleManager.getPath("intro-3")} /></Col>
                        <Col className="col-5 justify-content-center"><Image fluid src={LocaleManager.getPath("intro-4")} /></Col>
                </Row>
                </div>
                break;
            case 11:
                training = true;
                trainingPhase = "t2"
                break;
            case 12:
                training = false;
                text = <div>
                    {LocaleManager.getText("intro-12-1")}
            <ul>
                <li>{LocaleManager.getText("intro-12-2")}<img className="answer-image" src="ans/struct1.png" /></li>
                <li>{LocaleManager.getText("intro-12-3")}<img className="answer-image" src="ans/struct2.png" /></li>
                <li>{LocaleManager.getText("intro-12-4")}<img className="answer-image" src="ans/struct3.png" /></li>
                <li>{LocaleManager.getText("intro-12-5")}<img className="answer-image" src="ans/struct4.png" /></li>
            </ul>
            <Row className="justify-content-center">
                <Image fluid className="col-8" src={LocaleManager.getPath("intro-5")} />
            </Row>
            </div>
            break;
            case 13:
                training = true;
                trainingPhase = "t3"
                break;
            case 14:
                training = false;
                text = <div>
                    {LocaleManager.getText("intro-14")}
                    <Row className="justify-content-center">
                        <Col className="col-6 justify-content-center">
                            <Image fluid src="intro/tsneGT-out.png" />
                        </Col>
                        <Col className="col-6 justify-content-center">
                            <Image fluid src="intro/ssmGT-out.png" />
                        </Col>
                    </Row>
                </div>
                break;
            case 15:
                training = true;
                trainingPhase = "t4"
                break;
            case 16:
                training = false;
                text = <div>{LocaleManager.getText("intro-16")}</div>
                break;
            case 17:
                this.props.master.endIntro(this.props.master);
                return null;
                break;
        }

            return <Container className="d-flex flex-column h-75">
            <Row>{title}</Row>
            {navigator.cookieEnabled ? "" : <Alert variant="danger">{LocaleManager.getText("button-cookies-error")}</Alert>}
            <Row>{text}</Row>
            {training ? <TrainingComponent case={trainingPhase} key={trainingPhase} master={this} canSkip={false}/> : <Row>{nav}</Row>}
            </Container>
        }
}
import React from "react";
import { Answer } from "../types/Answer";
import { EvalController } from "../types/EvalController";
import { Question, QuestionType } from "../types/Question";
import { IntroComponent } from "./IntroComponent";
import { QuestionComponent } from "./QuestionComponent";
import emailjs from '@emailjs/browser';
import Cookies from 'universal-cookie';
import { Button, Col, Container, Row } from "react-bootstrap";
import { LocaleManager } from "../LocaleManager";


interface IProps {
    evalController: EvalController;
}

interface IState {
    currentQuestion: Question | null;
    firstReady: boolean;
    ready:boolean;
    dummy: number;
    displayCooldown: number;
    skipCooldown: number;
}


export class EvalControllerComponent extends React.Component<IProps, IState> {

    public ready: boolean = false;
    public ended: boolean = false;
    public intro: boolean = true;
    public introPage: number = 0;
    public questionComponent: JSX.Element | null = null;
    public timeStart: number = 0;
    public introPageInit : number = 0;
    public calledTimeout : boolean = false;
    public calledSkip : boolean = false;
    public hasSelectedAnAnswer : boolean = false;

    constructor(props: any) {
        super(props);
        this.state = {
            currentQuestion: null,
            firstReady: false,
            ready: false,
            dummy: Date.now(),
            displayCooldown: 0,
            skipCooldown: 0
        }
        this.props.evalController.evalControllerComponent = this;
        let cookies = new Cookies();
        if (cookies.get("id") == undefined) {
            cookies.set('id', Date.now(), { path: '/' , maxAge: 86400});
            cookies.set('currentStep', "intro", { path: '/' , maxAge: 86400});
            cookies.set('currentSlide', 0, { path: '/' , maxAge: 86400});
            cookies.set('answers', "", { path: '/' , maxAge: 86400});
            cookies.set('mailSent', "false", { path: '/' , maxAge: 86400})

        } else {
            console.log("id found : " + cookies.get('id'));
            if (cookies.get("currentStep") == "intro") {
                this.introPageInit = parseInt(cookies.get("currentSlide"))
            } else {
                this.intro = false
                this.ready = false
                this.props.evalController.loadQuestionsFromFile();
                this.props.evalController.setPreviousAnswerText(cookies.get("answers"))
                this.props.evalController.setQuestionIndex(parseInt(cookies.get("currentSlide")))
            }
        }
    }

    endIntro(t: EvalControllerComponent) {
        this.intro = false;
        t.props.evalController.loadQuestionsFromFile();
        let cookies = new Cookies()
        cookies.set("currentStep", "questions", {maxAge:86400, path:'/'})
        cookies.set("currentSlide", "0", {path:'/', maxAge:86400})
    }

    cancelFunc(t: EvalControllerComponent) {
        t.timeStart = t.props.evalController.currentQuestionTimeStart;
        console.log("cancelling...")
        t.questionComponent = null;
        t.props.evalController.setHasAnswered(false)
        t.setState({
            currentQuestion:t.state.currentQuestion,
            firstReady:t.state.firstReady,
            ready:t.state.ready,
            dummy:Date.now()
        });
    }

    proceedFunc(t: EvalControllerComponent) {
        // if (t.props.evalController.currentAnswerIndex == -1)
        //     return;
        console.log("registering...")
        let cookies = new Cookies()
        t.timeStart = 0;
        console.log(t.state)
        let ans = new Answer(
            t.props.evalController.currentAnswerIndex,
            t.props.evalController.currentAnswerType,
            t.props.evalController.currentAnswerText);
            t.props.evalController.registerAnswer(
                t.state.currentQuestion!,
                ans,
                Date.now() - t.props.evalController.currentQuestionTimeStart);
        cookies.set("answers", t.props.evalController.getResultsAsString(false), {maxAge: 86400, path:'/'});
        t.loadQuestion();
        this.questionComponent = null;
        this.hasSelectedAnAnswer = false;
        this.props.evalController.setHasAnswered(false);
        cookies.set("currentSlide", t.props.evalController.currentQuestionIndex, {maxAge: 86400, path:'/'});
        console.log("done.")
    }

    sendMailAnswers(message:string, id:string) {
        emailjs.send('service_btdjf1i', 'template_hxengrl', {message:message, from_name:id}, '23pV8_Y2cbGyu3ND9')
      .then((result) => {
          console.log(result.text);
      }, (error) => {
          console.log(error.text);
      });

    }

    offCooldown(e: EvalControllerComponent) {
        if (e.state.displayCooldown > 0) {
            e.setState({displayCooldown: e.state.displayCooldown - 1, dummy: Date.now()});
            setTimeout( () => this.offCooldown(e), 1000)
        } else {
            e.calledTimeout = false;
        }
    }

    offSkip(e: EvalControllerComponent) {
        if (e.state.skipCooldown > 0 && e.props.evalController.getCurrentQuestion()?.type != QuestionType.Compare) {
            e.setState({skipCooldown : e.state.skipCooldown - 1, dummy: Date.now()});
            setTimeout( () => this.offSkip(e), 1000)
        } else {
            if (e.calledSkip && e.props.evalController.getCurrentQuestion()?.type != QuestionType.Compare) {
                this.proceedFunc(e);
            }
            e.calledSkip = false;
            
        }
    }

    loadQuestion() {
        console.log("loading question...")
        let q = this.props.evalController.getCurrentQuestion();
        if (q != null) {
            this.setState({
                currentQuestion: q,
                firstReady: false,
                ready: true,
                displayCooldown: q.skipCD ? 0 : 2,
                skipCooldown: q.skipCD ? 0 : 63,
            });
        console.log(q)
            // setTimeout(() => this.offCooldown(this), 3000)
        } else {
            console.log("Quizz ended")
            this.ended = true;
            this.ready = false;
            this.setState({currentQuestion: null,
                firstReady: false,
                ready: true})
            console.log(this.props.evalController.results);
            let cookies = new Cookies();
            if (cookies.get('mailSent') == "false") {
                this.sendMailAnswers(this.props.evalController.getResultsAsString(true), cookies.get("id"))
                cookies.set('mailSent', "true", {maxAge: 86400, path:'/'})
            }
        }
        console.log("done");
    }

    componentDidUpdate(prevProps: IProps, prevState: IState) {
        if (!this.ready && !this.ended && this.state.firstReady) {
            this.ready = true;
            this.loadQuestion();
        }
        this.hasSelectedAnAnswer = this.props.evalController.hasAnswered;
    }


    render(): React.ReactNode {
        // let proceedEnabled = this.props.evalController.currentAnswerIndex != -1;
        let cookies = new Cookies()
        if (this.ready) {
            if (this.state.displayCooldown <= 0) {
                if (this.questionComponent == null) {
                    let q = <QuestionComponent useExplain={false} key={"questionComponent" + Date.now()} question={this.state.currentQuestion!} evalController={this.props.evalController!} timeStart={this.timeStart}/>;
                    this.questionComponent = q;
                }

                let divs = <Container fluid style={{maxWidth:"1200px" }} className="d-grid gap-2">
                <Row>
                    Question {this.props.evalController.currentQuestionIndex + 1}/{this.props.evalController.getQuestionCount()}
                </Row>
                <Row>
                    {this.questionComponent}
                </Row>
                <div className="d-flex justify-content-between">
                    <Button disabled={this.props.evalController.getCurrentQuestion()?.type != QuestionType.Count || !this.props.evalController.hasAnswered} variant={this.props.evalController.getCurrentQuestion()?.type != QuestionType.Count || !this.props.evalController.hasAnswered ?"outline-warning" : "warning"} onClick={() => this.cancelFunc(this)} >{LocaleManager.getAnswerText("cancel")}</Button>
                        {/* <div className={proceedEnabled ? "control-proceed" : "control-proceed disabled"} onClick={proceedEnabled ? () => this.proceedFunc(this) : () => {}}>Valider</div> */}
                        <Button disabled={!this.props.evalController.hasAnswered} variant={this.props.evalController.hasAnswered ? "success" : "outline-success"} onClick={() => this.proceedFunc(this)}>{LocaleManager.getAnswerText("proceed")}{this.props.evalController.getCurrentQuestion()?.type != QuestionType.Compare ? " (" + this.state.skipCooldown + "s)" : ""}</Button>
                    </div>
                </Container>
                    return divs;
            } else {
                let divs = <Container fluid style={{maxWidth:"1200px" }} className="d-grid gap-2">
                <Row>
                    {LocaleManager.getText("next-question-1")}{this.state.displayCooldown} {LocaleManager.getText("next-question-2")}{this.state.displayCooldown > 1 ? "s":""}.
                </Row>
                </Container>
                if (!this.props.evalController.getCurrentQuestion()?.skipCD) {
                    if (!this.calledTimeout) {
                        setTimeout(() => this.offCooldown(this), 1000);
                        this.calledTimeout = true;
                    }
                    if (!this.calledSkip) {
                        setTimeout(() => this.offSkip(this), 1000)
                        this.calledSkip = true;
                    }
                }
                return divs;
            }
        } else if (this.intro) {
            // this.sendMailAnswers();
            return <Container fluid style={{maxWidth:"1200px"}} className="d-grid gap-2">
                
                <IntroComponent master={this} pageInit={this.introPageInit}/>
                {/* <div className="control-proceed" onClick={() => this.endIntro(this)}>Commencer</div> */}
            </Container>
        } else if (this.ended) {
            const blob = new Blob([this.props.evalController.getResultsAsString(true)]);                   // Step 3
            const fileDownloadUrl = URL.createObjectURL(blob);
            return <Container fluid style={{maxWidth:"1200px"}} className="d-block gap-5 flex-fill mh-100">
                <Row className="justify-content-center d-grid">
                    <Col className="col-auto">{LocaleManager.getText("end-1")}</Col>
                </Row>
                <Row className="justify-content-center d-grid flex-fill">
                    <Col className="col-auto">
                    {LocaleManager.getText("end-2")}
                    <a target="_blank" href={"https://docs.google.com/forms/d/e/1FAIpQLScSkqhEBLtNV2CCk0TT8LrZM3W3O7OPaAgObjzlxvwXYa6cOA/viewform?usp=pp_url&entry.472158829=" + cookies.get("id")}>https://forms.gle/YtbcbCtS8RbNUeou6</a>. {LocaleManager.getText("end-3")}{cookies.get("id")}.<br/>
                    </Col>
                </Row>
                <Row className="justify-content-center d-grid">
                    <Col className="col-auto">
                        <a href={fileDownloadUrl} download={"answers-" + cookies.get("id")}>{LocaleManager.getText("download-answers")}</a>
                    </Col>
                </Row>
            </Container>
        } else {
            console.log("skip render")
            return null;
        }
    }

}
import React from "react";
import { Answer } from "../types/Answer";
import { EvalController } from "../types/EvalController";
import { Question } from "../types/Question";
import { IntroComponent } from "./IntroComponent";
import { QuestionComponent } from "./QuestionComponent";
import emailjs from '@emailjs/browser';
import Cookies from 'universal-cookie';


interface IProps {
    evalController: EvalController;
}

interface IState {
    currentQuestion: Question | null;
    firstReady: boolean;
    ready:boolean;
    dummy: number;
    displayCooldown: number;
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

    constructor(props: any) {
        super(props);
        this.state = {
            currentQuestion: null,
            firstReady: false,
            ready: false,
            dummy: Date.now(),
            displayCooldown: 0
        }
        this.props.evalController.evalControllerComponent = this;
        let cookies = new Cookies();
        if (cookies.get("id") == undefined) {
            cookies.set('id', Date.now(), { path: '/' });
            cookies.set('currentStep', "intro", { path: '/' });
            cookies.set('currentSlide', 0, { path: '/' });
            cookies.set('answers', "", { path: '/' });

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
        cookies.set("currentStep", "questions")
    }

    cancelFunc(t: EvalControllerComponent) {
        t.timeStart = t.props.evalController.currentQuestionTimeStart;
        console.log("cancelling...")
        t.setState({
            currentQuestion:t.state.currentQuestion,
            firstReady:t.state.firstReady,
            ready:t.state.ready,
            dummy:Date.now()
        });
    }

    proceedFunc(t: EvalControllerComponent) {
        if (t.props.evalController.currentAnswerIndex == -1)
            return;
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
        cookies.set("answers", t.props.evalController.getResultsAsString(false));
        t.loadQuestion();
        cookies.set("currentSlide", t.props.evalController.currentQuestionIndex);
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

    loadQuestion() {
        console.log("loading question...")
        let q = this.props.evalController.getCurrentQuestion();
        if (q != null) {
            this.setState({
                currentQuestion: q,
                firstReady: false,
                ready: true,
                displayCooldown: 3
            });
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
            this.sendMailAnswers(this.props.evalController.getResultsAsString(true), cookies.get("id"))
        }
        console.log("done");
    }

    componentDidUpdate(prevProps: IProps, prevState: IState) {
        console.log("change in state:")
        console.log(prevState)
        console.log(this.state)
        console.log("---")
        if (!this.ready && !this.ended && this.state.firstReady) {
            this.ready = true;
            this.loadQuestion();
        }
    }


    render(): React.ReactNode {
        // let proceedEnabled = this.props.evalController.currentAnswerIndex != -1;
        let cookies = new Cookies()
        if (this.ready) {
            if (this.state.displayCooldown <= 0) {

                console.log(this.props.evalController.questions)
                let q = <QuestionComponent useExplain={false} key={"questionComponent" + Date.now()} question={this.state.currentQuestion!} evalController={this.props.evalController!} timeStart={this.timeStart}/>;
                this.questionComponent = q;
                let divs = <div className="question-main">
                <div className="question-number">
                    Question {this.props.evalController.currentQuestionIndex + 1}/{this.props.evalController.getQuestionCount()}
                </div>
                    {this.questionComponent}
                    <div className="question-controls">
                        <div className="control-cancel" onClick={() => this.cancelFunc(this)}>Annuler</div>
                        {/* <div className={proceedEnabled ? "control-proceed" : "control-proceed disabled"} onClick={proceedEnabled ? () => this.proceedFunc(this) : () => {}}>Valider</div> */}
                        <div className="control-proceed" onClick={() => this.proceedFunc(this)}>Valider</div>
                    </div>
                </div>
                    return divs;
            } else {
                let divs = <div className="question-main">
                <div className="question-number">
                    Prochaine question dans {this.state.displayCooldown} seconde{this.state.displayCooldown > 1 ? "s":""}.
                </div>
                </div>
                if (!this.calledTimeout) {
                    setTimeout(() => this.offCooldown(this), 1000);
                    this.calledTimeout = true;
                }
                return divs;
            }
        } else if (this.intro) {
            // this.sendMailAnswers();
            return <div className="question-main">
                
                <IntroComponent master={this} pageInit={this.introPageInit}/>
                {/* <div className="control-proceed" onClick={() => this.endIntro(this)}>Commencer</div> */}
            </div>
        } else if (this.ended) {
            const blob = new Blob([this.props.evalController.getResultsAsString(true)]);                   // Step 3
            const fileDownloadUrl = URL.createObjectURL(blob);
            return <div className="question-main">
                <div className="question-text">
                    Evaluation terminée, merci pour votre participation. <br/><br/>
                    <div className="red-text"> NE FERMEZ PAS CET ONGLET !</div><br/>
                    Veuillez maintenant remplir le questionnaire en suivant ce lien : <a href="https://forms.gle/YtbcbCtS8RbNUeou6">https://forms.gle/YtbcbCtS8RbNUeou6</a> <br/>
                    Votre identifiant est {cookies.get("id")}.
                </div>
                <div>
                    <a href={fileDownloadUrl} download={"answers-" + cookies.get("id")}>Télécharger les réponses</a>
                </div>
            </div>
        } else {
            console.log("skip render")
            return null;
        }
    }

}
import React from "react";
import { Answer } from "../types/Answer";
import { EvalController } from "../types/EvalController";
import { Question } from "../types/Question";
import { IntroComponent } from "./IntroComponent";
import { QuestionComponent } from "./QuestionComponent";


interface IProps {
    evalController: EvalController;
}

interface IState {
    currentQuestion: Question | null;
    firstReady: boolean;
    ready:boolean;
    dummy: number;
}

export class EvalControllerComponent extends React.Component<IProps, IState> {

    public ready: boolean = false;
    public ended: boolean = false;
    public intro: boolean = true;
    public introPage: number = 0;
    public questionComponent: JSX.Element | null = null;
    public timeStart: number = 0;

    constructor(props: any) {
        super(props);
        this.state = {
            currentQuestion: null,
            firstReady: false,
            ready: false,
            dummy: Date.now()
        }
        this.props.evalController.evalControllerComponent = this;
    }

    endIntro(t: EvalControllerComponent) {
        this.intro = false;
        t.props.evalController.loadQuestionsFromFile();
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
        t.loadQuestion();
        console.log("done.")
    }

    loadQuestion() {
        console.log("loading question...")
        let q = this.props.evalController.getCurrentQuestion();
        if (q != null) {
            this.setState({
                currentQuestion: q,
                firstReady: false,
                ready: true,
            });
        } else {
            console.log("Quizz ended")
            this.ended = true;
            this.ready = false;
            this.setState({currentQuestion: null,
                firstReady: false,
                ready: true})
            console.log(this.props.evalController.results);
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
        if (this.ready) {
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
                    <div className="control-proceed" onClick={() => this.proceedFunc(this)}>Suivant</div>
                </div>
            </div>
                return divs;
        } else if (this.intro) {
            return <div className="question-main">
                
                <IntroComponent master={this}/>
                {/* <div className="control-proceed" onClick={() => this.endIntro(this)}>Commencer</div> */}
            </div>
        } else if (this.ended) {
            const blob = new Blob([this.props.evalController.getResultsAsString()]);                   // Step 3
            const fileDownloadUrl = URL.createObjectURL(blob);
            return <div className="question-main">
                <div className="question-text">
                    Evaluation terminée, merci pour votre participation. <br/><br/>
                    <div className="red-text"> NE FERMEZ PAS CET ONGLET !</div><br/>
                    Veuillez maintenant remplir le questionnaire en suivant ce lien : <a href="https://forms.gle/YtbcbCtS8RbNUeou6">https://forms.gle/YtbcbCtS8RbNUeou6</a> <br/>
                    Votre identifiant est {Date.now()}.
                </div>
                <div>
                    <a href={fileDownloadUrl} download={"answers-" + Date.now()}>Télécharger les réponses</a>
                </div>
            </div>
        } else {
            console.log("skip render")
            return null;
        }
    }

}
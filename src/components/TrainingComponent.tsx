import React from "react";
import { ClassificationTypeNames } from "typescript";
import { Answer } from "../types/Answer";
import { EvalController } from "../types/EvalController";
import { Question } from "../types/Question";
import { IntroComponent } from "./IntroComponent";
import { QuestionComponent } from "./QuestionComponent";


interface IProps {
    master: IntroComponent;
    case: string;
    canSkip: boolean;
}

interface IState {
    currentQuestion: Question | null;
    firstReady: boolean;
    ready:boolean;
    dummy: number;
}

export class TrainingComponent extends React.Component<IProps, IState> {

    public ready: boolean = false;
    public ended: boolean = false;
    public currentAnswerIndex: number = -1;
    public questionComponent: JSX.Element | null = null;
    public questionsAsString: string = "";
    public questions: Question[] = [];
    public currentQuestionIndex = 0;
    public hasAnswered = false;
    public hasWrongAnswer = false;


    public dummyEvalController: EvalController;

    constructor(props: any) {
        super(props);
        
        this.dummyEvalController = new EvalController();
        switch(props.case) {
            case "t1":
            this.questionsAsString=
                `id:1,type:count,question:Combien y'a-t-il de clusters de labels différents ?,path:./train/t1/3-a-1-ssm-gt.png,expect:3
                id:4,type:count,question:Combien y'a-t-il de clusters de labels différents ?,path:./train/t1/5-a-1-ssm-dist.png,expect:5
                id:6,type:count,question:Combien y'a-t-il de clusters de labels différents ?,path:./train/t1/5-b-0-tsne-gt.png,expect:5
                id:8,type:count,question:Combien y'a-t-il de clusters de labels différents ?,path:./train/t1/5-b-1-tsne-dist.png,expect:5
                id:9,type:count,question:Combien y'a-t-il de clusters de labels différents ?,path:./train/t1/5-c-0-tsne-dist.png,expect:5
                id:11,type:count,question:Combien y'a-t-il de clusters de labels différents ?,path:./train/t1/7-c-1-tsne-gt.png,expect:7
                id:7,type:count,question:Combien y'a-t-il de clusters de labels différents ?,path:./train/t1/5-b-1-ssm-gt.png,expect:5
                id:14,type:count,question:Combien y'a-t-il de clusters de labels différents ?,path:./train/t1/7-d-1-tsne-dist.png,expect:7`
            break;

            case "t2":
            this.questionsAsString=
                `id:1,type:color4,question:Quel est le label le plus représenté ?,path:./train/t2/4-a-0-ssm-gt.png,path:./train/t2/4-a-0-ssm-dist.png,expect:purple
                id:2,type:color4,question:Quel est le label le plus représenté ?,path:./train/t2/4-a-1-tsne-gt.png,path:./train/t2/4-a-1-tsne-dist.png,expect:blue
                id:3,type:color5,question:Quel est le label le plus représenté ?,path:./train/t2/5-c-3-tsne-gt.png,path:./train/t2/5-c-3-tsne-dist.png,expect:orange
                id:4,type:color8,question:Quel est le label le plus représenté ?,path:./train/t2/8-a-0-ssm-gt.png,path:./train/t2/8-a-0-ssm-dist.png,expect:orange`
            break;
            
            case "t3":
            this.questionsAsString=
                `id:2,type:color3,question:Quel est le cluster le plus proche du cluster bleu dans RN ?,path:./train/t3/3-a-0-ssm-gt.png,path:./train/t3/3-a-0-ssm-dist.png,expect:aucune
                id:3,type:color5,question:Quel est le cluster le plus proche du cluster violet dans RN ?,path:./train/t3/5-a-1-tsne-gt.png,path:./train/t3/5-a-1-tsne-dist.png,expect:aucune
                id:5,type:color5,question:Quel est le cluster le plus proche du cluster orange dans RN ?,path:./train/t3/5-b-0-ssm-gt.png,path:./train/t3/5-b-0-ssm-dist.png,expect:green
                id:4,type:color5,question:Quel est le cluster le plus proche du cluster vert dans RN ?,path:./train/t3/5-c-1-tsne-gt.png,path:./train/t3/5-c-1-tsne-dist.png,expect:blue
                id:1,type:color5,question:Quel est le cluster le plus proche du cluster violet dans RN ?,path:./train/t3/5-c-2-ssm-gt.png,path:./train/t3/5-c-2-ssm-dist.png,expect:red
                id:6,type:color5,question:Quel est le cluster le plus proche du cluster violet dans RN ?,path:./train/t3/5-d-0-tsne-gt.png,path:./train/t3/5-d-0-tsne-dist.png,expect:blue
                id:7,type:color5,question:Quel est le cluster le plus proche du cluster bleu dans RN ?,path:./train/t3/5-d-3-ssm-gt.png,path:./train/t3/5-d-3-ssm-dist.png,expect:purple
                id:8,type:color7,question:Quel est le cluster le plus proche du cluster vert dans RN ?,path:./train/t3/7-b-0-tsne-gt.png,path:./train/t3/7-b-0-tsne-dist.png,expect:brown`
            break;
            
            case "t4":
                this.questionsAsString=
                `id:6,type:struct,question:Quelle caractéristique possède les données dans RN ?,path:./train/t4/7-c-1-tsne-gt.png,path:./train/t4/7-c-1-tsne-dist.png,expect:mix
                id:4,type:struct,question:Quelle caractéristique possède les données dans RN ?,path:./train/t4/5-b-3-ssm-gt.png,path:./train/t4/5-b-3-ssm-dist.png,expect:bubble
                id:5,type:struct,question:Quelle caractéristique possède les données dans RN ?,path:./train/t4/5-c-2-ssm-gt.png,path:./train/t4/5-c-2-ssm-dist.png,expect:mix
                id:3,type:struct,question:Quelle caractéristique possède les données dans RN ?,path:./train/t4/5-b-1-tsne-gt.png,path:./train/t4/5-b-1-tsne-dist.png,expect:bubble
                id:1,type:struct,question:Quelle caractéristique possède les données dans RN ?,path:./train/t4/4-a-1-ssm-gt.png,path:./train/t4/4-a-1-ssm-dist.png,expect:split
                id:7,type:struct,question:Quelle caractéristique possède les données dans RN ?,path:./train/t4/5-d-0-tsne-gt.png,path:./train/t4/5-d-0-tsne-dist.png,expect:close
                id:2,type:struct,question:Quelle caractéristique possède les données dans RN ?,path:./train/t4/4-a-2-tsne-gt.png,path:./train/t4/4-a-2-tsne-dist.png,expect:split
                id:8,type:struct,question:Quelle caractéristique possède les données dans RN ?,path:./train/t4/7-d-2-ssm-gt.png,path:./train/t4/7-d-2-ssm-dist.png,expect:close`
            break;

            case "t5":
                this.questionsAsString=
                `id:1,type:count,question:Combien y'a-t-il d'outliers dans le cluster violet ?,path:./train/t5/4-a-1-ssm-gt.png,path:./train/t5/4-a-1-ssm-dist.png,expect:4
                id:2,type:count,question:Combien y'a-t-il d'outliers dans le cluster bleu ?,path:./train/t5/4-a-2-tsne-gt.png,path:./train/t5/4-a-2-tsne-dist.png,expect:1
                id:3,type:count,question:Combien y'a-t-il d'outliers dans le cluster rouge ?,path:./train/t5/5-b-1-tsne-gt.png,path:./train/t5/5-b-1-tsne-dist.png,expect:2
                id:4,type:count,question:Combien y'a-t-il d'outliers dans le cluster bleu ?,path:./train/t5/5-b-2-ssm-gt.png,path:./train/t5/5-b-2-ssm-dist.png,expect:1`
            break;
        }
        
        let lines = this.questionsAsString.split('\n');
        lines.forEach(line => {
            let q = new Question();
            q.buildQuestionFromString(line);
            this.questions.push(q);
        })
        this.currentQuestionIndex = 0;
        this.state = {
            currentQuestion: this.questions[this.currentQuestionIndex],
            firstReady: false,
            ready: true,
            dummy: Date.now()
        }
        this.ready = true;
    }

    cancelFunc(t: TrainingComponent) {
        t.setState({
            currentQuestion:t.state.currentQuestion,
            firstReady:t.state.firstReady,
            ready:t.state.ready,
            dummy:Date.now()
        });
    }

    proceedFunc(t: TrainingComponent) {
        if (!t.hasAnswered) {
            console.log(t);
            if (this.dummyEvalController.currentAnswerText == t.state.currentQuestion?.expectedAnswer.label) {
                t.hasAnswered = true;
                t.setState({
                    currentQuestion:t.state.currentQuestion,
                    firstReady:t.state.firstReady,
                    ready:t.state.ready,
                    dummy:Date.now()
                });
            } else {
                t.hasWrongAnswer = true;
                t.setState({
                    currentQuestion:t.state.currentQuestion,
                    firstReady:t.state.firstReady,
                    ready:t.state.ready,
                    dummy:Date.now()
                });
                return;
            }
        } else {
            t.currentQuestionIndex += 1;
            if (t.currentQuestionIndex == t.questions.length) {
                t.props.master.nextPage(t.props.master);
                return;
            }
            t.setState({
                currentQuestion:t.questions[t.currentQuestionIndex],
                firstReady:t.state.firstReady,
                ready:t.state.ready,
                dummy:Date.now()
            });
            t.hasAnswered = false;
            t.hasWrongAnswer = false;
        }
    }

    loadQuestion() {
        console.log("loading question...")
        let q = this.dummyEvalController.getCurrentQuestion();
        if (q != null) {
            this.setState({
                currentQuestion: q,
                firstReady: false,
                ready: true
            });
        } else {
            console.log("Quizz ended")
            this.ended = true;
            this.ready = false;
            this.setState({currentQuestion: null,
                firstReady: false,
                ready: true})
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
            console.log(this.dummyEvalController.questions)
            let q = <QuestionComponent key={"questionComponent" + Date.now()} question={this.state.currentQuestion!} evalController={this.dummyEvalController!} timeStart={0} useExplain={this.hasAnswered || this.hasWrongAnswer}/>;
            this.questionComponent = q;
            let hint = <span></span>;
            if (this.hasAnswered && !this.hasWrongAnswer) {
                if (this.currentQuestionIndex == this.questions.length - 1) {
                    hint = <span className="green-text">Correct ! Cliquer sur Suivant pour passer à la tâche suivante.</span>;
                } else {
                    hint = <span className="green-text">Correct ! Cliquer sur Suivant pour passer à l'essai suivant.</span>;
                }
            } else if (this.hasWrongAnswer) {
                hint = <span className="red-text">Incorrect !</span>;
                this.hasWrongAnswer = false;
            }
            let divs = <div className="question-main">
                {this.questionComponent}
                <div className="question-controls">
                    {hint}
                    <div className="control-cancel" onClick={() => this.cancelFunc(this)}>Annuler</div>
                    <div className="control-proceed" onClick={() => this.proceedFunc(this)}>Suivant</div>
                </div>
            </div>
                return divs;
        } else {
            console.log("skip render")
            return null;
        }
    }

}
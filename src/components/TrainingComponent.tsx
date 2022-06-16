import React from "react";
import { Alert, Button, Col, Row } from "react-bootstrap";
import { ClassificationTypeNames } from "typescript";
import { Locale, LocaleManager } from "../LocaleManager";
import { Answer } from "../types/Answer";
import { EvalController } from "../types/EvalController";
import { Question, QuestionType } from "../types/Question";
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
    nextQuestionTimer: number;
    startedTimer: boolean;
}

interface LocaleQuestions {
    [key:string]:string
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

    public frenchQuestions : LocaleQuestions = {
        "t1":`id:1,type:color4,question:Quel est l'étiquette de groupe la plus représentée ?,path:./train/t2/4-a-0-ssm-gt.png,expect:purple
        id:2,type:color4,question:Quel est l'étiquette de groupe la plus représentée ?,path:./train/t2/4-a-1-tsne-gt.png,expect:blue
        id:3,type:color5,question:Quel est l'étiquette de groupe la plus représentée ?,path:./train/t2/5-c-3-tsne-gt.png,expect:orange
        id:4,type:color8,question:Quel est l'étiquette de groupe la plus représentée ?,path:./train/t2/8-a-0-ssm-gt.png,expect:orange`,
        "t2":`id:6,type:color5,question:Quel est le groupe le plus proche du groupe violet dans RN ?,path:./train/t3/5-d-0-tsne-gt.png,path:./train/t3/5-d-0-tsne-dist.png,expect:blue,out:purple
        id:7,type:color5,question:Quel est le groupe le plus proche du groupe bleu dans RN ?,path:./train/t3/5-d-3-ssm-gt.png,path:./train/t3/5-d-3-ssm-dist.png,expect:purple,out:blue
        id:5,type:color5,question:Quel est le groupe le plus proche du groupe orange dans RN ?,path:./train/t3/5-b-0-ssm-gt.png,expect:green,out:orange
        id:8,type:color7,question:Quel est le groupe le plus proche du groupe vert dans RN ?,path:./train/t3/7-b-0-tsne-gt.png,expect:brown,out:green`,
        "t3":`id:2,type:struct,question:Quelle est la topologie des données dans RN ?,path:./train/t4/4-a-2-tsne-gt.png,expect:split
        id:4,type:struct,question:Quelle est la topologie des données dans RN ?,path:./train/t4/5-b-3-ssm-gt.png,expect:bubble
        id:8,type:struct,question:Quelle est la topologie des données dans RN ?,path:./train/t4/7-d-2-ssm-gt.png,path:./train/t4/7-d-2-ssm-dist.png,expect:close
        id:6,type:struct,question:Quelle est la topologie des données dans RN ?,path:./train/t4/7-c-1-tsne-gt.png,path:./train/t4/7-c-1-tsne-dist.png,expect:mix`,
        "t4":`id:1,type:count,question:Combien y'a-t-il d'intrus dans le groupe bleu ?,path:./train/t5/5-a5-2-ssm-gt.png,expect:5
        id:2,type:count,question:Combien y'a-t-il d'intrus dans le groupe vert ?,path:./train/t5/5-a0.006-4-ssm-gt.png,expect:14
        id:3,type:count,question:Combien y'a-t-il d'intrus dans le groupe bleu ?,path:./train/t5/4-a-2-tsne-gt.png,expect:1
        id:4,type:count,question:Combien y'a-t-il d'intrus dans le groupe rouge ?,path:./train/t5/3-a0-0-tsne-gt.png,expect:0`
    }

    public englishQuestions : LocaleQuestions = {
        "t1":`id:1,type:color4,question:What is the most represented group label ?,path:./train/t2/4-a-0-ssm-gt.png,expect:purple
        id:2,type:color4,question:What is the most represented group label ?,path:./train/t2/4-a-1-tsne-gt.png,expect:blue
        id:3,type:color5,question:What is the most represented group label ?,path:./train/t2/5-c-3-tsne-gt.png,expect:orange
        id:4,type:color8,question:What is the most represented group label ?,path:./train/t2/8-a-0-ssm-gt.png,expect:orange`,
        "t2":`id:6,type:color5,question:Which group is closest to the purple group in RN ?,path:./train/t3/5-d-0-tsne-gt.png,path:./train/t3/5-d-0-tsne-dist.png,expect:blue,out:purple
        id:7,type:color5,question:Which group is closest to the blue group in RN ?,path:./train/t3/5-d-3-ssm-gt.png,path:./train/t3/5-d-3-ssm-dist.png,expect:purple,out:blue
        id:5,type:color5,question:Which group is closest to the orange group in RN ?,path:./train/t3/5-b-0-ssm-gt.png,expect:green,out:orange
        id:8,type:color7,question:Which group is closest to the green group in RN ?,path:./train/t3/7-b-0-tsne-gt.png,expect:brown,out:green`,
        "t3":`id:2,type:struct,question:What is the data topology in RN ?,path:./train/t4/4-a-2-tsne-gt.png,expect:split
        id:4,type:struct,question:What is the data topology in RN ?,path:./train/t4/5-b-3-ssm-gt.png,expect:bubble
        id:8,type:struct,question:What is the data topology in RN ?,path:./train/t4/7-d-2-ssm-gt.png,path:./train/t4/7-d-2-ssm-dist.png,expect:close
        id:6,type:struct,question:What is the data topology in RN ?,path:./train/t4/7-c-1-tsne-gt.png,path:./train/t4/7-c-1-tsne-dist.png,expect:mix`,
        "t4":`id:1,type:count,question:How many outliers are there in the blue group ?,path:./train/t5/5-a5-2-ssm-gt.png,expect:5
        id:2,type:count,question:How many outliers are there in the green group ?,path:./train/t5/5-a0.006-4-ssm-gt.png,expect:14
        id:3,type:count,question:How many outliers are there in the blue group ?,path:./train/t5/4-a-2-tsne-gt.png,expect:1
        id:4,type:count,question:How many outliers are there in the red group ?,path:./train/t5/3-a0-0-tsne-gt.png,expect:0`
    }


    public dummyEvalController: EvalController;

    constructor(props: any) {
        super(props);
        
        this.dummyEvalController = new EvalController();
        switch(LocaleManager.currentLocale) {
            case Locale.French:
                this.questionsAsString = this.frenchQuestions[props.case]
                break;
            default:
                this.questionsAsString = this.englishQuestions[props.case]
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
            dummy: Date.now(),
            nextQuestionTimer: 0,
            startedTimer: false
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
    
    goBack(t: TrainingComponent) {
        t.props.master.prevPage(t.props.master);
    }

    timeoutFunction(t: TrainingComponent) {
        if (t.state.nextQuestionTimer > 0) {
            if (t.state.startedTimer) {
                t.setState({nextQuestionTimer : t.state.nextQuestionTimer - 1})
                setTimeout(() => this.timeoutFunction(t), 1000)
            }
        } else {
            if (t.state.startedTimer) {
                this.proceedFunc(t)
                t.setState({startedTimer: false})
            }
        }
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
                    dummy:Date.now(),
                    nextQuestionTimer: 4,
                    startedTimer: true
                });
                setTimeout(() => this.timeoutFunction(t), 1000)
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
                startedTimer: false,
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
                    hint = <Alert variant="success">{LocaleManager.getAnswerText("alert-correct-1")}</Alert>;
                } else {
                    hint = <Alert variant="success">{LocaleManager.getAnswerText("alert-correct-2")}</Alert>;
                }
            } else if (this.hasWrongAnswer) {
                hint = <Alert variant="danger">{LocaleManager.getAnswerText("alert-incorrect")}"{LocaleManager.getAnswerText(this.state.currentQuestion?.expectedAnswer.label!)}".</Alert>;
                this.hasWrongAnswer = false;
            }
            let divs = <div className="d-grid gap-2">
                {this.questionComponent}
                <div className="d-flex justify-content-between">
                    <Button variant="primary" onClick={() => this.goBack(this)}>{LocaleManager.getAnswerText("back-to-intro")}</Button>
                    {this.state.currentQuestion?.type === QuestionType.Count ? <Button variant="warning" onClick={() => this.cancelFunc(this)}>{LocaleManager.getAnswerText("cancel")}</Button> : ""}
                    <Button variant={this.hasAnswered && !this.hasWrongAnswer ? "primary" : "success"} onClick={() => this.proceedFunc(this)}>{this.hasAnswered && !this.hasWrongAnswer ? LocaleManager.getAnswerText("next") + " (" + this.state.nextQuestionTimer + "s)" : LocaleManager.getAnswerText("proceed")}</Button>
                </div>
                <Row className="justify-content-center">
                    {hint}
                </Row>
            </div>
                return divs;
        } else {
            console.log("skip render")
            return null;
        }
    }

}
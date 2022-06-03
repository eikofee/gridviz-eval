import React from "react";
import { Answer, AnswerType } from "../types/Answer";
import { EvalController } from "../types/EvalController";
import { Question, QuestionType } from "../types/Question";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Col, Container, Image, Row } from "react-bootstrap";
import 'katex/dist/katex.min.css';
import TeX from '@matejmazur/react-katex';
import { LocaleManager } from "../LocaleManager";

interface IProps {
    evalController: EvalController;
    question: Question;
    timeStart: number;
    useExplain: boolean;
    // questionCount : number; à bouger
}

interface IState {
    answerIndex: number;
    answerText: string;
    answerTime: number;
    questionTimeStart: number;
    useExplain: boolean;
    hasAnswered: boolean;
}

export class QuestionComponent extends React.Component<IProps, IState> {
    public hasLegend: boolean = false;
    constructor(props: any) {
        super(props);
        this.state = {
            answerIndex : -1,
            // answerIndex : this.props.question.type == QuestionType.Count ? 0 : -1,
            answerText: "0",
            answerTime: 0,
            questionTimeStart: this.props.timeStart == 0 ? Date.now() : this.props.timeStart,
            useExplain: this.props.useExplain,
            hasAnswered: false
        };
        // console.log("set current time start at " + this.state.questionTimeStart);
        this.props.evalController.currentAnswerIndex = this.state.answerIndex;
        this.props.evalController.currentAnswerText = this.state.answerText;
        this.props.evalController.currentAnswerTime = this.state.answerTime;
        this.props.evalController.currentQuestionTimeStart = this.state.questionTimeStart;
        if (this.props.question.imagePaths.length > 1) {
            this.hasLegend = true;
        }
    }

    generateNumericalKeyboard(from: number, to:number, out: string[] = []) : JSX.Element[] {
        let result = [];
        for (let i = from; i <= to; i++) {
            let f = (t: QuestionComponent) => {
                let newValue = this.state.hasAnswered ? t.state.answerIndex * 10 + i : i;
                let newText = "" + newValue;
                t.setState({
                    hasAnswered: true,
                    answerIndex: newValue,
                    answerText: newText,
                    answerTime: t.state.answerTime,
                    questionTimeStart: t.state.questionTimeStart
                })
            }
            let a = <Button className="outline-secondary" onClick={() => f(this)}>{i}</Button>
            if (!out.includes("" + i)) {
                result.push(a);
            }
        }
        // return [<Row className="col-5 gap-1">{result}</Row>];
        return result;
    }

    generateStructKeyboard(out: string[] = []) : JSX.Element[] {
        let structNames = ["split", "bubble", "mix", "close"]
        let f = (t: QuestionComponent, i: number) => {
            t.setState({
                hasAnswered: true,
                answerIndex: i,
                answerText: structNames[i],
                answerTime: t.state.answerTime,
                questionTimeStart: t.state.questionTimeStart
            });
        }

        let s1 = !out.includes("split") ? <Button variant={this.state.answerText == "split" ? "success" : "outline-secondary"} onClick={() => f(this, 0)}><Image fluid src="ans/struct1.png" title={LocaleManager.getAnswerText("title-split")} className="answer-image"/></Button> : <div></div>
        let s2 = !out.includes("bubble") ? <Button variant={this.state.answerText == "bubble" ? "success" : "outline-secondary"} onClick={() => f(this, 1)}><Image fluid src="ans/struct2.png" title={LocaleManager.getAnswerText("title-bubble")} className="answer-image"/></Button> : <div></div>
        let s3 = !out.includes("mix") ? <Button variant={this.state.answerText == "mix" ? "success" : "outline-secondary"} onClick={() => f(this, 2)}><Image fluid src="ans/struct3.png" title={LocaleManager.getAnswerText("title-mix")} className="answer-image"/></Button> : <div></div>
        let s4 = !out.includes("close") ? <Button variant={this.state.answerText == "close" ? "success" : "outline-secondary"} onClick={() => f(this, 3)}><Image fluid src="ans/struct4.png" title={LocaleManager.getAnswerText("title-close")} className="answer-image"/></Button> : <div></div>
        let result = [s1, s2, s3, s4]; // ...
        return result;
    }

    generateColorKeyboard(i : number, out: string[] = []) : JSX.Element[] {
        let result = []
        let colorArray = [
            "red", "blue", "green", "purple", "orange", "yellow", "brown", "pink", "gray"
        ]
        let f = (t: QuestionComponent, index : number) => {
            t.setState({
                hasAnswered: true,
                answerIndex: index,
                answerText: t.state.answerIndex == 0 ? "" : t.state.answerIndex == i ? "none" : index == i ? "none" : colorArray[index],
                answerTime: t.state.answerTime,
                questionTimeStart: t.state.questionTimeStart
            });
        }
        for (let ii = 0; ii < i; ++ii) {
            let className = this.state.answerIndex == ii ? "success" : "outline-secondary";
            let a = 
                <Button variant={className} key={"a" + colorArray[ii]} onClick={() => f(this, ii)}>
                    <Image fluid src={"ans/" + colorArray[ii] + ".jpg"} title={LocaleManager.getAnswerText(colorArray[ii])} className="answer-color"/>
                </Button>
                console.log(out)
            if (!out.includes(colorArray[ii])) {
                result.push(a);
            }
        }
        return result;
    }

    componentDidUpdate(prevProps: IProps, prevState: IState) {
        this.props.evalController.currentAnswerIndex = this.state.answerIndex;
        this.props.evalController.currentAnswerText = this.state.answerText;
        this.props.evalController.currentAnswerTime = this.state.answerTime;
        this.props.evalController.currentQuestionTimeStart = this.state.questionTimeStart;
        this.props.evalController.setHasAnswered(this.state.hasAnswered);
    }

    getExplainPath(s: string) {
        let sp = s.split(".")
        let sps = s.split("." + sp[sp.length - 1]);
        return sps[0] + "-exp." + sp[sp.length - 1];
    }

    render() {
        let answers :JSX.Element[] = [];
        let answers2 :JSX.Element[] = [];
        if (this.props.question.type == QuestionType.Count) {
            answers = this.generateNumericalKeyboard(0, 4,this.props.question.answersToRemove);
            answers2 = this.generateNumericalKeyboard(5, 9,this.props.question.answersToRemove);
        } else if (this.props.question.type == QuestionType.Color3) {
            answers = this.generateColorKeyboard(3,this.props.question.answersToRemove);
        } else if (this.props.question.type == QuestionType.Color4) {
            answers = this.generateColorKeyboard(4,this.props.question.answersToRemove);
        } else if (this.props.question.type == QuestionType.Color5) {
            answers = this.generateColorKeyboard(5,this.props.question.answersToRemove);
        } else if (this.props.question.type == QuestionType.Color6) {
            answers = this.generateColorKeyboard(6,this.props.question.answersToRemove);
        } else if (this.props.question.type == QuestionType.Color7) {
            answers = this.generateColorKeyboard(7,this.props.question.answersToRemove);
        } else if (this.props.question.type == QuestionType.Color8) {
            answers = this.generateColorKeyboard(8,this.props.question.answersToRemove);
        } else if (this.props.question.type == QuestionType.Struct) {
            answers = this.generateStructKeyboard(this.props.question.answersToRemove);
        } else {
            this.props.question.answers.forEach(ans => {
                let funcAnswer = (q: QuestionComponent) => {
                    q.setState({
                        hasAnswered: true,
                        answerIndex : ans.index,
                        answerText : ans.label
                    });
                }
                let className = this.state.answerIndex == ans.index ? "success" : "outline-success";
                let content = ans.type == AnswerType.Image ? <img className="answer-image" src={ans.label} /> : ans.label;
                content = ans.type == AnswerType.Color ? <img className="answer-color" src={"./ans/" + ans.label + ".jpg"} /> : content;
                let elem = <Col className="justify-content-center d-grid"><Button key={"elem" + ans.label} variant={className} onClick={() => funcAnswer(this)}>{content}</Button></Col>;
                if (!this.props.question.answersToRemove.includes(ans.label)) {
                    answers.push(elem);
                }
            });
        }
        let imagesPaths = this.props.question.imagePaths;
        if (this.state.useExplain) {
            imagesPaths = imagesPaths.map(s => this.getExplainPath(s));
        }
        let questionText = <Container className=" d-flex justify-content-center gap-1">{this.props.question.question}</Container>
        let questionTextArray = this.props.question.question.split("RN")
        if (questionTextArray.length > 1) {
            questionText = <Container className=" d-flex justify-content-center gap-1">{questionTextArray[0]}<TeX>{`\\mathbb{R}^N`}</TeX>{questionTextArray[1]}</Container>
        }
        let images = imagesPaths.map(p => <Col xs={6}><Image src={p} title="question"/></Col>);
        let result = <Container fluid className="d-flex flex-column gap-2">
            <Row className="justify-content-center">{images}</Row>
            {questionText}
            {this.hasLegend ? <Row className="justify-content-center"><Col xs={3}><Image fluid src={LocaleManager.getPath("legend")} className="legend"/></Col></Row> : ""}
            {this.props.question.type == QuestionType.Count ? <Row className="justify-content-center">{this.state.hasAnswered ? this.state.answerText : "..."}</Row>:""}
            <div className="d-flex justify-content-center">{answers}</div>
            {answers2.length > 0 ? <div className="d-flex justify-content-center">{answers2}</div> : ""}
        </Container>
        return result;
    }
}
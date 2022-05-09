import React from "react";
import { Answer, AnswerType } from "../types/Answer";
import { EvalController } from "../types/EvalController";
import { Question, QuestionType } from "../types/Question";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Col, Container, Image, Row } from "react-bootstrap";


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
}

export class QuestionComponent extends React.Component<IProps, IState> {
    public hasLegend: boolean = false;
    constructor(props: any) {
        super(props);
        this.state = {
            // answerIndex : -1,
            answerIndex : this.props.question.type == QuestionType.Count ? 0 : -1,
            answerText: "0",
            answerTime: 0,
            questionTimeStart: this.props.timeStart == 0 ? Date.now() : this.props.timeStart,
            useExplain: this.props.useExplain
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

    generateNumericalKeyboard(from: number, to:number) : JSX.Element[] {
        let result = [];
        for (let i = from; i <= to; i++) {
            let f = (t: QuestionComponent) => {
                t.setState({
                    answerIndex: t.state.answerIndex * 10 + i,
                    answerText: t.state.answerIndex == 0 ? "" + i : "" + (t.state.answerIndex * 10 + i),
                    answerTime: t.state.answerTime,
                    questionTimeStart: t.state.questionTimeStart
                })
            }
            let a = <Col><Button className="outline-secondary" onClick={() => f(this)}>{i}</Button></Col>
            result.push(a);
        }
        return [<Row className="col-5 gap-1">{result}</Row>];
    }

    generateStructKeyboard() : JSX.Element[] {
        let structNames = ["split", "bubble", "mix", "close"]
        let f = (t: QuestionComponent, i: number) => {
            t.setState({
                answerIndex: i,
                answerText: structNames[i],
                answerTime: t.state.answerTime,
                questionTimeStart: t.state.questionTimeStart
            });
        }

        let s1 = <Col className="justify-content-center d-grid"> <Button variant={this.state.answerText == "split" ? "success" : "outline-secondary"} onClick={() => f(this, 0)}><Image fluid src="ans/struct1.png" title="Les clusters sont tous éloignés les uns des autres dans RN" className="answer-image"/></Button></Col>
        let s2 = <Col className="justify-content-center d-grid"> <Button variant={this.state.answerText == "bubble" ? "success" : "outline-secondary"} onClick={() => f(this, 1)}><Image fluid src="ans/struct2.png" title="Au moins un cluster est à l'intérieur d'un autre sans se mélanger dans RN" className="answer-image"/></Button></Col>
        let s3 = <Col className="justify-content-center d-grid"> <Button variant={this.state.answerText == "mix" ? "success" : "outline-secondary"} onClick={() => f(this, 2)}><Image fluid src="ans/struct3.png" title="Au moins deux clusters se superposent dans RN" className="answer-image"/></Button></Col>
        let s4 = <Col className="justify-content-center d-grid"> <Button variant={this.state.answerText == "close" ? "success" : "outline-secondary"} onClick={() => f(this, 3)}><Image fluid src="ans/struct4.png" title="Au moins deux clusters sont proches dans RN par rapport aux autres" className="answer-image"/></Button></Col>
        let result = [s1, s2, s3, s4]; // ...
        return result;
    }

    generateColorKeyboard(i : number) : JSX.Element[] {
        let result = []
        let colorArray = [
            "red", "blue", "green", "purple", "orange", "yellow", "brown", "pink", "grey"
        ]
        let f = (t: QuestionComponent, index : number) => {
            t.setState({
                answerIndex: index,
                answerText: t.state.answerIndex == 0 ? "" : t.state.answerIndex == i ? "aucune" : index == i ? "aucune" : colorArray[index],
                answerTime: t.state.answerTime,
                questionTimeStart: t.state.questionTimeStart
            });
        }
        for (let ii = 0; ii < i; ++ii) {
            let className = this.state.answerIndex == ii ? "success" : "outline-secondary";
            let a = 
                // <Col className="justify-content-center d-grid">
                <Button variant={className} key={"a" + colorArray[ii]} onClick={() => f(this, ii)}>
                    <Image fluid src={"ans/" + colorArray[ii] + ".jpg"} title={colorArray[ii]} className="answer-color"/>
                </Button>
            {/* </Col> */}
            result.push(a);
        }
        return result;
    }

    componentDidUpdate(prevProps: IProps, prevState: IState) {
        this.props.evalController.currentAnswerIndex = this.state.answerIndex;
        this.props.evalController.currentAnswerText = this.state.answerText;
        this.props.evalController.currentAnswerTime = this.state.answerTime;
        this.props.evalController.currentQuestionTimeStart = this.state.questionTimeStart;
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
            answers = this.generateNumericalKeyboard(0, 4);
            answers2 = this.generateNumericalKeyboard(5, 9);
        } else if (this.props.question.type == QuestionType.Color3) {
            answers = this.generateColorKeyboard(3);
        } else if (this.props.question.type == QuestionType.Color4) {
            answers = this.generateColorKeyboard(4);
        } else if (this.props.question.type == QuestionType.Color5) {
            answers = this.generateColorKeyboard(5);
        } else if (this.props.question.type == QuestionType.Color6) {
            answers = this.generateColorKeyboard(6);
        } else if (this.props.question.type == QuestionType.Color7) {
            answers = this.generateColorKeyboard(7);
        } else if (this.props.question.type == QuestionType.Color8) {
            answers = this.generateColorKeyboard(8);
        } else if (this.props.question.type == QuestionType.Struct) {
            answers = this.generateStructKeyboard();
        } else {
            this.props.question.answers.forEach(ans => {
                let funcAnswer = (q: QuestionComponent) => {
                    q.setState({
                        answerIndex : ans.index,
                        answerText : ans.label
                    });
                }
                let className = this.state.answerIndex == ans.index ? "success" : "outline-success";
                let content = ans.type == AnswerType.Image ? <img className="answer-image" src={ans.label} /> : ans.label;
                content = ans.type == AnswerType.Color ? <img className="answer-color" src={"./ans/" + ans.label + ".jpg"} /> : content;
                let elem = <Col className="justify-content-center d-grid"><Button key={"elem" + ans.label} variant={className} onClick={() => funcAnswer(this)}>{content}</Button></Col>;
                answers.push(elem);
            });
        }
        let imagesPaths = this.props.question.imagePaths;
        if (this.state.useExplain) {
            imagesPaths = imagesPaths.map(s => this.getExplainPath(s));
        }
        let images = imagesPaths.map(p => <Col xs={6}><Image src={p}/></Col>);
        let result = <Container fluid className="d-flex flex-column gap-2">
            <Row className="justify-content-center">{images}</Row>
            <Row className="justify-content-center">{this.props.question.question}</Row>
            {this.hasLegend ? <Row className="justify-content-center"><Col xs={3}><Image fluid src="./intro/legend.png" className="legend"/></Col></Row> : ""}
            {this.props.question.type == QuestionType.Count ? <Row className="justify-content-center">{this.state.answerText}</Row>:""}
            <div className="d-flex justify-content-center">{answers}</div>
            {answers2.length > 0 ? <div className="d-flex justify-content-center">{answers2}</div> : ""}
        </Container>
        return result;
    }
}
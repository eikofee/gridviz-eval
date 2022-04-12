import React from "react";
import { Answer, AnswerType } from "../types/Answer";
import { EvalController } from "../types/EvalController";
import { Question, QuestionType } from "../types/Question";

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
    }

    generateNumericalKeyboard() : JSX.Element[] {
        let result = [];
        for (let i = 0; i < 10; i++) {
            let f = (t: QuestionComponent) => {
                t.setState({
                    answerIndex: t.state.answerIndex * 10 + i,
                    answerText: t.state.answerIndex == 0 ? "" + i : "" + (t.state.answerIndex * 10 + i),
                    answerTime: t.state.answerTime,
                    questionTimeStart: t.state.questionTimeStart
                })
            }
            let a = <div className="question-answer keyboard" onClick={() => f(this)}>{i}</div>
            result.push(a);
        }
        return result;
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
        
        let s1 = <div className={this.state.answerText == "split" ? "question-answer selected" : "question-answer"} onClick={() => f(this, 0)}><img src="ans/struct1.png" alt="Les clusters sont tous éloignés les uns des autres dans RN" className="answer-image"/></div>
        let s2 = <div className={this.state.answerText == "bubble" ? "question-answer selected" : "question-answer"} onClick={() => f(this, 1)}><img src="ans/struct2.png" alt="Au moins un cluster est à l'intérieur d'un autre sans se mélanger dans RN" className="answer-image"/></div>
        let s3 = <div className={this.state.answerText == "mix" ? "question-answer selected" : "question-answer"} onClick={() => f(this, 2)}><img src="ans/struct3.png" alt="Au moins deux clusters se superposent dans RN" className="answer-image"/></div>
        let s4 = <div className={this.state.answerText == "close" ? "question-answer selected" : "question-answer"} onClick={() => f(this, 3)}><img src="ans/struct4.png" alt="Au moins deux clusters sont proches dans RN par rapport aux autres" className="answer-image"/></div>
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
            let className = this.state.answerIndex == ii ? "question-answer selected" : "question-answer";
            let a = <div className={className} key={"a" + colorArray[ii]} onClick={() => f(this, ii)}><img src={"ans/" + colorArray[ii] + ".jpg"} alt={colorArray[ii]} className="answer-color"/></div>
            result.push(a);
        }
        let className = this.state.answerIndex == i ? "question-answer selected" : "question-answer";
        let az = <div className={className} key={"anone"} onClick={() => f(this, i)}><img src="ans/none.png" alt="aucune en particulier" className="answer-color"/></div>
        result.push(az);
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
        if (this.props.question.type == QuestionType.Count)
            answers = this.generateNumericalKeyboard();
        else if (this.props.question.type == QuestionType.Color3) {
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
                let className = this.state.answerIndex == ans.index ? "question-answer selected" : "question-answer";
                let content = ans.type == AnswerType.Image ? <img className="answer-image" src={ans.label} /> : ans.label;
                content = ans.type == AnswerType.Color ? <img className="answer-color" src={"./ans/" + ans.label + ".jpg"} /> : content;
                let elem = <div key={"elem" + ans.label} className={className} onClick={() => funcAnswer(this)}>{content}</div>;
                answers.push(elem);
            });
        }
        let imagesPaths = this.props.question.imagePaths;
        if (this.state.useExplain) {
            imagesPaths = imagesPaths.map(s => this.getExplainPath(s));
        }
        let images = imagesPaths.map(p => <img src={p}/>);
        let result = <div className="question-div">
            <div className="question-image">{images}</div>
            <div className="question-text">{this.props.question.question}</div>
            {this.props.question.type == QuestionType.Count ? <div className="question-text">{this.state.answerText}</div>:<div></div>}
            <div className="question-answers">{answers}</div>
        </div>
        return result;
    }
}
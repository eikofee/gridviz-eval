import React from "react";
import { Answer } from "../types/Answer";
import { EvalController } from "../types/EvalController";
import { Question, QuestionType } from "../types/Question";

interface IProps {
    evalController: EvalController;
    question: Question;
    timeStart: number;
    // questionCount : number; à bouger
}

interface IState {
    answerIndex: number;
    answerText: string;
    answerTime: number;
    questionTimeStart: number;
}

export class QuestionComponent extends React.Component<IProps, IState> {
    constructor(props: any) {
        super(props);
        this.state = {
            answerIndex : -1,
            // answerIndex : this.props.question.type == QuestionType.Count ? 0 : -1,
            answerText: "0",
            answerTime: 0,
            questionTimeStart: this.props.timeStart == 0 ? Date.now() : this.props.timeStart
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

    componentDidUpdate(prevProps: IProps, prevState: IState) {
        this.props.evalController.currentAnswerIndex = this.state.answerIndex;
        this.props.evalController.currentAnswerText = this.state.answerText;
        this.props.evalController.currentAnswerTime = this.state.answerTime;
        this.props.evalController.currentQuestionTimeStart = this.state.questionTimeStart;
    }

    render() {
        let answers :JSX.Element[] = [];
        // if (this.props.question.type == QuestionType.Count)
            // answers = this.generateNumericalKeyboard();
        // else {
            this.props.question.answers.forEach(ans => {
                let funcAnswer = (q: QuestionComponent) => {
                    q.setState({
                        answerIndex : ans.index,
                        answerText : ans.label
                    });
                }
                let className = this.state.answerIndex == ans.index ? "question-answer selected" : "question-answer";
                let elem = <div key={"elem" + ans.label} className={className} onClick={() => funcAnswer(this)}>{ans.label}</div>;
                answers.push(elem);
            });
        // }
        let result = <div className="question-div">
            <div className="question-image"><img src={this.props.question.imagePath}/></div>
            <div className="question-text">{this.props.question.question}</div>
            {/* {this.props.question.type == QuestionType.Count ? <div className="question-text">{this.state.answerText}</div>:<div></div>} */}
            <div className="question-answers">{answers}</div>
        </div>
        return result;
    }
}
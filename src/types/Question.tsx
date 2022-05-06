
import { Answer, AnswerType } from "./Answer";


export enum QuestionType {
    None,
    // TrueFalse,
    // WhichAre,
    Sort,
    Count,
    Compare,
    Struct,
    Color3,
    Color4,
    Color5,
    Color6,
    Color7,
    Color8,
}

export class Question {


    constructor(
        public id: number = 0,
        public type: QuestionType = QuestionType.None,
        public question: string = "",
        public imagePaths: string[] = [],
        public answers:Answer[] = [],
        public expectedAnswer: Answer = new Answer(),
        public skipCD: boolean = false
    ) {}

    // e.g.: id:4,type:compare,question:Les distances A et B dans R^n sont...,path:./img/q4.png,ans:Similaire,ans:Différents,ans:Très différents
    public buildQuestionFromString(str: string, sep: string = ",") {
        let args = str.split(sep);
        args.forEach(arg => {
            let s = arg.split(":");
            let strType = s[0];
            let strValue = s[1];
            if (strType == "id")
                this.id = parseInt(strValue);
            if (strType == "type")
                this.type = this.readTypeOfQuestion(strValue);
            if (strType == "cd"){
                this.skipCD = strValue.includes("skip");
            }
            if (strType == "question")
                this.question = strValue;
            if (strType == "path")
                this.imagePaths.push(strValue);
            if (strType == "ans") {
                let currentAnswerIndex = this.answers.length;
                let a = new Answer();
                a.type = AnswerType.Text;
                if (strValue.includes("~")) {
                    let strSplit = strValue.split("~");
                    let answerType = strSplit[0];
                    let answerStr = strSplit[1];
                    a.label = answerStr;
                    if (answerType == "col") {
                        a.type = AnswerType.Color;
                    } else if (answerType == "img") {
                        a.type = AnswerType.Image;
                    }
                } else {
                    a.label = strValue;
                }
                a.index = currentAnswerIndex;
                this.answers.push(a);
            }
            if (strType == "expect") {
                let a = new Answer();
                a.type = AnswerType.Text;
                if (strValue.includes("~")) {
                    let strSplit = strValue.split("~");
                    let answerType = strSplit[0];
                    let answerStr = strSplit[1];
                    a.label = answerStr;
                    if (answerType == "col") {
                        a.type = AnswerType.Color;
                    } else if (answerType == "img") {
                        a.type = AnswerType.Image;
                    }
                } else {
                    a.label = strValue;
                }
                this.expectedAnswer = a;
            }
        });
    }

    private readTypeOfQuestion(str: string): QuestionType {
        if (str == "sort")
            return QuestionType.Sort;
        if (str == "count")
            return QuestionType.Count;
        if (str == "compare")
            return QuestionType.Compare;
        if (str == "struct")
            return QuestionType.Struct;
        if (str == "color3")
            return QuestionType.Color3;
        if (str == "color4")
            return QuestionType.Color4;
        if (str == "color5")
            return QuestionType.Color5;
        if (str == "color6")
            return QuestionType.Color6;
        if (str == "color7")
            return QuestionType.Color7;
        if (str == "color8")
            return QuestionType.Color8;
        return QuestionType.None;
    }
}
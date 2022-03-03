
import { Answer } from "./Answer";

export enum QuestionType {
    None,
    // TrueFalse,
    // WhichAre,
    Sort,
    Count,
    Compare,
}

export class Question {


    constructor(
        public id: number = 0,
        public type: QuestionType = QuestionType.None,
        public question: string = "",
        public imagePath: string = "",
        public answers:Answer[] = [],
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
            if (strType == "question")
                this.question = strValue;
            if (strType == "path")
                this.imagePath = strValue;
            if (strType == "ans") {
                let currentAnswerIndex = this.answers.length;
                let a = new Answer();
                a.index = currentAnswerIndex;
                a.label = strValue;
                this.answers.push(a);
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
        return QuestionType.None;
    }
}
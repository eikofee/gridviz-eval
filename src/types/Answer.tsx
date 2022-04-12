export enum AnswerType {
    Text,
    Image,
    Color,
}

export class Answer {
    constructor(
        public index: number = 0,
        public type: AnswerType = AnswerType.Text,
        public label: string = ""
    ) {}
}
import { Answer } from "./Answer";
import { Question } from "./Question";
import { QuestionComponent } from "../components/QuestionComponent";
import { EvalControllerComponent } from "../components/EvalControllerComponent";

export class AnsweredQuestion {
    question: Question;
    answer: Answer;
    time: number;

    constructor(q: Question, a: Answer, t: number) {
        this.question = q;
        this.answer = a;
        this.time = t;
    }
}

export class EvalController {
    public results : AnsweredQuestion[] = [];
    public questions : Question[] = [];
    public currentQuestionIndex : number = 0;
    public evalControllerComponent: EvalControllerComponent | null = null;
    public hasRead: boolean = false;

    public currentAnswerIndex = -1;
    public currentAnswerText = "";
    public currentAnswerTime = 0;
    public currentQuestionTimeStart = 0;

    public shuffleQuestions() {
        this.questions.sort((a, b) => Math.random() - 0.5);
    }

    public getQuestionCount() {
        return this.questions.length;
    }

    public getCurrentQuestion() : Question|null {
        if (this.currentQuestionIndex < this.questions.length) {
            let q = this.questions[this.currentQuestionIndex];
            return q;
        }
        return null;
    }

    public registerAnswer(q: Question, a: Answer, t: number) {
        let aq = new AnsweredQuestion(q, a, t);
        this.results.push(aq);
        this.currentQuestionIndex += 1;
    }

    public loadQuestionsFromFileFinish(content: string, c: React.Component) {
        if (!this.hasRead) {
            let lines = content.split('\n');
            lines.forEach(line => {
                let q = new Question();
                q.buildQuestionFromString(line);
                this.questions.push(q);
            })
            this.hasRead = true;
            c.setState({
                currentQuestionComponent: null,
                firstReady: true,
                ready: false
            });
            
        }
    }

    public getResultsAsString() {
        let r = "questionIndex,answerIndex,timeInMs\n";
        this.results.forEach(ans => {
            r+= ans.question.id + "," + ans.answer.index + "," + ans.time + "\n";
        });
        return r;

    }

    public loadQuestionsFromFile() {
        console.log("reading questions")
        fetch("./eval-compact.csv")
            .then(r => r.text().then(text => {
                console.log("calling once");
                this.loadQuestionsFromFileFinish(text, this.evalControllerComponent!);
            }));
        console.log("done")
    }
}
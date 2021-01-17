import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuizService } from '@app/_services/quiz.service';
import { first, switchMap } from 'rxjs/operators';
import { QuestionsService } from '../questions.service';
import { Quiz, Answers, Choice, Question } from '../quiz.model';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.scss']
})
export class QuestionsComponent implements OnInit {

  quiz: Quiz;
  answers: Answers;
  questions: Question[];
  currentQuestionIndex: number;

  showResults = false;
  // inject both the active route and the questions service
  constructor(private route: ActivatedRoute, private questionsService: QuestionsService,
              private quizService: QuizService) { }

  // tslint:disable-next-line:typedef
  ngOnInit() {
    // read from the dynamic route and load the proper quiz data
    this.questionsService.getQuestions(this.route.snapshot.params.quizId)
      .subscribe(questions => {
        this.questions = questions;
        this.quizService.updatetotalQuestions(this.questions.length);
        this.answers = new Answers();
        this.currentQuestionIndex = 0;
      });

    if(this.quizService.isChallenger)
    {
      this.quizService.updatetestStartPlayer1(new Date())
    }
    else
    {
      this.quizService.updatetestStartPlayer2(new Date())
    }
  }

  // tslint:disable-next-line:typedef
  updateChoice(choice: string) {
    // @ts-ignore
    this.answers.values[this.currentQuestionIndex] = choice;
  }

  // tslint:disable-next-line:typedef
  nextOrViewResults() {
    if (this.currentQuestionIndex === this.questions.length - 1) {
      if(this.quizService.isChallenger) {
        this.quizService.updatetestEndPlayer1(new Date());
        let correctAnswers = this.answers.values.filter(a => a.correct === true).length;
        this.quizService.updatecorrectAnswersPlayer1(correctAnswers);
        this.quizService.insertRecordInQuiz().pipe(first()).subscribe(
          data => {
            console.log(data);
            this.quizService.getAllQuiz().subscribe(
              quizData => {
                this.quizService.masterQuizData = quizData;
                this.showResults = true;
              }
            )
          },
          error => console.log(error)
        )
      }
      else {
        this.quizService.updatetestEndPlayer2(new Date());
        let correctAnswers = this.answers.values.filter(a => a.correct === true).length;
        this.quizService.updatecorrectAnswersPlayer2(correctAnswers);
        this.quizService.updateRecordInQuiz().pipe(first()).subscribe(
          data => {
            console.log(data);
            this.quizService.getAllQuiz().subscribe(
              quizData => {
                this.quizService.masterQuizData = quizData;
                this.showResults = true;
              }
            )
          },
          error => console.log(error)
        )
      }

      
      return;
    }
    this.currentQuestionIndex++;
  }

  // tslint:disable-next-line:typedef
  reset() {
    this.quiz = undefined;
    this.questions = undefined;
    this.answers = undefined;
    this.currentQuestionIndex = undefined;
  }

}

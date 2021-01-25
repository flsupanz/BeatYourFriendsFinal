import { Component } from '@angular/core';
import { QuizData } from '@app/models/quiz.model';

import { User } from '@app/models';
import { AccountService } from '@app/services';
import { QuizService } from '@app/services/quiz.service';

@Component({ templateUrl: 'home.component.html' })
export class HomeComponent {
  user: User;
  quiz: QuizData[] = [];

  constructor(private accountService: AccountService, private quizService: QuizService) {
    this.user = this.accountService.userValue;
    this.quizService.updatePlayer1(null);
    this.quizService.updatePlayer2(null);
    this.quizService.updatetestStartPlayer1(null);
    this.quizService.updatetestStartPlayer2(null);
    this.quizService.updatetestEndPlayer1(null);
    this.quizService.updatetestEndPlayer2(null);
    this.quizService.updatetotalQuestions(null);
    this.quizService.updatecorrectAnswersPlayer1(null);
    this.quizService.updatecorrectAnswersPlayer2(null);
    this.quizService.updatetestType(null);
    this.quizService.getAllQuiz().subscribe(
      quizData => {
        this.quizService.masterQuizData = quizData;
        this.quiz = this.quizService.masterQuizData;
      }
    );

  }

  setChallenger() {
    this.quizService.isChallenger = true;
    this.quizService.updatePlayer1(+this.user.id);
  }
  setChallenged() {
    this.quizService.isChallenger = false;
    this.quizService.updatePlayer2(+this.user.id);
  }
}

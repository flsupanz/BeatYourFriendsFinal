import { Component, OnInit } from '@angular/core';
import { Quiz, QuizData } from '@app/models/quiz.model';
import { AccountService } from '@app/services/account.service';
import { QuizService } from '@app/services/quiz.service';

@Component({
  selector: 'app-scoreboard',
  templateUrl: './scoreboard.component.html',
  styleUrls: ['./scoreboard.component.css']
})
export class ScoreboardComponent implements OnInit {

  public scoreboard: QuizData[] =[];
  public selectedScoreId: number;
  public userId: number;
  constructor(private quizService: QuizService,
    private accountService: AccountService) {
      this.userId = +this.accountService.userValue.id
  }

  ngOnInit(): void {
    this.scoreboard = this.quizService.getResult();
  }

  public scoreClicked($event, score: QuizData){
    this.selectedScoreId = score.id;
  }

  public scoreResult(score: QuizData) {
    if (score.correctAnswersPlayer1 === null || score.correctAnswersPlayer2 == null) {
      return 'Result Pending';
    }
    if (score.correctAnswersPlayer1 === score.correctAnswersPlayer2) {
      return 'Its a tie tie';
    }
    if (score.player1Id === this.userId) {
      if (score.correctAnswersPlayer1 > score.correctAnswersPlayer2) {
        return 'You Won';
      }
      else {
        return 'You Lost';
      }
    }
    else {
      if (score.correctAnswersPlayer1 > score.correctAnswersPlayer2) {
        return 'You Lost';
      }
      else {
        return 'You Won';
      }
    }
  }

  public getPlayerName(playerId: number) {
    return this.accountService.usersValue.find(u => +u.id === playerId).username;
  }

}

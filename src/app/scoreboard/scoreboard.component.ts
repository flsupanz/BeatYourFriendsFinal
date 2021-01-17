import { Component, OnInit } from '@angular/core';
import { Quiz, QuizData } from '@app/quiz.model';
import { AccountService } from '@app/_services/account.service';
import { QuizService } from '@app/_services/quiz.service';

@Component({
  selector: 'app-scoreboard',
  templateUrl: './scoreboard.component.html',
  styleUrls: ['./scoreboard.component.css']
})
export class ScoreboardComponent implements OnInit {

  public scoreboard: QuizData[] =[];
  public selectedScoreId: number;
  // public showTableFlag: boolean;
  public userId: number;
  constructor(private quizService: QuizService,
    private accountService: AccountService) { 
      this.userId = +this.accountService.userValue.id
  }

  ngOnInit(): void {
    this.scoreboard = this.quizService.getResult();
    // this.showTableFlag = 
    // this.scoreboard.forEach(
    //   score => {
    //     score.testEndPlayer2 !== null ? this.showTableFlag = true : this.showTableFlag = false;
    //   }
    // )
  }

  public scoreClicked($event, score: QuizData){
    this.selectedScoreId = score.id;
    // this.router.navigate(['startGame']);
  }

  public scoreResult(score: QuizData) {
    if(score.correctAnswersPlayer1 === null || score.correctAnswersPlayer2 == null) {
      return 'Result Pending';
    }
    if(score.correctAnswersPlayer1 === score.correctAnswersPlayer2) {
      return 'Its a tie tie'
    }
    if(score.player1Id === this.userId) {
      if(score.correctAnswersPlayer1 > score.correctAnswersPlayer2) {
        return 'You Win';
      }
      else {
        return 'You Lose';
      }
    }
    else {
      if(score.correctAnswersPlayer1 > score.correctAnswersPlayer2) {
        return 'You Lose';
      }
      else {
        return 'You Win';
      }
    }
    // return this.allUsers.find(u => u.id === challenge.player1Id.toString()).username;
  }

  public getPlayerName(playerId: number) {
    return this.accountService.usersValue.find(u => +u.id === playerId).username;
  }

}

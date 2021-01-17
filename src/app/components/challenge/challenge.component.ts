import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { QuizData } from '@app/models/quiz.model';
import { User } from '@app/models';
import { AccountService } from '@app/services/account.service';
import { QuizService } from '@app/services/quiz.service';

@Component({
  selector: 'app-challenge',
  templateUrl: './challenge.component.html',
  styleUrls: ['./challenge.component.css'],
})
export class ChallengeComponent implements OnInit {
  public challenges: QuizData[] = [];
  public selectedChallengeId: number;
  public allUsers: User[] = [];
  public challengerUserName: string;
  constructor(
    private quizService: QuizService,
    private accountService: AccountService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.challenges = this.quizService.getChallenges();
  }

  public challengeClicked($event, challenge: QuizData) {
    this.selectedChallengeId = challenge.id;
    this.quizService.selectedQuizid = this.selectedChallengeId;
    this.quizService.updatePlayer1(challenge.player1Id);
    this.quizService.updatetestStartPlayer1(challenge.testStartPlayer1);
    this.quizService.updatetestEndPlayer1(challenge.testEndPlayer1);
    this.quizService.updatecorrectAnswersPlayer1(challenge.correctAnswersPlayer1);
    this.quizService.updatetestType(challenge.testType);

    this.router.navigate([challenge.testType]);
  }

  public challengerUsername(challenge: QuizData) {
    // this.accountService.users.subscribe((data) => {
    //   this.allUsers = data;
    //   this.challengerUserName =
    //     this.allUsers.find((u) => +u.id === challenge.player1Id) &&
    //     this.allUsers.find((u) => +u.id === challenge.player1Id)
    //       .username;
    // });
    this.challengerUserName =
      this.accountService.usersValue.find(
        (u) => +u.id === challenge.player1Id
      ) &&
      this.accountService.usersValue.find((u) => +u.id === challenge.player1Id)
        .username;
    return false;
  }
}

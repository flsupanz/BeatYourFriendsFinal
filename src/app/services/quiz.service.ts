import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { QuizData, QuizDataPost } from '@app/models/quiz.model';
import { environment } from '@environments/environment';
import { AccountService } from './account.service';

@Injectable({
  providedIn: 'root',
})
export class QuizService {
  public masterQuizData: QuizData[] = [];
  public userGame: QuizDataPost = {
    player1Id: null,
    player2Id: null,
    testStartPlayer1: null,
    testStartPlayer2: null,
    testEndPlayer1: null,
    testEndPlayer2: null,
    totalQuestions: null,
    testType: null,
    correctAnswersPlayer1: null,
    correctAnswersPlayer2: null,
  };
  public isChallenger: boolean;
  public selectedQuizid: number;
  private challenges: QuizData[] = [];
  private results: QuizData[] = [];

  constructor(
    private http: HttpClient,
    private accountService: AccountService
  ) {}
  getAllQuiz() {
    return this.http.get<QuizData[]>(`${environment.apiUrl}/quiz/getAllQuiz`);
  }
  getChallenges() {
    this.challenges = this.masterQuizData.filter(
      (quiz) => quiz.player2Id === +this.accountService.userValue.id && quiz.testEndPlayer2 === null
    );
    return this.challenges;
  }
  getResult() {
    // this.results = [
      // ...this.challenges,
      // ...this.masterQuizData.filter(
      //   (quiz) => quiz.player2Id === +this.accountService.userValue.id
      // ),
    // ];
    this.results = this.masterQuizData.filter(quiz => quiz.player1Id === +this.accountService.userValue.id || quiz.player2Id === +this.accountService.userValue.id )
    return this.results;
  }
  updatePlayer1(player1Id: number | null) {
    this.userGame.player1Id = player1Id;
  }
  updatePlayer2(player2Id: number | null) {
    this.userGame.player2Id = player2Id;
  }
  updatetestStartPlayer1(startTimePlayer1: Date | null) {
    this.userGame.testStartPlayer1 = startTimePlayer1;
  }
  updatetestStartPlayer2(startTimePlayer2: Date | null) {
    this.userGame.testStartPlayer2 = startTimePlayer2;
  }
  updatetestEndPlayer1(endTimePlayer1: Date | null) {
    this.userGame.testEndPlayer1 = endTimePlayer1;
  }
  updatetestEndPlayer2(endTimePlayer2: Date | null) {
    this.userGame.testEndPlayer2 = endTimePlayer2;
  }
  updatetotalQuestions(questions: number) {
    this.userGame.totalQuestions = questions;
  }
  updatetestType(testType: string | null) {
    this.userGame.testType = testType;
  }
  updatecorrectAnswersPlayer1(answersP1: number | null) {
    this.userGame.correctAnswersPlayer1 = answersP1;
  }
  updatecorrectAnswersPlayer2(answersP2: number | null) {
    this.userGame.correctAnswersPlayer2 = answersP2;
  }
  insertRecordInQuiz() {
    // this.http.setDataSerializer('utf8');
    // response = await this.httpClient.post(url, JSON.stringify(postBody), {'Content-Type': 'application/json'});
    return this.http.post(`${environment.apiUrl}/quiz/addQuiz`, this.userGame);
  }
  updateRecordInQuiz() {
    return this.http.put(`${environment.apiUrl}/quiz/${this.selectedQuizid}`, this.userGame);
  }
}

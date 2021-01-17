import { Component, OnInit} from '@angular/core';
import { QuestionsService } from '@app/services/questions.service';
import { Quiz, QuizCategory } from '@app/models/quiz.model';
import { User } from '@app/models';
import {AccountService} from '@app/services';
import { first } from 'rxjs/operators';
import { QuizService } from '@app/services/quiz.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-start-game',
  templateUrl: './start-game.component.html',
  styleUrls: ['./start-game.component.css']
})
export class StartGameComponent implements OnInit{
  private quiz: Quiz[];
  public selectUser: boolean;
  public users: any;
  user: User;
  public selectedUserId: number;
  quizCategories: QuizCategory[] = [];

  constructor(private questionsService: QuestionsService, private accountService: AccountService,
              private quizService: QuizService, private route: ActivatedRoute) {
    this.questionsService.getQuizzes()
      .subscribe(quiz => {
        this.quiz = quiz;
      });
    this.user = this.accountService.userValue;

    // this.accountService.users
    //   .pipe(first())
    //   .subscribe(users => this.users = users.filter(user => user.id !== this.user.id));
    this.users = this.accountService.usersValue.filter(user => user.id !== this.user.id);

    this.quizCategories = [
      {
        url: '/games',
        imgPath: 'assets/images/games.png',
        alt: 'picture of game',
        label: 'Computerspiele'
      },
      {
        url: '/body',
        imgPath: 'assets/images/body.png',
        alt: 'picture of body',
        label: 'Körper & Geist'
      },
      {
        url: '/sport',
        imgPath: 'assets/images/sport.png',
        alt: 'picture of sports',
        label: 'Sport & Freizeit'
      },
      {
        url: '/world',
        imgPath: 'assets/images/world.png',
        alt: 'picture of world',
        label: 'Rund um die Welt'
      }
    ]
  }
  ngOnInit() {
    this.selectUser = this.route.snapshot.paramMap.get('showUsers') == 'true';
    // throw new Error('Method not implemented.');
  }

  public userSelected() {
    this.selectUser = false;
    this.quizService.updatePlayer2(this.selectedUserId);
  }

  public userClicked(event: any, user: any) {
    this.selectedUserId = user.id;
  }

  public setQuizType(quizType: string) {
    this.quizService.updatetestType(quizType);
  }

  // public player1Started() {
  //   this.quizService.updatetestStartPlayer1(new Date())
  // }

}

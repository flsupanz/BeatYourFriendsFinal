import { Component, OnInit} from '@angular/core';
import { QuestionsService } from '../questions.service';
import { Quiz, QuizCategory } from '../quiz.model';
import { User } from '@app/_models';
import {AccountService} from '@app/_services';
import { first } from 'rxjs/operators';
import { QuizService } from '@app/_services/quiz.service';
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
        url: '/maths',
        imgPath: 'assets/images/maths.png',
        alt: 'picture of math elements',
        label: 'Maths'
      },
      {
        url: '/egypt',
        imgPath: 'assets/images/egyptians.png',
        alt: 'picture of egyptians',
        label: 'Egyptians'
      },
      {
        url: '/islands',
        imgPath: 'assets/images/island.png',
        alt: 'picture of islands',
        label: 'Islands'
      },
      {
        url: '/spices',
        imgPath: 'assets/images/spices.png',
        alt: 'picture of spices',
        label: 'Spices'
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

import {Component, Input} from '@angular/core';
import { Answers, Question} from '../quiz.model';
import {User} from '@app/_models';
import { Router } from '@angular/router';


@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent {
  user: User;
  // used to make answers available to parent component (= questions)
  // so that parent can pass it to child component (= results)
  @Input() answers: Answers;
  @Input() questions: Question[];

  /**
   *
   */
  constructor(private router: Router) {
  }

  public anotherQuiz() {
    this.router.navigate(['startGame', true]);
  }
}

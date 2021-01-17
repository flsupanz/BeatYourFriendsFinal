import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { JwtInterceptor, ErrorInterceptor } from './_helpers';
import { AppComponent } from './app.component';
// import { HomeComponent } from './home';
import { ResultsComponent } from './results/results.component';
import { QuestionsComponent } from './questions/questions.component';
import { QuestionFormComponent } from './question-form/question-form.component';
import { StartGameComponent } from './start-game/start-game.component';
import { MatCardModule} from '@angular/material/card';
import { AlertComponent } from './_components/alert.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { SelectUserComponent } from './select-user/select-user.component';
import { ChallengeComponent } from './challenge/challenge.component';
import { ScoreboardComponent } from './scoreboard/scoreboard.component';

@NgModule({
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    MatCardModule
  ],
  declarations: [
    AppComponent,
    AlertComponent,
    HomeComponent,
    ResultsComponent,
    QuestionsComponent,
    QuestionFormComponent,
    StartGameComponent,
    ProfileComponent,
    SelectUserComponent,
    ChallengeComponent,
    ScoreboardComponent
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

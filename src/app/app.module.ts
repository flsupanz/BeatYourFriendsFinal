import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { JwtInterceptor, ErrorInterceptor } from './helpers';
import { AppComponent } from './app.component';
// import { HomeComponent } from './home';
import { ResultsComponent } from './components/results/results.component';
import { QuestionsComponent } from './components/questions/questions.component';
import { QuestionFormComponent } from './components/question-form/question-form.component';
import { StartGameComponent } from './components/start-game/start-game.component';
import { MatCardModule} from '@angular/material/card';
import { AlertComponent } from './components/alert/alert.component';
import { HomeComponent } from './components/home/home.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ChallengeComponent } from './components/challenge/challenge.component';
import { ScoreboardComponent } from './components/scoreboard/scoreboard.component';
import {AboutComponent} from '@app/components/about/about.component';

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
    ChallengeComponent,
    ScoreboardComponent,
    AboutComponent
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

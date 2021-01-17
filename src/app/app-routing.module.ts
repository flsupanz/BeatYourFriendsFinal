import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// import { HomeComponent } from './home';
import { AuthGuard } from './helpers';
import {StartGameComponent} from '@app/components/start-game/start-game.component';
import {QuestionsComponent} from '@app/components/questions/questions.component';
import { HomeComponent } from './components/home/home.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ChallengeComponent } from './components/challenge/challenge.component';
import { ScoreboardComponent } from './components/scoreboard/scoreboard.component';
import {AboutComponent} from '@app/components/about/about.component';

const accountModule = () => import('./account/account.module').then(x => x.AccountModule);
const usersModule = () => import('./users/users.module').then(x => x.UsersModule);

const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'users', loadChildren: usersModule, canActivate: [AuthGuard] },
  { path: 'about', component: AboutComponent},
  { path: 'challenge', component: ChallengeComponent, canActivate: [AuthGuard] },
  { path: 'scoreboard', component: ScoreboardComponent, canActivate: [AuthGuard] },
  { path: 'account', loadChildren: accountModule },
  {path: 'startGame/:showUsers', component: StartGameComponent, canActivate: [AuthGuard]},
  {path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]},
  {path: ':quizId', component: QuestionsComponent, canActivate: [AuthGuard] },

  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

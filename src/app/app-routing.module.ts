import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HeroesErrorComponent } from './heroes-error/heroes-error.component';
import { HeroesComponent } from './heroes/heroes.component';
import { SeasonHeroesComponent } from './season-heroes/season-heroes.component';

const routes: Routes = [
  { path: 'seasonHeroes/:year/hero/:id', component: SeasonHeroesComponent },
  { path: 'heroes', component: HeroesComponent },
  { path: '', redirectTo: 'heroes', pathMatch: 'full' },
  { path: '**', component: HeroesErrorComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

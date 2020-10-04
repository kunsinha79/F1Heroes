import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Heroes, HeroDrivingDetails } from '../types/heroes';
import { HeroesService } from '../service/heroes.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss']
})
export class HeroesComponent implements OnInit {

  unsubscribeHeroes$ = new Subject();
  heroes: Array<HeroDrivingDetails>;
  isLoading: boolean;
  isError:boolean = false;

  constructor(private heroesService: HeroesService) { }

  ngOnInit(): void {
    this.isLoading = true; // boolean to show/hide spinner

    this.heroesService.getWorldChampions().pipe(
      takeUntil(this.unsubscribeHeroes$)
    ).subscribe(
      (resHeroes: Heroes) => {
        this.heroes = resHeroes?.StandingsLists || [];
        this.heroes.reverse(); // to display list in reverse chronological order
        this.isLoading = false;
      },
      () => {
        this.heroes = [];
        this.isLoading = false;
        this.isError = true; // boolean to show/hide error message
      });
  }

  ngOnDestroy(): void {
    this.unsubscribeHeroes$.next();
    this.unsubscribeHeroes$.complete();
  }

}

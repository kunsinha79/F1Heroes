import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { SeasonRaces } from '../types/season-heroes';
import { HeroesService } from '../service/heroes.service';

@Component({
  selector: 'app-season-heroes',
  templateUrl: './season-heroes.component.html',
  styleUrls: ['./season-heroes.component.scss']
})

export class SeasonHeroesComponent implements OnInit {

  unsubscribeSeasonHeroes$ = new Subject();
  races: Array<SeasonRaces>;
  isLoading: boolean;
  id: number;
  year: string;
  isError: boolean = false;

  constructor(
    private heroesService: HeroesService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.isLoading = true;

    // to fetch year and driver id from route params
    this.year = this.route.snapshot.paramMap.get('year');
    this.id = parseInt(this.route.snapshot.paramMap.get('id'));

    this.heroesService.getSeasonHeroes(this.year).pipe(
      takeUntil(this.unsubscribeSeasonHeroes$)
    ).subscribe(
      (resRaces) => {
        this.races = resRaces || [];
        this.isLoading = false;
      },
      () => {
        this.races = [];
        this.isLoading = false;
        this.isError = true;
      }
    );
  }

  /*
    Method to check whether season champion is also a world champion by matching driverNumber
  */
  isChampion(driverNumber: string): boolean {
    return (parseInt(driverNumber) === this.id);
  }

  ngOnDestroy(): void {
    this.unsubscribeSeasonHeroes$.next();
    this.unsubscribeSeasonHeroes$.complete();
  }
}

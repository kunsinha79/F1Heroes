import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Heroes, HeroStandings } from '../types/heroes';
import { SeasonRaces, SeasonHeroes } from '../types/season-heroes';
import { Urls } from '../constants/url.constants';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  constructor(private http: HttpClient) { }

  getWorldChampions(): Observable<Heroes> {
    return this.http.get(`${Urls.domainUrl}${Urls.heroesUrl}`).pipe(
      map((res: HeroStandings) => res?.MRData?.StandingsTable)
    );
  }

  getSeasonHeroes(seasonYear: string): Observable<Array<SeasonRaces>> {
    return this.http.get(`${Urls.domainUrl}${seasonYear}${Urls.seasonHeroesUrl}`).pipe(
      map((res: SeasonHeroes) => res?.MRData?.RaceTable?.Races)
    );
  }
}

import { HttpClientTestingModule } from '@angular/common/http/testing'
import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { HeroesService } from './heroes.service';
import { of } from 'rxjs';
import { heroesMock } from '../mocks/heroes.mock';
import { Heroes } from '../types/heroes';
import { seasonHeroesMock } from '../mocks/season-heroes.mock';
import { SeasonRaces } from '../types/season-heroes';

describe('HeroesService', () => {
  let service: HeroesService;
  let http: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [HeroesService, HttpClient],
    });
    service = TestBed.inject(HeroesService);
    http = TestBed.inject(HttpClient);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return world champion of the era requested', () => {
    spyOn(http, 'get').and.returnValue(of(heroesMock))
    service.getWorldChampions().subscribe((response: Heroes) => {
      expect(response).toEqual(heroesMock.MRData.StandingsTable);
      expect(http.get).toHaveBeenCalled()
    })
  });

  it('should return winner data of the year requested', () => {
    spyOn(http, 'get').and.returnValue(of(seasonHeroesMock))
    service.getSeasonHeroes('1234').subscribe((response: Array<SeasonRaces>) => {
      expect(response).toEqual(seasonHeroesMock.MRData?.RaceTable?.Races);
      expect(http.get).toHaveBeenCalled()
    })
  })
});

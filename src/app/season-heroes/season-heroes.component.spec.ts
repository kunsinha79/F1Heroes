import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { MatCardModule } from '@angular/material/card';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
import { seasonHeroesMock } from '../mocks/season-heroes.mock';
import { HeroesService } from '../service/heroes.service';
import { SeasonRaces } from '../types/season-heroes';

import { SeasonHeroesComponent } from './season-heroes.component';

describe('SeasonHeroesComponent', () => {
  let component: SeasonHeroesComponent;
  let fixture: ComponentFixture<SeasonHeroesComponent>;
  let heroesService: HeroesService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        MatCardModule,
        BrowserAnimationsModule,
      ],
      providers: [
        HeroesService,
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: () => 0,
              },
            },
          },
        }
      ],
      declarations: [ SeasonHeroesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeasonHeroesComponent);
    component = fixture.componentInstance;
    heroesService = TestBed.inject(HeroesService);
    spyOn(heroesService, 'getSeasonHeroes').and.callFake(
      (): Observable<Array<SeasonRaces>> => of(seasonHeroesMock.MRData?.RaceTable?.Races)
    );

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('onInit should call getSeasonHeroes', () => {
    component.ngOnInit();
    component.id = 44;
    component.year = '2005';
    expect(heroesService.getSeasonHeroes).toHaveBeenCalled();
  });

  it('should display cards based on response', fakeAsync(() => {
    fixture.detectChanges();
    const bannerElement: HTMLElement = fixture.nativeElement;
    const cards = bannerElement.querySelectorAll('mat-card');
    expect(cards.length).toBe(2);
  }));
});

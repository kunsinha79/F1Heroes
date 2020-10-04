import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { MatCardModule } from '@angular/material/card';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Observable, of } from 'rxjs';
import { heroesMock } from '../mocks/heroes.mock';
import { HeroesService } from '../service/heroes.service';
import { Heroes } from '../types/heroes';

import { HeroesComponent } from './heroes.component';

describe('HeroesComponent', () => {
  let component: HeroesComponent;
  let fixture: ComponentFixture<HeroesComponent>;
  let heroesService: HeroesService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        MatCardModule,
        BrowserAnimationsModule,
      ],
      providers: [HeroesService],
      declarations: [ HeroesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeroesComponent);
    component = fixture.componentInstance;

    heroesService = TestBed.inject(HeroesService);
    spyOn(heroesService, 'getWorldChampions').and.callFake(
      (): Observable<Heroes> => of(heroesMock.MRData.StandingsTable)
    );

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('onInit should call getWorldChampions', () => {
    component.ngOnInit();
    expect(heroesService.getWorldChampions).toHaveBeenCalled();
  });

  it('should display cards based on response', fakeAsync(() => {
    fixture.detectChanges();
    const bannerElement: HTMLElement = fixture.nativeElement;
    const cards = bannerElement.querySelectorAll('mat-card');
    expect(cards.length).toBe(3);
  }));

  it('should render the year with last first', async(() => {
    const bannerElement: HTMLElement = fixture.nativeElement;
    const cards = bannerElement.querySelectorAll('mat-card>mat-card-header>div.mat-card-header-text>mat-card-title');
    expect(cards[0].innerHTML).toContain('2007');
  }));

  it('should render the logo', async(() => {
    const bannerElement: HTMLElement = fixture.nativeElement;
    const cards = bannerElement.querySelectorAll('mat-card>mat-card-content>div.heroes-card-content--flag>img');
    expect(cards[0].getAttribute('src')).toContain('../assets/flags/British.png');
  }));

});

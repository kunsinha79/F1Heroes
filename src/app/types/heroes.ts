export interface HeroStandings {
  MRData: {
    StandingsTable: Heroes;
  }
}

export interface Heroes {
  StandingsLists: Array<HeroDrivingDetails>
}

export interface HeroDrivingDetails {
  season: string;
  DriverStandings: Array<HeroStanding>;
}

interface HeroStanding {
  points: string;
  wins: string;
  Driver: Driver;
  Constructors: Array<Constructor>;
}

export interface Driver {
  permanentNumber: string;
  givenName: string;
  familyName: string;
  dateOfBirth: string;
  nationality: string;
}

export interface Constructor {
  constructorId: string;
  name: string;
}

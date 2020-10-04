import {Driver, Constructor} from './heroes';

export interface SeasonHeroes {
  MRData: {
    RaceTable: {
      Races: Array<SeasonRaces>
    }
  }
}


export interface SeasonRaces {
  season: string;
  raceName: string;
  Circuit: RacingCircuits;
  QualifyingResults: Array<RaceQualifyingResults>;

}

interface RacingCircuits {
  circuitName: string;
  Location: {
    locality: string;
    country: string;
  }
}

interface RaceQualifyingResults {
  Driver: Driver;
  Constructor: Constructor;
  Q1: string;
  Q2: string;
  Q3: string;
}

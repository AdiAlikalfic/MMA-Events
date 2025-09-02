export interface IFigher {
  name: string;
  record: string;
  country: string;
  picture: string;
  link: string;
}

export interface IFight {
  main: boolean;
  weight: string;
  fighterA: IFigher;
  fighterB: IFigher;
}

export interface IFightData {
  title: string;
  date: string;
  link: string;
  fights: IFight[];
}
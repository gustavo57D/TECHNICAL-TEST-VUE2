// src/types/types.ts
export interface Country {
  code: string;
  name: string;
  emoji: string;
  continent: { name: string };
  imageUrl?: string;
  flag?: string;
}

export interface PixabayImage {
  hits: { webformatURL: string }[];
}

export interface FlagData {
  flag: string;
  flags: {
    png: string;
  };
}

export type JsonDataType = [...PixabayImage[], FlagData[]];
// ---- ExtraCountryDetail

export interface Language {
  name: string;
}

export interface State {
  name: string;
}

export interface CountryDetail {
  capital: string;
  currency: string;
  languages: Language[];
  states: State[];
}

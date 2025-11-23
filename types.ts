export interface VerbConjugation {
  io: string;
  tu: string;
  lui_lei: string;
  noi: string;
  voi: string;
  loro: string;
}

export interface VerbEntry {
  infinitive: string;
  definition: string;
  conjugation: VerbConjugation;
}

export interface SelectionState {
  text: string;
  rect: DOMRect | null;
  isVisible: boolean;
}

export enum SearchStatus {
  IDLE = 'IDLE',
  FOUND = 'FOUND',
  NOT_FOUND = 'NOT_FOUND',
}
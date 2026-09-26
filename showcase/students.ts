export type Trait = "brave" | "cunning" | "curious" | "loyal" | (string & {});

export interface Student {
  name: string;
  year: 1 | 2 | 3 | 4 | 5 | 6 | 7;
  traits: Trait[];
  wand?: { wood: string; core: string; inches: number };
}

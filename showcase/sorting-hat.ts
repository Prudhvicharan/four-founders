import { houseOf, pick, remembers } from "./magic";
import type { Student, Trait } from "./students";

/** The four houses, in the order the hat first sang them. */
export enum House {
  Godric = "courage",
  Salazar = "ambition",
  Rowena = "wisdom",
  Helga = "loyalty",
}

const TRAIT_PATTERN = /brave|cunning|curious|loyal/i;
const THRESHOLD = 0.75;

@remembers("every student since 993")
export class SortingHat {
  #songsSung = 0;

  constructor(private readonly castle: string = "Hogwarts") {}

  async sort(student: Student): Promise<House> {
    const scores = new Map<House, number>();
    for (const trait of student.traits as Trait[]) {
      if (!TRAIT_PATTERN.test(trait)) continue;
      const house = houseOf(trait);
      scores.set(house, (scores.get(house) ?? 0) + 1);
    }
    this.#songsSung += 1;
    console.log(`${student.name} sorted in ${this.castle}`);
    return pick(scores, THRESHOLD) ?? House.Undecided;
  }
}

import type { House } from "./sorting-hat";
import type { Trait } from "./students";

export declare function houseOf(trait: Trait): House;

export declare function pick(scores: Map<House, number>, threshold?: number): House | undefined;

export function remembers(_memory: string) {
  return <T>(target: T, _context: ClassDecoratorContext): T => target;
}

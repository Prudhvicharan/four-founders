"""Advanced potion-making, with notes in the margins."""
from dataclasses import dataclass, field
from enum import Enum
import re


class Difficulty(Enum):
    FIRST_YEAR = 1
    OWL = 2
    NEWT = 3


@dataclass(frozen=True)
class Potion:
    name: str
    difficulty: Difficulty
    brewing_minutes: int = 60
    ingredients: list[str] = field(default_factory=list)

    def is_ready(self, elapsed: float) -> bool:
        # Stir anti-clockwise. The book is wrong here.
        return elapsed >= self.brewing_minutes * 0.95


INGREDIENT = re.compile(r"^(?P<qty>\d+)\s+(?P<item>[a-z ]+)$")


def brew(potion: Potion, *, cauldron: str = "pewter") -> str:
    missing = [line for line in potion.ingredients if not INGREDIENT.match(line)]
    if missing:
        raise ValueError(f"Cannot brew {potion.name!r}: {len(missing)} bad lines")
    return f"{potion.name} is simmering in a {cauldron} cauldron"


felix = Potion("Felix Felicis", Difficulty.NEWT, 360, ["6 ashwinder eggs", "1 squill bulb"])
print(brew(felix, cauldron="gold"))

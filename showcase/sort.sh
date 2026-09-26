#!/usr/bin/env bash
# Prints a colourful sorting ceremony, used to show off terminal colours.
g=$'\e[32m' y=$'\e[33m' b=$'\e[34m' m=$'\e[35m' c=$'\e[36m' r=$'\e[31m' d=$'\e[2m' x=$'\e[0m'
echo "${d}The hat is thinking…${x}"
echo "${g}✓${x} Harry     ${d}→${x} ${r}Godric${x}"
echo "${g}✓${x} Draco     ${d}→${x} ${g}Salazar${x}"
echo "${g}✓${x} Luna      ${d}→${x} ${b}Rowena${x}"
echo "${g}✓${x} Cedric    ${d}→${x} ${y}Helga${x}"
echo "${y}!${x} Neville   ${d}→${x} ${r}Godric${x} ${d}(asked for${x} ${y}Helga${x}${d})${x}"
echo "${c}4 students sorted${x} ${d}in${x} ${m}0.42s${x}"

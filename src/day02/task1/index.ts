import { SolutionFn } from "../../utils/contract";

const RED_CUBES = 12;
const GREEN_CUBES = 13;
const BLUE_CUBES = 14;

const GAME_INDEX_REGEX = /Game (\d+):/;
const GAME_SET_REGEX = /(\d+) (red|green|blue)/g;

type Color = "red" | "green" | "blue";

const solution: SolutionFn = async (input: string[]) => {
  let possibleGameIndexesSum = 0;

  input.forEach((line) => {
    const gameIndex = parseInt(line.match(GAME_INDEX_REGEX).pop(), 10);
    const gameSets = line.split(";");

    const gameIsPossible = gameSets.every((set) => {
      const colorToQuantity: Record<Color, number> = { red: 0, green: 0, blue: 0 };
      const colorMatches = [...set.matchAll(GAME_SET_REGEX)];

      colorMatches.forEach((colorMatch) => {
        const [, quantity, color] = colorMatch;
        colorToQuantity[color as Color] = parseInt(quantity, 10);
      });

      return colorToQuantity.blue <= BLUE_CUBES && colorToQuantity.red <= RED_CUBES && colorToQuantity.green <= GREEN_CUBES;
    });

    if (gameIsPossible) {
      possibleGameIndexesSum += gameIndex;
    }
  });

  return possibleGameIndexesSum.toString();
};

export default solution;

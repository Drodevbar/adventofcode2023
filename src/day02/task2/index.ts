import { SolutionFn } from "../../utils/contract";

const GAME_SET_REGEX = /(\d+) (red|green|blue)/g;

type Color = "red" | "green" | "blue";

const solution: SolutionFn = async (input: string[]) => {
  let powerOfSetsOfCubes = 0;

  input.forEach((line) => {
    const minColorToQuantity: Record<Color, number> = { red: 0, green: 0, blue: 0 };
    const gameSets = line.split(";");

    gameSets.forEach((set) => {
      const colorMatches = [...set.matchAll(GAME_SET_REGEX)];

      colorMatches.forEach((colorMatch) => {
        const [, quantity, color] = colorMatch;
        minColorToQuantity[color] = Math.max(parseInt(quantity, 10), minColorToQuantity[color]);
      });
    });

    powerOfSetsOfCubes += minColorToQuantity.red * minColorToQuantity.blue * minColorToQuantity.green;
  });

  return powerOfSetsOfCubes.toString();
};

export default solution;

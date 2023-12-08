import { SolutionFn } from "../../utils/contract";

const LOOKUP_ENTRY_REGEX = /(\w+) = \((\w+), (\w+)\)/;

const STARTING_NODE = "AAA";
const DESTINATION_NODE = "ZZZ";

const solution: SolutionFn = async (input: string[]) => {
  const movesIndexes = Array.from(input[0]).map((move) => (move === "L" ? 0 : 1));
  const lookupTable: Map<string, [string, string]> = new Map();

  input.slice(2).forEach((line) => {
    const [, key, leftMove, rightMove] = [...line.match(LOOKUP_ENTRY_REGEX)];
    lookupTable.set(key, [leftMove, rightMove]);
  });

  let stepsCount = 0;
  let current = STARTING_NODE;

  while (current !== DESTINATION_NODE) {
    const moves = lookupTable.get(current);
    const currentMoveIndex = movesIndexes[stepsCount % movesIndexes.length];
    current = moves[currentMoveIndex];
    stepsCount++;
  }

  return stepsCount.toString();
};

export default solution;

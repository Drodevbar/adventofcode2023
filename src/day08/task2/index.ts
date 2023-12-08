import { SolutionFn } from "../../utils/contract";

const LOOKUP_ENTRY_REGEX = /(\w+) = \((\w+), (\w+)\)/;

const STARTING_NODE_ENDING = "A";
const DESTINATION_NODE_ENDING = "Z";

const findLcm = (x: number, y: number) => {
  let tmp = 0;
  let yy = y;
  let xx = x;

  while (yy !== 0) {
    tmp = yy;
    yy = xx % yy;
    xx = tmp;
  }

  return (x * y) / xx;
};

const solution: SolutionFn = async (input: string[]) => {
  const movesIndexes = Array.from(input[0]).map((move) => (move === "L" ? 0 : 1));
  const lookupTable: Map<string, [string, string]> = new Map();

  input.slice(2).forEach((line) => {
    const [, key, leftMove, rightMove] = [...line.match(LOOKUP_ENTRY_REGEX)];
    lookupTable.set(key, [leftMove, rightMove]);
  });

  const currentNodes = Array.from(lookupTable.keys()).filter((key) => key.endsWith(STARTING_NODE_ENDING));
  const nodesStepsCount: number[] = [];

  currentNodes.forEach((node) => {
    let current = node;
    let stepsCount = 0;

    while (!current.endsWith(DESTINATION_NODE_ENDING)) {
      const currentMoveIndex = movesIndexes[stepsCount % movesIndexes.length];
      const moves = lookupTable.get(current);
      current = moves[currentMoveIndex];
      stepsCount++;
    }

    nodesStepsCount.push(stepsCount);
  });

  return nodesStepsCount
    .slice(2)
    .reduce((x, y) => findLcm(x, y), findLcm(nodesStepsCount[0], nodesStepsCount[1]))
    .toString();
};

export default solution;

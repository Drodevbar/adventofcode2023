import { SolutionFn } from "../../utils/contract";

const isDigit = (value: string) => !Number.isNaN(Number(value));

const isSymbol = (value: string) => !isDigit(value) && value !== ".";

const getCoordsOfAdjacentNumbers = (x: number, y: number, matrix: string[][]): [number, number][] => {
  const coords: [number, number][] = [];

  const pushCoords = (i: number, j: number) => {
    if (!coords.find(([ii, jj]) => ii === i && jj === j - 1) && !coords.find(([ii, jj]) => ii === i && jj === j + 1)) {
      coords.push([i, j]);
    }
  };

  if (x > 0 && isDigit(matrix[x - 1][y])) pushCoords(x - 1, y);
  if (x > 0 && y > 0 && isDigit(matrix[x - 1][y - 1])) pushCoords(x - 1, y - 1);
  if (x > 0 && y < matrix[x].length - 1 && isDigit(matrix[x - 1][y + 1])) pushCoords(x - 1, y + 1);
  if (y > 0 && isDigit(matrix[x][y - 1])) pushCoords(x, y - 1);
  if (y < matrix[x].length - 1 && isDigit(matrix[x][y + 1])) pushCoords(x, y + 1);
  if (x < matrix.length - 1 && isDigit(matrix[x + 1][y])) pushCoords(x + 1, y);
  if (x < matrix.length - 1 && y > 0 && isDigit(matrix[x + 1][y - 1])) pushCoords(x + 1, y - 1);
  if (x < matrix.length - 1 && y < matrix[x].length - 1 && isDigit(matrix[x + 1][y + 1])) pushCoords(x + 1, y + 1);

  return coords;
};

const getNumberFromCoords = (coords: [number, number], matrix: string[][]): number => {
  const [x, y] = coords;
  let yStart = y;

  while (yStart > 0 && isDigit(matrix[x][yStart - 1])) {
    yStart--;
  }

  let partNumber = "";

  while (yStart < matrix[x].length && isDigit(matrix[x][yStart])) {
    partNumber += matrix[x][yStart];
    yStart++;
  }

  return parseInt(partNumber, 10);
};

const solution: SolutionFn = async (input: string[]) => {
  const matrix: string[][] = input.map((line) => Array.from(line));
  const adjacentNumbersCoordsPairs: [[number, number], [number, number]][] = [];

  for (let x = 0; x < matrix.length; x++) {
    for (let y = 0; y < matrix[x].length; y++) {
      const value = matrix[x][y];

      if (isSymbol(value)) {
        const coordsOfAdjacentNumbers = getCoordsOfAdjacentNumbers(x, y, matrix);

        if (coordsOfAdjacentNumbers.length === 2) {
          adjacentNumbersCoordsPairs.push([coordsOfAdjacentNumbers[0], coordsOfAdjacentNumbers[1]]);
        }
      }
    }
  }

  let sum = 0;

  adjacentNumbersCoordsPairs.forEach(([firstCoords, secondCoords]) => {
    sum += getNumberFromCoords(firstCoords, matrix) * getNumberFromCoords(secondCoords, matrix);
  });

  return sum.toString();
};

export default solution;

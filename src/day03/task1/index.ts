import { SolutionFn } from "../../utils/contract";

const isDigit = (value: string) => !Number.isNaN(Number(value));

const isSymbol = (value: string) => !isDigit(value) && value !== ".";

const isAdjacentToSymbol = (x: number, y: number, matrix: string[][]) =>
  (x > 0 && isSymbol(matrix[x - 1][y])) ||
  (x > 0 && y > 0 && isSymbol(matrix[x - 1][y - 1])) ||
  (x > 0 && y < matrix[x].length - 1 && isSymbol(matrix[x - 1][y + 1])) ||
  (y > 0 && isSymbol(matrix[x][y - 1])) ||
  (y < matrix[x].length - 1 && isSymbol(matrix[x][y + 1])) ||
  (x < matrix.length - 1 && isSymbol(matrix[x + 1][y])) ||
  (x < matrix.length - 1 && y > 0 && isSymbol(matrix[x + 1][y - 1])) ||
  (x < matrix.length - 1 && y < matrix[x].length - 1 && isSymbol(matrix[x + 1][y + 1]));

const solution: SolutionFn = async (input: string[]) => {
  const matrix: string[][] = input.map((line) => Array.from(line));
  let sum = 0;

  matrix.forEach((row, x) => {
    let partNumber = "";
    let isPartNumberAdjacentToSymbol = false;

    row.forEach((value, y) => {
      if (isDigit(value)) {
        partNumber += value;
        isPartNumberAdjacentToSymbol = isPartNumberAdjacentToSymbol || isAdjacentToSymbol(x, y, matrix);
      }

      if (!isDigit(value) && partNumber.length > 0) {
        sum += isPartNumberAdjacentToSymbol ? parseInt(partNumber, 10) : 0;
        partNumber = "";
        isPartNumberAdjacentToSymbol = false;
      }

      if (y === row.length - 1 && isDigit(value) && isPartNumberAdjacentToSymbol) {
        sum += parseInt(partNumber, 10);
      }
    });
  });

  return sum.toString();
};

export default solution;

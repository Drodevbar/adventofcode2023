import { SolutionFx } from "../../utils/contract";

const numbers = new Set(["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]);
const lettersToNumbers = new Map([
  ["one", "1"],
  ["two", "2"],
  ["three", "3"],
  ["four", "4"],
  ["five", "5"],
  ["six", "6"],
  ["seven", "7"],
  ["eight", "8"],
  ["nine", "9"],
]);
const minLetterSize = Array.from(lettersToNumbers.keys()).reduce((a, b) => (a.length <= b.length ? a : b)).length;
const maxLetterSize = Array.from(lettersToNumbers.keys()).reduce((a, b) => (a.length >= b.length ? a : b)).length;

const solution: SolutionFx = async (input: string[]) => {
  let sum = 0;

  input.forEach((line) => {
    let firstNumber: string | undefined;
    let lastNumber: string | undefined;

    for (let startIndex = 0; startIndex < line.length; startIndex++) {
      if (numbers.has(line.charAt(startIndex))) {
        firstNumber = firstNumber ?? line.charAt(startIndex);
        lastNumber = line.charAt(startIndex);
      } else {
        for (let stopIndex = startIndex + minLetterSize; stopIndex <= startIndex + maxLetterSize; stopIndex++) {
          if (lettersToNumbers.has(line.substring(startIndex, stopIndex))) {
            firstNumber = firstNumber ?? lettersToNumbers.get(line.substring(startIndex, stopIndex));
            lastNumber = lettersToNumbers.get(line.substring(startIndex, stopIndex));
            break;
          }
        }
      }
    }

    const value = parseInt(`${firstNumber}${lastNumber}`, 10);

    sum += value;
  });

  return sum.toString();
};

export default solution;

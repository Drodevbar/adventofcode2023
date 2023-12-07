import { SolutionFx } from "../../utils/contract";

const numbers = new Set(["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]);

const solution: SolutionFx = async (input: string[]) => {
  let sum = 0;

  input.forEach((line) => {
    const firstNumber = Array.from(line).find((letter) => numbers.has(letter));
    const lastNumber = Array.from(line)
      .reverse()
      .find((letter) => numbers.has(letter));

    const value = parseInt(`${firstNumber}${lastNumber}`, 10);

    sum += value;
  });

  return sum.toString();
};

export default solution;

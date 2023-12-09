import { SolutionFn } from "../../utils/contract";

const solution: SolutionFn = async (input: string[]) => {
  const historiesList: number[][] = input.map((line) => line.split(" ").map((entry) => parseInt(entry, 10)));
  let sum = 0;

  historiesList.forEach((history) => {
    const sequences: number[][] = [history];

    while (!sequences.at(-1).every((item) => item === 0)) {
      const newSequence: number[] = [];
      const lastSequence = sequences.at(-1);

      for (let i = 1; i < lastSequence.length; i++) {
        newSequence.push(lastSequence[i] - lastSequence[i - 1]);
      }

      sequences.push(newSequence);
    }

    const firstSequenceValues = sequences.reverse().map((sequence) => sequence.shift());
    sum += firstSequenceValues.reduce((a, b) => b - a);
  });

  return sum.toString();
};

export default solution;

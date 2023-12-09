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

    const lastSequencesValues = sequences.reverse().map((sequence) => sequence.pop());
    sum += lastSequencesValues.reduce((a, b) => a + b);
  });

  return sum.toString();
};

export default solution;

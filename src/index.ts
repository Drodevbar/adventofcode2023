import path from "node:path";
import { readInput } from "./utils/read-input";
import { SolutionFx } from "./utils/contract";

(async () => {
  const dayNumber = process.argv
    .find((key) => key.includes("day"))
    ?.split("=")
    ?.pop();
  const taskNumber = process.argv
    .find((key) => key.includes("task"))
    ?.split("=")
    ?.pop();

  if (!dayNumber || !taskNumber) {
    console.log("Error: missing 'day'/'task' parameters");
    process.exit(1);
  }

  const inputPath = path.resolve(process.cwd(), `src/day${dayNumber}/input.txt`);
  const input = await readInput(inputPath);

  const solutionFxPath = path.resolve(process.cwd(), `src/day${dayNumber}/task${taskNumber}/index.ts`);
  const { default: solutionFx } = (await import(solutionFxPath)) as { default: SolutionFx };

  console.log(`Solving task ${taskNumber} for day ${dayNumber}...`);

  const timerStart = Date.now();
  const answer = await solutionFx(input);
  const timerStop = Date.now();

  console.log(`Answer: ${answer}`);
  console.log(`Elapsed time: ${timerStop - timerStart}ms`);
  process.exit(0);
})();

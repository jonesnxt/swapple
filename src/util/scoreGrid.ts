import { WORDLES, WORDS } from "./words";


export function scoreGrid(grid: string[]): [number, [number, number][]] {
  let runningScore = 0;
  let runningMatchlist: [number, number][] = [];

  for(let i = 0; i < 5; i++) {
    if(checkWord(grid[i]) || checkWord(grid[i].split('').reverse().join(''))) {
      console.log(grid[i]);
      runningScore ++;
      runningMatchlist.push(...[0,1,2,3,4].map((y) => ([i, y] as [number, number])));
    }

    const vert = grid.map((word) => word[i]).join('');;
    if(checkWord(vert) || checkWord(vert.split('').reverse().join(''))) {
      console.log(i, grid);
      runningScore ++;
      runningMatchlist.push(...[0,1,2,3,4].map((x) => ([x, i] as [number, number])));
    }
  }

  const diag = grid.map((word, i) => word[i]).join('');
  const rdiag = grid.map((word, i) => word[4 - i]).join('');

  if(checkWord(diag) || checkWord(diag.split('').reverse().join(''))) {
    runningScore ++;
    runningMatchlist.push(...[0,1,2,3,4].map((k) => ([k, k] as [number, number])));
  }

  if(checkWord(rdiag) || checkWord(rdiag.split('').reverse().join(''))) {
    runningScore ++;
    runningMatchlist.push(...[0,1,2,3,4].map((k) => ([k, 4 - k] as [number, number])));
  }

  return [runningScore, runningMatchlist];
}


function checkWord(word: string) {
  return WORDLES.includes(word) || WORDS.includes(word);
}
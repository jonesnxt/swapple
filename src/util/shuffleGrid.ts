import { doesGridHaveWords } from "./doesGridHaveWords";
import { NUM_WORDLES } from "./words";

// deterministic based on day
// I'm a little too lazy to go through the number theory of this but it seems to work
let rng = 1;
function predictableSort() {
  rng = (17 * (rng + 2003)) % NUM_WORDLES;
  return 0.5 - (rng / NUM_WORDLES)
}

export function shuffleGrid(grid: string[]) {
  while(true) {
    const shuffle = grid.join('').split('').sort(predictableSort).join('').match(/.{1,5}/g);
    console.log(shuffle);
    if(shuffle != null && !doesGridHaveWords(shuffle)) return shuffle;
  }
}
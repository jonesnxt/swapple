import { seedRandom } from './seedRandom';
import { shuffleGrid } from './shuffleGrid';
import { WORDLES, NUM_WORDLES } from './words'

export function genBaseGrid() {
  const seed = seedRandom();
  const generator = 2003; // large generator so we don't overlap.

  const wordlist = [];

  for(let i = 0; i < 5; i++) {
    wordlist.push(WORDLES[(seed + (generator*i)) % NUM_WORDLES]);
  }

  return shuffleGrid(wordlist);
}
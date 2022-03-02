import { WORDLES, WORDS } from './words';

export function doesGridHaveWords(grid: string[]) {
  // front and back
  if(grid.some((word) => checkWord(word) || checkWord(word.split('').reverse().join('')))) {
    return true;
  }

  // up and down
  for(let i = 0; i < 5; i++) {
    const vert = grid.map((word) => word[i]).join('');
    if(checkWord(vert) || checkWord(vert.split('').reverse().join(''))) return true;
  }

  // diagonals
  const diag = grid.map((word, i) => word[i]).join('');
  const rdiag = grid.map((word, i) => word[4 - i]).join('');

  if(checkWord(diag)
    || checkWord(rdiag)
    || checkWord(diag.split('').reverse().join(''))
    || checkWord(rdiag.split('').reverse().join(''))
  ) return true;
  
  return false;
}

function checkWord(word: string) {
  return WORDLES.includes(word) || WORDS.includes(word);
}
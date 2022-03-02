import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import { genBaseGrid } from './util/genBaseGrid';
import './App.css';
import Grid from './components/Grid';
import { scoreGrid } from './util/scoreGrid';
import Statusbar from './components/Statusbar';
import InstructionsModal from './components/InstructionsModal';
import SuccessModal from './components/SuccessModal';
import { getCurrentDay } from './util/getCurrentDay';
import Header from './components/Header';
import Share from './components/Share';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
`;

const Content = styled.div`
  display: flex;
  width: 100%;
  max-width: 700px;
  flex-direction: column;
  justify-content: center;
`;

const DAY = getCurrentDay();

function App() {
  const [grid, setGrid] = useState<string[]>(() => {
    const saved = localStorage.getItem(`grid${DAY}`);
    if(saved) return JSON.parse(saved);
  
    return genBaseGrid();
  });

  const [matchlist, setMatchlist] = useState<[number, number][]>(() => {
    const saved = localStorage.getItem(`matchlist${DAY}`);
    if(saved) return JSON.parse(saved);

    return [];
  });
  const [attemptlist, setAttemptlist] = useState<number[]>(() => {
    const saved = localStorage.getItem(`attemptlist${DAY}`);
    if(saved) return JSON.parse(saved);

    return [];
  });
  const [score, setScore] = useState(attemptlist.length !== 0 ? attemptlist[attemptlist.length - 1] : 0);

  const [showInstructions, setShowInstructions] = useState(() => localStorage.getItem('seenInstructions') !== 'true');
  const [showSuccess, setShowSuccess] = useState(false);

  return (
    <div className="App">
      <Container>
        <Header
          onInstructions={() => setShowInstructions(true)}
          onScores={() => setShowSuccess(true)}
        />
        <Content>
          <Grid
            grid={grid}
            matchlist={matchlist}
            disabled={score === 3 || attemptlist.length === 8}
            onSwap={(x1, y1, x2, y2) => {
              setGrid((old) => {
                const ngrid = old.map((word) => word.split(''));
                const tmp = ngrid[x1][y1];
                ngrid[x1][y1] = ngrid[x2][y2];
                ngrid[x2][y2] = tmp;

                const newGrid = ngrid.map((word) => word.join(''));

                const results = scoreGrid(newGrid);
                setScore(results[0]);
                setMatchlist(results[1]);
                const newAttemptlist = attemptlist.concat([results[0]]);
                setAttemptlist(newAttemptlist);

                // save to localstorage
                localStorage.setItem(`grid${DAY}`, JSON.stringify(newGrid));
                localStorage.setItem(`attemptlist${DAY}`, JSON.stringify(newAttemptlist));
                localStorage.setItem(`matchlist${DAY}`, JSON.stringify(results[1]));

                // checkWinLose
                if(results[0] === 3) {
                  const historyString = localStorage.getItem('history');
                  const history: number[] = historyString == null ? [] : JSON.parse(historyString);
                  localStorage.setItem('history', JSON.stringify(history.concat([newAttemptlist.length])));
                
                  const streakString = localStorage.getItem('streak');
                  const streak = streakString == null ? 1 : parseInt(streakString, 10) + 1;

                  localStorage.setItem('streak', streak.toString());
                  setShowSuccess(true);
                } else if(newAttemptlist.length === 8) {
                  localStorage.setItem('streak', '0');
                  setShowSuccess(true);
                }

                return newGrid;
              })
            }}
          />
          <Statusbar attemptlist={attemptlist} />
          {score === 3 && <Share matchlist={matchlist} attemptlist={attemptlist} />}
        </Content>
      </Container>
      {showInstructions &&
        <InstructionsModal
          onClose={() => {
            setShowInstructions(false);
            localStorage.setItem('seenInstructions', 'true');
          }}
        />
      }
      {showSuccess && <SuccessModal today={attemptlist[attemptlist.length - 1] === 3 ? attemptlist.length : -1} onClose={() => setShowSuccess(false)} />}
    </div>
  );
}

export default App;

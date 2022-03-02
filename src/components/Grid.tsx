import React, { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`

`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const Letter = styled.div<{ selected: boolean, swapped: boolean, matched: boolean }>`
  font-size: 32px;
  width: 50px;
  height: 50px;
  display: flex;
  cursor: pointer;
  align-items: center;
  justify-content: center;
  user-select: none;
  border: 1px solid rgba(0,0,0,0.1);
  border-radius: 8px;
  margin: 8px;

  :hover {
    background-color: #F9FAFB;
    ${({ matched }) => matched && `
      background-color: #AAEDBB;
    `}
  }

  ${({ selected }) => selected && `
    border: 3px solid rgba(0,0,0,0.4);
    margin: 6px;
  `}

  ${({ swapped }) => swapped && `
    background-color: #F5F6F8;
  `}

  ${({ matched }) => matched && `
    background-color: #99DCAA;
  `}
`;

export default function Grid({ 
    grid,
    onSwap,
    matchlist,
    disabled,
  }: {
    grid: string[];
    onSwap: (x1: number, y1: number, x2: number, y2: number) => void;
    matchlist: [number, number][];
    disabled: boolean;
  }) {
  const [active, setActive] = useState<[number, number] | null>(null);
  const [swaplist, setSwaplist] = useState<[number, number][]>([]);
  return (
    <Container>
      {grid.map((word, i) => (
        <Row key={`${word}${i}`}>
          {word.split('').map((letter, j) => (
            <Letter
              key={`${letter}${i}${j}`}
              selected={active != null && active[0] === i && active[1] === j}
              swapped={swaplist.some((swap) => swap[0] === i && swap[1] === j)}
              matched={matchlist.some((match) => match[0] === i && match[1] === j)}
              onClick={() => {
                if(disabled) return;
                if(active == null) {
                  setActive([i, j]);
                  return;
                }

                if(active[0] === i && active[1] === j) {
                  setActive(null);
                  return;
                }

                onSwap(active[0], active[1], i, j);
                setSwaplist((tmp) => tmp.concat([[active[0], active[1]], [i, j]]));
                setActive(null);
              }}
            >
              {letter}
            </Letter>
          ))}
        </Row>
      ))}
    </Container>
  )
}
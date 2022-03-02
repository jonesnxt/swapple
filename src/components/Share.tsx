import React, { useState } from 'react';
import styled from 'styled-components';
import { getCurrentDay } from '../util/getCurrentDay';

const Container = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 24px;
`;

const Button = styled.button`
  border: 1px solid #2378F3;
  background-color: #FFF;
  color: #2378F3;
  border-radius: 8px;
  width: 100px;
  font-size: 24px;
  box-shadow: 1px 1px 6px 1px rgba(0,0,0,0.1);
  cursor: pointer;

  :hover {
    background-color: #F7F7F7;
  }
`;

export default function Share(
  { matchlist, attemptlist }:
  { matchlist: [number, number][], attemptlist: number[] }
) {
  const [shared, setShared] = useState(false);

  return (
    <Container>
      <Button onClick={() => {
        const check = '🟩';
        const blank = '⬜'
        const numbers = ['0️⃣', '1️⃣', '2️⃣', '3️⃣'];

        const grid = Array.from(Array(5)).map(
          (_, i) => Array.from(Array(5)).map(
            (_, j) => matchlist.some(
              (match) => match[0] === i && match[1] === j
            ) ? check : blank
          ).join('')
        ).join('\n');
        const attempts = Array.from(Array(8)).map((_, i) => attemptlist.length > i ? numbers[attemptlist[i]] : blank).join('');

        const text = `Swapple #${getCurrentDay()}\n${grid}\n\n${attempts}`;

        if(navigator.share != null) {
          navigator.share({ text });
        } else {
          navigator.clipboard.writeText(text);
        }
        setShared(true);
      }}>{shared ? 'Copied!' : 'Share'}</Button>
    </Container>
  )
}
import React from 'react';
import styled from 'styled-components';

const ATTEMPTS = 8;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const Attempt = styled.div<{ score: number, current: boolean }>`
  width: 30px;
  height: 30px;
  border-radius: 100%;
  font-size: 18px;
  display: flex;
  align-items: center;
  justify-content: center;

  border: 2px solid rgba(0,0,0,0.3);
  margin: 4px;

  ${({score}) => score === 0 ? `
    border: 2px solid #DE7879;
  ` : score === 1 ? `
    border: 5px solid #DEBC79;
    width: 24px;
    height: 24px;
  ` : score === 2 ? `
    border: 8px solid #DEDE79;
    width: 18px;
    height: 18px;
  ` : score === 3 ? `
    background-color: #79DE79;
    border: 2px solid #79DE79;
  ` : ''}

  ${({ current }) => current && `
    border: 3px solid rgba(0,0,0,0.5);
  `}
`;

export default function Statusbar({ attemptlist }: { attemptlist: number[] }) {

  return (
    <Container>
      {Array.from(Array(ATTEMPTS)).map((_, i) => (
        <Attempt
          key={`att${i}`}
          current={attemptlist.length === i}
          score={attemptlist.length >= i ? attemptlist[i] : -1}
        >
          {attemptlist.length >= i ? attemptlist[i] : ''}
        </Attempt>
      ))}
    </Container>
  );
}
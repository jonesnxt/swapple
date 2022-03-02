import React from 'react';
import styled from 'styled-components';
import Modal from './Modal';

const Exclaimation = styled.div`
  font-size: 24px;
  color: #27EE26;
  margin-bottom: 24px;
`;

const StatRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  margin-bottom: 24px;
`;

const Stat = styled.div`
`;

const StatTitle = styled.div`
  font-size: 15px;
`;

const StatNumber = styled.div`
  font-size: 42px;
  font-weight: 500;
  padding: 8px;
`;

export default function InstructionsModal({ onClose, today }: { onClose: () => void, today: number }) {
  const historyString = localStorage.getItem('history');
  const history: number[] = historyString == null ? [] : JSON.parse(historyString);
  const streak = localStorage.getItem('streak') ?? 0;
  return (
    <Modal onClose={onClose}>
      {today !== -1 && <Exclaimation>Congratulations!</Exclaimation>}
      <StatRow>
        <Stat>
          <StatNumber>{history.length}</StatNumber>
          <StatTitle>Wins</StatTitle>
        </Stat>
        <Stat>
          <StatNumber>{streak}</StatNumber>
          <StatTitle>Streak</StatTitle>
        </Stat>
      </StatRow>
      <StatRow>
        <Stat>
          <StatNumber>{today === -1 ? 'N/A' : today}</StatNumber>
          <StatTitle>Today</StatTitle>
        </Stat>
        <Stat>
          <StatNumber>{(history.reduce((acc, n) => acc + n, 0) / history.length).toFixed(2)}</StatNumber>
          <StatTitle>Average</StatTitle>
        </Stat>
        <Stat>
          <StatNumber>{Math.min(...history)}</StatNumber>
          <StatTitle>Best</StatTitle>
        </Stat>
      </StatRow>

    </Modal>
  )
}
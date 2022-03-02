import React from 'react';
import styled from 'styled-components';
import { getCurrentDay } from '../util/getCurrentDay';

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  border-bottom: 1px solid rgba(0,0,0,0.1);
  width: 100%;
`;

const Content = styled.div`
  max-width: 500px;
  width: 100%;
  margin: 24px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const Title = styled.div`
  font-size: 24px;
`;

const Subtitle = styled.span`
  font-size: 16px;
`;

const Icons = styled.div`
  display: flex;
  flex-direction: row;
`;

const Icon = styled.div`
  font-size: 24px;
  cursor: pointer;
  margin-left: 12px;
  padding-bottom: 2px;

  :hover {
    font-size: 26px;
    padding-bottom: 0;
  }
`;

export default function Header(
  { onInstructions, onScores }:
  { onInstructions: () => void, onScores: () => void }
) {
  return (
    <Container>
      <Content>
        <Title>Swapple <Subtitle>by <a href="https://github.com/jonesnxt/swapple">jones</a></Subtitle></Title>
        <Icons>
          <Icon onClick={() => onInstructions()}>❓</Icon>
          <Icon onClick={() => onScores()}>📊</Icon>
        </Icons>
      </Content>
    </Container>
  )
}
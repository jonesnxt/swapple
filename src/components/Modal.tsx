import React from 'react';
import styled from 'styled-components';
import { getCurrentDay } from '../util/getCurrentDay';

const Background = styled.div`
  background-color: rgba(0,0,0,0.2);
  position: absolute;
  top:0;
  left:0;
  right:0;
  bottom:0;
  display: flex;
  justify-content: center;
`;

const Container = styled.div`
  width: 100%;
  max-width: 500px;
  margin: 16px;
  background-color: #FFF;
  border: 1px solid rgba(0,0,0,0.1);
  border-radius: 4px;
  box-shadow: 0px 0px 10px 1px rgba(0,0,0,0.3);
  height: fit-content;
`;

const Header = styled.div`
  border-bottom: 1px solid rgba(0,0,0,0.1);
  padding: 24px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const Title = styled.div`
  font-size: 24px;
`;

const Close = styled.div`
  font-size: 24px;
  color: #DC7878;
  user-select: none;
  cursor: pointer;
`;

const Content = styled.div`
  padding: 24px;
`;


export default function Modal({ children, onClose }: { children: React.ReactNode, onClose: () => void }) {
  return (
    <Background onClick={() => onClose()}>
      <Container onClick={(e) => { e.stopPropagation(); }}>
        <Header>
          <Title>Swapple #{getCurrentDay()}</Title>
          <Close onClick={() => onClose()}>✖</Close>
        </Header>
        <Content>
          {children}
        </Content>
      </Container>
    </Background>
  );
}
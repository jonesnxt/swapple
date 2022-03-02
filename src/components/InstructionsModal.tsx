import React from 'react';
import styled from 'styled-components';
import Modal from './Modal';

import instructions1 from '../assets/instructions1.png';
import instructions2 from '../assets/instructions2.png';

const Step = styled.div`
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 16px;
`;

const Image = styled.img`
  width: 100%;
  max-width: 220px;
  object-fit: contain;
`;

const Separator = styled.div`
  border-bottom: 1px solid rgba(0,0,0,0.1);
  margin-top: 16px;
  margin-bottom: 16px;
`

export default function InstructionsModal({ onClose }: { onClose: () => void }) {
  return (
    <Modal onClose={onClose}>
      <Step>Click to swap 2 tiles</Step>
      <Image src={instructions1} />
      <Separator />
      <Step>Make 3 words</Step>
      <Image src={instructions2} />
    </Modal>
  )
}
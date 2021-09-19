import React, { HTMLAttributes } from 'react';
import styled from 'styled-components';

const StyledRoomsItem = styled.div<{ roomImage: string }>`
  background: ${props => props.roomImage};
  width: 300px;
  height: 300px;
`;

interface PropsRoomsItem extends HTMLAttributes<HTMLDivElement> {
  roomImage: string;
  roomName: string;
}

export const RoomsItem = (prop: PropsRoomsItem) => {
  const { roomImage, roomName, ...rest } = prop;
  return (
    <StyledRoomsItem roomImage={roomImage} {...rest}>
      <h4>{roomName}</h4>
    </StyledRoomsItem>
  );
};

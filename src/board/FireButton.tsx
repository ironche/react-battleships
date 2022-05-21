import styled from '@emotion/styled';

export const FireButton = styled.button<{
  isSpying?: boolean;
}>`
  border: none;
  border-radius: 2px;
  text-transform: uppercase;
  cursor: pointer;
  color: white;
  background-color: ${props => props.isSpying ? '#444' : '#2196f3'};
  box-shadow: 0 0 4px #999;
  outline: none;

  background-position: center;
  transition: background 0.8s;

  &:hover {
    background: #47a7f5 radial-gradient(circle, transparent 1%, #47a7f5 1%) center/15000%;
  }
  &:active {
    background-color: #6eb9f7;
    background-size: 100%;
    transition: background 0s;
  }
`;

import styled from '@emotion/styled';
import ExplosionImage from 'assets/explosion.png';

export const OnFire = styled.span`
  position: relative;
  overflow: hidden;
  background-color: #333;

  &::before {
    content: "";
    position: absolute;
    display: block;
    top: 0;
    left: 0;
    width: 40px;
    height: 40px;

    background-image: url("${ExplosionImage}");
    background-size: cover;

    animation: start-fire 0.5s linear 1, on-fire 1s linear 0.5s infinite;
  }
`;

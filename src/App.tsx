import { useState, useMemo } from 'react';
import Board from './board';
import Ship from './ship';
import { makeShips } from './ship/models';
import { useStorage } from 'common/storage';
import styled from '@emotion/styled';

export default function App() {
  const oceanSize = 10;
  const ships = useMemo(() => makeShips(oceanSize, [4, 4, 5]), [oceanSize]);
  const [spying, setSpying] = useStorage('is-radar-on', false);
  const [log, setLog] = useState<string>('');

  function handleReload(): void {
    window.location.reload()
  }

  function handleToggleSpy(): void {
    setSpying(!spying);
  }

  function handleMessage(msg: string): void {
    setLog(msg);
  }

  return (
    <>
      <Actions>
        <button onClick={handleReload}>New game</button>
        <button onClick={handleToggleSpy}>Radar: {spying ? 'ON' : 'OFF'}</button>
      </Actions>

      <Board
        size={oceanSize}
        isSpying={spying}
        onMessage={handleMessage}
      >
        {ships.map((val, i) => <Ship key={i} {...val}/>)}
      </Board>

      <LogReport>{log}</LogReport>
    </>
  );
}

export const Actions = styled.header`
  display: grid;
  grid-template-columns: repeat(2, auto);
  gap: 20px;
  padding: 20px;
`;

export const LogReport = styled.pre`
  padding: 20px;
  font-weight: bold;
  font-size: 18px;
  color: white;
`;

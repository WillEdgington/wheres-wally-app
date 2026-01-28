import { useState } from 'react';
import Gameboard from './components/Gameboard';

export default function App() {
  const [target, setTarget] = useState(null);

  return (
    <Gameboard 
      target={target}
      setTarget={setTarget}
    />
  );
}

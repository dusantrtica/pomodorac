import { Button } from '@headlessui/react';
import './App.css'
import { Counter } from './counter/Counter'
import { useSelector } from 'react-redux';
import { useTimer } from './hooks/useTimer';
import { useEffect, useState } from 'react';
import type { RootState } from './app/store';

function App() {
  const { startTimer, stopTimer } = useTimer();
  const [isRunning, setIsRunning] = useState(false);

  const remainingTime = useSelector((state: RootState) => state.session.remainingTime);

  const handleStart = () => {
    if (isRunning) {
      stopTimer();
      setIsRunning(false);
    } else {
      startTimer();
      setIsRunning(true);
    }
  }

  useEffect(() => {
    return () => {
      stopTimer();
    }
  }, []);

  return (
    <>
      <Counter value={remainingTime} />
      <Button onClick={handleStart}>{isRunning ? 'Stop' : 'Start'}</Button>
    </>
  )
}

export default App

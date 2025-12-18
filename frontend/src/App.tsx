import { useSelector, useDispatch } from 'react-redux';
import { useTimer } from './hooks/useTimer';
import { useState, useEffect } from 'react';
import type { RootState } from './app/store';
import { formatTime } from './components/counter/utils';
import { setCurrentSessionType, startSession, stopSession } from './features/pomodoro-session/sessionSlice';
import type { SessionType } from './features/pomodoro-session/constants';
import { tickAction } from './features/pomodoro-session/action-creators';
import { Button } from '@headlessui/react';
import TodoSection from './components/todos/TodoSection';

type TabType = 'pomodoro' | 'shortBreak' | 'longBreak';

const tabToSession: Record<TabType, SessionType> = {
  pomodoro: 'focus',
  shortBreak: 'short_break',
  longBreak: 'long_break',
};

export const WithTimer = ({ children }: { children: React.ReactNode }) => {
  const { startTimer, stopTimer } = useTimer(tickAction);

  useEffect(() => {
    startTimer();

    return () => {
      stopTimer();
    };
  }, [startTimer, stopTimer]);

  return children;
}

export const App = () => {
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState<TabType>('pomodoro');

  const remainingTime = useSelector((state: RootState) => state.session.remainingTime);
  const isRunning = useSelector((state: RootState) => state.session.isRunning);

  const handleStart = () => {
    if (isRunning) {
      dispatch(stopSession());
    } else {
      dispatch(startSession());
    }
  };

  const handleTabChange = (tab: TabType) => {
    setActiveTab(tab);
    dispatch(setCurrentSessionType(tabToSession[tab]));
  };

  const getBgColor = () => {
    switch (activeTab) {
      case 'shortBreak':
        return 'bg-short-break';
      case 'longBreak':
        return 'bg-long-break';
      default:
        return 'bg-pomodoro';
    }
  };

  const getButtonTextColor = () => {
    switch (activeTab) {
      case 'shortBreak':
        return 'text-short-break';
      case 'longBreak':
        return 'text-long-break';
      default:
        return 'text-pomodoro';
    }
  };

  return (
    <div className={`min-h-screen w-full ${getBgColor()} transition-colors duration-500 justify-items-center`}>      
      <main className="max-w-[480px] mx-auto px-3 pt-12">
        <div className="bg-white/10 rounded-lg p-8 text-center">
          <div className="flex justify-center gap-2 mb-8">
            <Button
              onClick={() => handleTabChange('pomodoro')}
              className={`px-4 py-1.5 rounded-md text-white font-medium transition-colors ${activeTab === 'pomodoro' ? 'bg-black/15' : 'hover:bg-white/10'
                }`}
            >
              Pomodoro
            </Button>
            <Button
              onClick={() => handleTabChange('shortBreak')}
              className={`px-4 py-1.5 rounded-md text-white font-medium transition-colors ${activeTab === 'shortBreak' ? 'bg-black/15' : 'hover:bg-white/10'
                }`}
            >
              Short Break
            </Button>
            <Button
              onClick={() => handleTabChange('longBreak')}
              className={`px-4 py-2 rounded-md text-white font-medium transition-colors ${activeTab === 'longBreak' ? 'bg-black/15' : 'hover:bg-white/10'
                }`}
            >
              Long Break
            </Button>
          </div>

          {/* Timer Display */}
          <div className="text-white text-[120px] font-bold leading-none mb-8">
            {formatTime(remainingTime)}
          </div>

          <Button
            onClick={handleStart}
            className={`px-8 py-4 bg-white rounded-lg text-xl font-bold uppercase tracking-wide shadow-[0_6px_0_rgb(0,0,0,0.1)] hover:shadow-[0_4px_0_rgb(0,0,0,0.1)] hover:translate-y-[2px] active:shadow-none active:translate-y-[6px] transition-all ${getButtonTextColor()}`}
          >
            {isRunning ? 'Stop' : 'Start'}
          </Button>
        </div>
      </main>
        <TodoSection />
    </div>
  );
}


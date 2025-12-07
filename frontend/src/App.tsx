import { useSelector, useDispatch } from 'react-redux';
import { useTimer } from './hooks/useTimer';
import { useState, useEffect } from 'react';
import type { RootState } from './app/store';
import { formatTime } from './components/counter/utils';
import { setCurrentSessionType, startSession, stopSession } from './features/pomodoro-session/sessionSlice';
import type { SessionType } from './features/pomodoro-session/constants';
import { tickAction } from './features/pomodoro-session/action-creators';

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
      {/* Header */}
      <header className="max-w-[620px] mx-auto px-3 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <svg
              className="w-5 h-5 text-white"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            <span className="text-white text-xl font-bold">Pomodorac</span>
          </div>

          {/* Navigation */}
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-1.5 px-3 py-2 bg-white/20 rounded-md text-white text-sm font-medium hover:bg-white/30 transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              Report
            </button>
            <button className="flex items-center gap-1.5 px-3 py-2 bg-white/20 rounded-md text-white text-sm font-medium hover:bg-white/30 transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Setting
            </button>
            <button className="flex items-center gap-1.5 px-3 py-2 bg-white/20 rounded-md text-white text-sm font-medium hover:bg-white/30 transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              Sign In
            </button>
            <button className="p-2 bg-white/20 rounded-md text-white hover:bg-white/30 transition-colors">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Divider */}
      <div className="max-w-[620px] mx-auto px-3">
        <div className="h-px bg-white/20"></div>
      </div>

      {/* Main Timer Section */}
      <main className="max-w-[480px] mx-auto px-3 pt-12">
        <div className="bg-white/10 rounded-lg p-8 text-center">
          {/* Tab Buttons */}
          <div className="flex justify-center gap-2 mb-8">
            <button
              onClick={() => handleTabChange('pomodoro')}
              className={`px-4 py-1.5 rounded-md text-white font-medium transition-colors ${activeTab === 'pomodoro' ? 'bg-black/15' : 'hover:bg-white/10'
                }`}
            >
              Pomodoro
            </button>
            <button
              onClick={() => handleTabChange('shortBreak')}
              className={`px-4 py-1.5 rounded-md text-white font-medium transition-colors ${activeTab === 'shortBreak' ? 'bg-black/15' : 'hover:bg-white/10'
                }`}
            >
              Short Break
            </button>
            <button
              onClick={() => handleTabChange('longBreak')}
              className={`px-4 py-1.5 rounded-md text-white font-medium transition-colors ${activeTab === 'longBreak' ? 'bg-black/15' : 'hover:bg-white/10'
                }`}
            >
              Long Break
            </button>
          </div>

          {/* Timer Display */}
          <div className="text-white text-[120px] font-bold leading-none mb-8">
            {formatTime(remainingTime)}
          </div>

          {/* Start/Stop Button */}
          <button
            onClick={handleStart}
            className={`px-16 py-4 bg-white rounded-lg text-xl font-bold uppercase tracking-wide shadow-[0_6px_0_rgb(0,0,0,0.1)] hover:shadow-[0_4px_0_rgb(0,0,0,0.1)] hover:translate-y-[2px] active:shadow-none active:translate-y-[6px] transition-all ${getButtonTextColor()}`}
          >
            {isRunning ? 'Stop' : 'Start'}
          </button>
        </div>
      </main>
    </div>
  );
}


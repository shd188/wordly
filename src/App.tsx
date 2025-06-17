import { useState } from 'react';
import Welcome from './components/Welcome';
import Game from './components/Game';
import Strategy from './components/Strategy';

type AppState = 'welcome' | 'game' | 'strategy';

function App() {
  const [appState, setAppState] = useState<AppState>('welcome');

  const handleStartGame = () => {
    setAppState('game');
  };

  const handleNavigateToStrategy = () => {
    setAppState('strategy');
  };

  const handleBackToHome = () => {
    setAppState('welcome');
  };

  return (
    <div className="min-h-screen">
      {appState === 'welcome' ? (
        <Welcome onStartGame={handleStartGame} onNavigateToStrategy={handleNavigateToStrategy} />
      ) : appState === 'game' ? (
        <Game onBackToHome={handleBackToHome} />
      ) : (
        <Strategy onBackToHome={handleBackToHome} />
      )}
    </div>
  );
}

export default App;
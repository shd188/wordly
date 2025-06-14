import { useState } from 'react';
import Welcome from './components/Welcome';
import Game from './components/Game';

type AppState = 'welcome' | 'game';

function App() {
  const [appState, setAppState] = useState<AppState>('welcome');

  const handleStartGame = () => {
    setAppState('game');
  };

  const handleBackToHome = () => {
    setAppState('welcome');
  };

  return (
    <div className="min-h-screen">
      {appState === 'welcome' ? (
        <Welcome onStartGame={handleStartGame} />
      ) : (
        <Game onBackToHome={handleBackToHome} />
      )}
    </div>
  );
}

export default App;

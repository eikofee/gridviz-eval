import React from 'react';
import './App.css';
import { EvalControllerComponent } from './components/EvalControllerComponent';
import { EvalController } from './types/EvalController';

function App() {
  let ec = new EvalController();
  return (
    <div className="App">
      <header className="App-header">
        <EvalControllerComponent evalController={ec} />
      </header>
    </div>
  );
}

export default App;

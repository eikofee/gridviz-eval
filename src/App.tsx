import React from 'react';
import './App.css';
import { EvalControllerComponent } from './components/EvalControllerComponent';
import { EvalController } from './types/EvalController';


function App() {
  let ec = new EvalController();
  return (
        <EvalControllerComponent evalController={ec} />
  );
}

export default App;

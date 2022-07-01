import React from 'react';
import './App.css';
import { EvalControllerComponent } from './components/EvalControllerComponent';
import { Locale, LocaleManager } from './LocaleManager';
import { EvalController } from './types/EvalController';


function App() {
  LocaleManager.currentLocale = Locale.English;
  let ec = new EvalController();
  return (
        <EvalControllerComponent evalController={ec} />
  );
}

export default App;

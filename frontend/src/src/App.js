import React from 'react';
import './App.css';
import Overview from "./views/Overview";

function App() {
  return (
    <div className="App">
      <Overview data={[{id: '1234', name: 'test'}, {id: '1234', name: 'test'}]} />
    </div>
  );
}

export default App;

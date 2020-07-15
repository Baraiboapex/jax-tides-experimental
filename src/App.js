import React from 'react';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import JTRouter from './components/Routes/routes.component';

import PageBackground from './components/PageComponents/page-background/page-background.component';

function App() {
  return (
    <div className="App">
        <PageBackground>
          <JTRouter/>
        </PageBackground>
    </div>
  );
}

export default App;

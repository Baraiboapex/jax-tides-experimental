import React from 'react';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import JTRouter from './components/Routes/routes.component';

import PageBackground from './components/PageComponents/page-background/page-background.component';

function App() {
  return (
    <div className="App">
      <PageBackground>
        {/*<JTRouter/>*/}
        <div className="container-fluid">
          <div className="d-flex justify-content-center">
              <div className="text-light"><h1>This app goes BLA!!!!!!</h1></div>
          </div>
        </div>
      </PageBackground>
    </div>
  );
}

export default App;

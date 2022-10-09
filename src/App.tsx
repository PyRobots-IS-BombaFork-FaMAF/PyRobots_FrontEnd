import React from 'react';
import './App.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
                <Routes>
                    <Route path="/" element={<SignUp/>}/>
                    <Route path="/Login"/>
                </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

import {BrowserRouter as Router , Route , Routes} from 'react-router-dom';

import './App.css';
import Upload from './upload';
import Login from './Login';
import Register from './Register';
import Verification from './Verification';
import View from './View';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<Upload/>}/>
          <Route path='/Login' element={<Login/>}/>
          <Route path='/Register' element={<Register/>}/>
          <Route path='/Verification' element={<Verification/>}/>
          <Route path='/View' element={<View/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
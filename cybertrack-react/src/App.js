import { Outlet } from 'react-router-dom';
import Heading from './components/heading';
import Footing from './components/footing';
import './App.css';

function App() {

  return (
    <div className="App">
      <Heading />
      <Outlet />
      <Footing />
    </div>
  );
}

export default App;

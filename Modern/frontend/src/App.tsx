import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import History from './pages/History';
import News from './pages/News';
import Products from './pages/Products';
import Tests from './pages/Tests';
import CreateTest from './pages/CreateTest';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/history" element={<History />} />
          <Route path="/news" element={<News />} />
          <Route path="/products" element={<Products />} />
          <Route path="/tests" element={<Tests />} />
          <Route path="/tests/create" element={<CreateTest />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;


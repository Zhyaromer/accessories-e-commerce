import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';

import Main from './pages/Main';
import AllProducts from './pages/AllProducts';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/products" element={<AllProducts />} />
      </Routes>
    </Router>
  );

}
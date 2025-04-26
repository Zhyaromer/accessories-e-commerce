import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Main from './pages/Main';
import AllProducts from './pages/AllProducts';
import ProductDetailPage from './pages/ProductDetails';
import AdminDashboard from './pages/Admin';
import Deliveries from './pages/Deliveries';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/products" element={<AllProducts />} />
        <Route path="/product/:id" element={<ProductDetailPage />} />
        <Route path="/deliveries" element={<Deliveries />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </Router>
  );
}
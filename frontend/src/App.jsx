import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Main from './pages/Main';
import AllProducts from './pages/AllProducts';
import ProductDetailPage from './pages/ProductDetails';
import AdminDashboard from './pages/Admin';
import Deliveries from './pages/Deliveries';
import AdminLogin from './pages/AdminManager';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/products" element={<AllProducts />} />
        <Route path="/product/:id" element={<ProductDetailPage />} />
        <Route path="/delivery" element={<Deliveries />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </Router>
  );
}
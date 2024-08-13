import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import CartPage from './pages/CartPage';
import Registration from './pages/Registration';
import AddProduct from './pages/AddProduct';
import ProductPage from './pages/ProductPage'; 
import ProductDetail from './pages/ProductDetail';
import VendorHome from './pages/VendorHome';
import ViewProducts from './pages/ViewProducts';
import UpdateProduct from './pages/UpdateProduct';
import AdminHome from './pages/adminHome';
import ManageUsers from './pages/ManageUsers';
import AdminManageProduct from './pages/AdminManageProduct';
import PurchaseProduct from './pages/PurchaseProduct';
import Confirmation from "./pages/Confirmation";
import MyOrders from './pages/MyOrders';
import ViewOrder from './pages/ViewOrder'; 
import SalesReportChart from './pages/ReportPage'; 
import MyWishlist from './pages/MyWishlist'; 
import CartPurchase from './pages/CartPurchase'; 
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/addproduct" element={<AddProduct />} />
        <Route path="/products" element={<ProductPage />} />
        <Route path="/productsdetail/:id" element={<ProductDetail />} />
        <Route path="/VendorHome" element={<VendorHome />} />
        <Route path="/ViewProducts" element={<ViewProducts />} />
        <Route path="/UpdateProduct/:id" element={<UpdateProduct />} />
        <Route path="/CartPage" element={<CartPage />} />
        <Route path="/adminHome" element={<AdminHome />} />
        <Route path="/manage-users" element={<ManageUsers />} />
        <Route path="/AdminManageProduct" element={<AdminManageProduct />} />
        <Route path="/purchase/:id" element={<PurchaseProduct />} />
        <Route path="/CartPurchase/:id" element={<CartPurchase />} />
        <Route path="/confirmation" element={<Confirmation />} />
        <Route path="/view-orders" element={<ViewOrder />} />
        <Route path="/MyOrders" element={<MyOrders />} />
        <Route path="/reports" element={<SalesReportChart />} />
        <Route path="/MyWishlist" element={<MyWishlist />} />
      </Routes>
    </Router>
  );
};

export default App;

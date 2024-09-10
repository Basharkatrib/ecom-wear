import './App.css';
import Footer from './Components/Footer/Footer';
import Navbar from './Components/Navbar/Navbar';
import { Routes, Route } from 'react-router-dom';
import Hoome from './Pages/Home/Home';
import Product from './Pages/Product/Product';
import AllProducts from './Pages/All_prod/Allprod';
import Register from './Components/Register/Register';
import Login from './Components/Login/Login';
import { AuthProvider } from './Store/AuthContext';
import ProtectedRoute from './Components/Protect/ProtectedRoute'; 
import ProfilePage from './Pages/Profile_page/ProfilePage';
import StoryPage from './Pages/StoryPage/StoryPage';

function App() {
    return (
        <AuthProvider>
            <Navbar />
            <Routes>
                <Route path="/" element={<Hoome />} />
                <Route path="/story" element={<StoryPage />} />
                <Route path="/products/:categoryTitle" element={<AllProducts />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route
                    path="/product/:productId"
                    element={
                        <ProtectedRoute>
                            <Product />
                        </ProtectedRoute>
                    }
                />
                 <Route
                    path="/profile"
                    element={
                        <ProtectedRoute>
                            <ProfilePage />
                        </ProtectedRoute>
                    }
                />
            </Routes>
            <Footer />
        </AuthProvider>
    );
}

export default App;
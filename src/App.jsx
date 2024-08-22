import { Routes, Route, Navigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
//Componentes importados
import NavbarApp from './components/Navbar';
import Footer from './components/Footer';
// Vistas importadas
import Home from './pages/Home';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import Cart from './pages/Cart';
import Pizza from './pages/Pizza';
import Profile from './pages/Profile';
import NotFound from './pages/NotFound';
// Contextos importados
import { useContext } from 'react';
import { UserContext } from './context/UserContext';

function App() {
  const { token } = useContext(UserContext);

  return (
    <div className='appGrid'>
      <header>
        <NavbarApp />
      </header>
      <main>
        <Routes>
          <Route
            path="/"
            element={<Home />}
          />
          <Route
            path="/register"
            element={token ? <Navigate to="/" /> : <RegisterPage />}
          />
          <Route
            path="/login"
            element={token ? <Navigate to="/" /> : <LoginPage />}
          />
          <Route
            path='cartShooping'
            element={<Cart />}
          />
          <Route
            path="/pizza/:id"
            element={<Pizza />}
          />
          <Route
            path="/profile"
            element={token ? <Profile /> : <Navigate to="/login" />}
          />
          <Route
            path="*"
            element={<NotFound />}
          />
        </Routes>
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  )
}

export default App
import { Routes, Route } from 'react-router-dom';
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

function App() {
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
            element={<RegisterPage />}
          />
          <Route
            path="/login"
            element={<LoginPage />}
          />
          <Route
            path='cartShooping'
            element={<Cart />}
          />
          <Route
            path="/pizza/:id"
            element={<Pizza />} />
          <Route
            path="/profile"
            element={<Profile />} />
          <Route
            path="*"
            element={<NotFound />} />
        </Routes>
      </main>

      <footer>
        <Footer />
      </footer>
    </div>
  )
}

export default App

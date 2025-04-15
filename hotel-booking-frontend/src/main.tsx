
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store/store';

import Login from './components/Login';
import Home from './components/Home';
import Register from './components/Register';
import PrivateRoute from './components/PrivateRoute';
import Navbar from './components/Sidebar';
import Hospedagem from './components/Hospedagem';
import Voos from './components/Voos';
import Cars from './components/Cars';
import Packages from './components/Packages';
import Reservas from './components/Reservas';
import Payment from './components/Payment';

// Componente que controla a exibição da Navbar
function AppWithNavbar() {
    const location = useLocation();
    const hideNavbar = ['/login', '/register'].includes(location.pathname.toLowerCase());

    return (
        <>
            {!hideNavbar && <Navbar />}
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/home" element={<PrivateRoute><Home /></PrivateRoute>} />
                <Route path="/hospedagem" element={<PrivateRoute><Hospedagem /></PrivateRoute>} />
                <Route path="/voos" element={<PrivateRoute><Voos /></PrivateRoute>} />
                <Route path="/carros" element={<PrivateRoute><Cars /></PrivateRoute>} />
                <Route path="/pacotes" element={<PrivateRoute><Packages /></PrivateRoute>} />
                <Route path="/reservas" element={<PrivateRoute><Reservas /></PrivateRoute>} />
                <Route path="/pagamento" element={<PrivateRoute><Payment /></PrivateRoute>} />
            </Routes>
        </>
    );
}

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
    <Provider store={store}>
        <Router>
            <AppWithNavbar />
        </Router>
    </Provider>
);

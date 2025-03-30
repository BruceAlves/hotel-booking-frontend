// src/index.tsx (ou o arquivo onde você configura as rotas)
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
    <Provider store={store}>
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/home" element={<PrivateRoute><Navbar /><Home /></PrivateRoute>} />
                <Route path="/hospedagem" element={<PrivateRoute><Navbar /><Hospedagem /></PrivateRoute>} />
                <Route path="/voos" element={<PrivateRoute><Navbar /><Voos /></PrivateRoute>} />
                <Route path="/carros" element={<PrivateRoute><Navbar /><Cars /></PrivateRoute>} />
                <Route path="/pacotes" element={<PrivateRoute><Navbar /><Packages /></PrivateRoute>} />
                <Route path="/reservas" element={<PrivateRoute><Reservas /></PrivateRoute>} />
                <Route path="/pagamento" element={<PrivateRoute><Payment /></PrivateRoute>} /> {/* Corrigindo a rota */}
                <Route path="/register" element={<Register />} />
            </Routes>
        </Router>
    </Provider>
);

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
            <Navbar /> {/* Move o Navbar para fora das rotas privadas */}

            <Routes>
                {/* Rota inicial exibe o Login ou Home baseado no token */}
                <Route path="/" element={<Home />} />

                {/* Rota para Login */}
                <Route path="/login" element={<Login />} />

                {/* Rota de Registro */}
                <Route path="/register" element={<Register />} />

                {/* As rotas privadas só são acessíveis se o usuário estiver logado */}
                <Route path="/home" element={<PrivateRoute><Home /></PrivateRoute>} />
                <Route path="/hospedagem" element={<PrivateRoute><Hospedagem /></PrivateRoute>} />
                <Route path="/voos" element={<PrivateRoute><Voos /></PrivateRoute>} />
                <Route path="/carros" element={<PrivateRoute><Cars /></PrivateRoute>} />
                <Route path="/pacotes" element={<PrivateRoute><Packages /></PrivateRoute>} />
                <Route path="/reservas" element={<PrivateRoute><Reservas /></PrivateRoute>} />
                <Route path="/pagamento" element={<PrivateRoute><Payment /></PrivateRoute>} />
            </Routes>
        </Router>
    </Provider>
);

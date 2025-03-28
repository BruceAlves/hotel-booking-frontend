// src/index.tsx
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux'; // Importando o Provider
import store from './store/store'; // Importando o store
import Login from './components/Login';
import Home from './components/Home';
import Register from './components/Register';
import PrivateRoute from './components/PrivateRoute';
import Navbar from './components/Sidebar';
import Hospedagem from './components/Hospedagem'; // Importando o componente de hospedagem

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
    <Provider store={store}> {/* Envolvendo a aplicação com o Provider */}
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route 
                    path="/home" 
                    element={
                        <PrivateRoute>
                            <Navbar />
                            <Home />
                        </PrivateRoute>
                    } 
                />
                <Route path="/hospedagem" element={
                    <PrivateRoute>
                        <Navbar />
                        <Hospedagem />
                    </PrivateRoute>
                } />
                <Route path="/register" element={<Register />} />
            </Routes>
        </Router>
    </Provider>
);

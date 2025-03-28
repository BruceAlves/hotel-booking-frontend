import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginUser } from '../services/api';
import { setUser } from '../actions/userActions';
import '../assets/Login.css';

const Login: React.FC = () => {
    const [email, setEmail] = useState<string>(''); 
    const [password, setPassword] = useState<string>(''); 
    const [error, setError] = useState<string>(''); 
    const navigate = useNavigate(); 
    const dispatch = useDispatch(); 

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {

            const data = await loginUser('', email, password); 
            console.log('Tela de login:', data); 

            if (data && data.token) {
                localStorage.setItem('token', data.token); 
                dispatch(setUser({ 
                    username: data.username, 
                    email: data.email, 
                    token: data.token 
                }));

                setEmail(''); 
                setPassword(''); 
                navigate('/home', { replace: true }); 
            } else {
                setError(data.message || 'Erro ao fazer login');
            }
        } catch (error) {
            setError('Erro na requisição'); 
            console.error('Erro ao fazer login:', error);
        }
    };

    return (
        <div className="login-container">
            <form className="form-container" onSubmit={handleLogin}>
                <h2>Login</h2>
                <div>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Digite seu e-mail"
                        required
                    />
                </div>
                <div>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Digite sua senha"
                        required
                    />
                </div>
                {error && <p className="error">{error}</p>}
                <button type="submit">Login</button>
                <button type="button" onClick={() => navigate('/register')}>Cadastrar</button>
            </form>
        </div>
    );
};

export default Login;

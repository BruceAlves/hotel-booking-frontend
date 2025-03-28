
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../services/api'; 
import '../assets/Register.css'; 

const Register: React.FC = () => {
    const [name, setName] = useState<string>(''); 
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [message, setMessage] = useState<string>('');
    const navigate = useNavigate(); 

    const handleRegister = async () => {
        try {
            const data = await registerUser(name, email, password);

            if (data) {
                setMessage('Usuário registrado com sucesso! Redirecionando...');
                setTimeout(() => {
                    navigate('/'); 
                }, 2000);
            } else {
                setMessage(data.message || 'Erro ao registrar usuário');
            }
        } catch (error) {
            setMessage('Erro na requisição');
        }
    };

    return (
        <div className="register-container">
            <div className="form-container">
                <h2>Cadastro</h2>
                <input 
                    type="text" 
                    placeholder="Nome" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
                    required
                />
                <input 
                    type="email" 
                    placeholder="E-mail" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    required
                />
                <input 
                    type="password" 
                    placeholder="Senha" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    required
                />
                <button onClick={handleRegister}>Registrar</button>
                {message && <p className="message">{message}</p>}
            </div>
        </div>
    );
};

export default Register;

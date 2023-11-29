import React, { useState } from 'react';
import AuthService from '../auth/AuthService';
import './Login.css';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = await AuthService.login(username, password);
      console.log('Giriş başarılı, Token:', token);
      localStorage.setItem('token', token);
      // Burada token'ı saklayabilir ve/veya yönlendirme yapabilirsiniz
    } catch (error) {
      console.error('Giriş hatası', error);
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <input
          type="text"
          placeholder="Kullanıcı Adı"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Şifre"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Giriş Yap</button>
      </form>
    </div>
  );
}

export default Login;

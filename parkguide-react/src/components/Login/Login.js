import React, { useState } from 'react';
import AuthService from '../../auth/AuthService';
import './Login.css';
import logo from '../../assets/logo.png';
import ErrorModal from '../ErrorModal/ErrorModal';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [showModal, setShowModal] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(''); // Her giriş denemesinde hata mesajını sıfırla
    setShowModal(false);
    try {
      const token = await AuthService.login(username, password);
      console.log('Giriş başarılı, Token:', token);
      localStorage.setItem('token', token); // Token'ı localStorage'a kaydet
    } catch (error) {
      console.error('Giriş hatası', error);
      setErrorMessage(error.message); 
      setShowModal(true);
    }
  };

  return (
    <div className="login-container">
    <img src={logo} alt="Logo" className="login-logo" />
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
      {showModal && <ErrorModal message={errorMessage} onClose={() => setShowModal(false)} />}
    </div>
  );
}

export default Login;

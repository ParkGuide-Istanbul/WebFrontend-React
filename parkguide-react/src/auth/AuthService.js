const AuthService = {
    login: async (username, password) => {
      const response = await fetch('YOUR_BACKEND_LOGIN_ENDPOINT', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
  
      if (!response.ok) {
        throw new Error('Login başarısız');
      }
  
      const data = await response.json();
      return data.token; // JWT token'ı döndür
    },
  
    // Buraya token ile ilgili diğer fonksiyonlar eklenebilir (örn. token'ı kaydetme)
  };
  
  export default AuthService;
  
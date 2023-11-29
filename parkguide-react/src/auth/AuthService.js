const AuthService = {
    login: async (username, password) => {
      const response = await fetch('https://o11xc731wl.execute-api.eu-central-1.amazonaws.com/dev2/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password, requiredRoles: ["Admin", "ParkingSystemAdmin"]}),
      });
      debugger;
  
      if (!response.ok) {
        throw new Error('Login başarısız');
      }
  
      const data = await response.json();
      return data.message.token; // JWT token'ı döndür
    },
  
    // Buraya token ile ilgili diğer fonksiyonlar eklenebilir (örn. token'ı kaydetme)
  };
  
  export default AuthService;
  
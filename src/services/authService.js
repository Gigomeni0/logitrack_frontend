// Serviço de autenticação (mock).
// Objetivo desta versão: permitir fluxo de login sem backend ainda integrado.
// Próxima etapa: substituir por chamadas reais (ex: POST /auth/login) retornando JWT + refresh token.
const mockUsers = [
  { username: 'admin', password: 'admin123', name: 'Administrador' },
  { username: 'user', password: 'user123', name: 'Usuário Padrão' },
];

export const login = (username, password) => {
  return new Promise((resolve, reject) => {
    // Simula latência de rede para aproximar da experiência real.
    setTimeout(() => {
      const user = mockUsers.find(
        user => user.username === username && user.password === password
      );
      
      if (user) {
        // Simula token pseudo-aleatório. Futuro: validar expiração, payload e roles.
        const token = 'mock-jwt-token-' + Math.random().toString(36).substring(2);
        resolve({
          user: { username: user.username, name: user.name },
          token
        });
      } else {
        reject({ message: 'Credenciais inválidas' });
      }
    }, 800);
  });
};

export const logout = () => {
  // Mock simples de logout. Backend real poderia invalidar refresh token / revogar sessão.
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(true);
    }, 300);
  });
};

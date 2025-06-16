import { jwtDecode } from 'jwt-decode';
import { create } from 'zustand';

interface DecodedToken {
  role: 'shop' | 'admin' | 'factory';
  user_id: number;
  username: string;
  exp: number;
}

interface AuthStore {
  accessToken: string | null;
  user: DecodedToken | null;
  isAuthenticated: boolean;
  login: (accessToken: string, refreshToken: string) => DecodedToken;
  logout: () => void;
}

export const useAuthStore = create<AuthStore>((set) => {
  const initialToken = localStorage.getItem('accessToken');
  let initialUser: DecodedToken | null = null;

  if (initialToken) {
    try {
      const decoded = jwtDecode<DecodedToken>(initialToken);
      if (decoded.exp * 1000 > Date.now()) {
        initialUser = decoded;
      } else {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
      }
    } catch (error) {
      console.error('Failed to decode token on initial load', error);
    }
  }

  return {
    accessToken: initialToken,
    user: initialUser,
    isAuthenticated: !!initialUser,

    login: (accessToken, refreshToken) => {
      const decodedUser = jwtDecode<DecodedToken>(accessToken);

      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);

      set({
        accessToken,
        user: decodedUser,
        isAuthenticated: true,
      });

      return decodedUser;
    },

    logout: () => {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');

      set({
        accessToken: null,
        user: null,
        isAuthenticated: false,
      });
      window.location.href = '/login';
    },
  };
});

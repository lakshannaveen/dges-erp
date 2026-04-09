import { loginStart, loginSuccess, loginFailure, logout } from '../slices/authSlice';

// Mock credentials
const MOCK_USERS = [
  { id: 1, username: 'admin', password: 'admin123', name: 'System Administrator', role: 'Admin', department: 'ICT', email: 'admin@dge.lk', avatar: 'AD' },
  { id: 2, username: 'finance', password: 'finance123', name: 'Finance Manager', role: 'Finance', department: 'Finance', email: 'finance@dge.lk', avatar: 'FM' },
  { id: 3, username: 'hr', password: 'hr123', name: 'HR Manager', role: 'HR', department: 'Human Resources', email: 'hr@dge.lk', avatar: 'HR' },
];

export const loginAction = (credentials) => (dispatch) => {
  dispatch(loginStart());
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const user = MOCK_USERS.find(
        u => u.username === credentials.username && u.password === credentials.password
      );
      if (user) {
        const { password, ...safeUser } = user;
        const token = `mock-token-${Date.now()}`;
        localStorage.setItem('dge_token', token);
        localStorage.setItem('dge_user', JSON.stringify(safeUser));
        dispatch(loginSuccess({ user: safeUser, token }));
        resolve(safeUser);
      } else {
        dispatch(loginFailure('Invalid username or password'));
        reject(new Error('Invalid credentials'));
      }
    }, 800);
  });
};

export const logoutAction = () => (dispatch) => {
  localStorage.removeItem('dge_token');
  localStorage.removeItem('dge_user');
  dispatch(logout());
};

export const restoreSession = () => (dispatch) => {
  const token = localStorage.getItem('dge_token');
  const user = localStorage.getItem('dge_user');
  if (token && user) {
    dispatch(loginSuccess({ user: JSON.parse(user), token }));
  }
};

import React, { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider, useDispatch } from 'react-redux';
import store from './store';
import AppRoutes from './routes/AppRoutes';
import { restoreSession } from './store/actions/authActions';
import './styles/index.css';

function AppInit({ children }) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(restoreSession());
  }, [dispatch]);
  return children;
}

export default function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <AppInit>
          <AppRoutes />
        </AppInit>
      </BrowserRouter>
    </Provider>
  );
}

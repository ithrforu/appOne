import { createBrowserRouter } from 'react-router-dom';
import { App } from './App';
import { Login } from './components/Login';
import { MainPage } from './components/MainPage';

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <MainPage />
      },
      {
        path: 'login',
        element: <Login />,
      },
    ],
  },
]);
import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Header from './components/Header.tsx';
import ErrorPage from './error-page.tsx';
import './index.css';
import Footer from './components/Footer.tsx';
import Root from './routes/root.tsx';
import Wallpaper from './routes/wallpaper.tsx';

// const HeaderLayout = () => (
//   <>
//     <Header />
//     <Outlet />
//   </>
// );
const router = createBrowserRouter([
  {
    element: <Header />,
    children: [
      {
        path: '/',
        element: <Root />,
        errorElement: <ErrorPage />,
      },
      {
        path: '/wallpaper',
        element: <Wallpaper />,
        errorElement: <ErrorPage />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <div className='pb-20'>
      <RouterProvider router={router} />

      {/* <div className='mb-20'>
      <App />
    </div> */}
    </div>
    <Footer />
  </React.StrictMode>,
);

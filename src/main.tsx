import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';

import './index.css';
import Footer from './components/Footer.tsx';
import App from './App.tsx';

// const HeaderLayout = () => (
//   <>
//     <Header />
//     <Outlet />
//   </>
// );
// const router = createBrowserRouter([
//   {
//     element: <Header />,
//     children: [
//       {
//         path: '/',
//         element: <Quote />,
//         errorElement: <ErrorPage />,
//       },
//       {
//         path: '/wallpaper',
//         element: <Wallpaper />,
//         errorElement: <ErrorPage />,
//       },
//     ],
//   },
// ]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Router>
      <div className='pb-20'>
        <App />
      </div>

      <Footer />
    </Router>
  </React.StrictMode>,
);

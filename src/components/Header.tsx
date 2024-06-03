import { Link, Outlet, useLocation } from 'react-router-dom';

export default function Header() {
  const location = useLocation();
  console.log('location', location);
  return (
    <>
      <header className='mt-6 flex flex-col items-center justify-center gap-4 py-4 '>
        <h1 className='text-center font-mono text-4xl font-semibold'>
          Spread Words
        </h1>
        <nav className='flex gap-6'>
          <Link
            to='/'
            className={`text-xl ${location.pathname === '/' ? 'font-semibold underline underline-offset-4' : undefined}`}
          >
            quote sharing
          </Link>
          <Link
            to='/wallpaper'
            className={`text-xl ${location.pathname === '/wallpaper' ? 'font-semibold underline underline-offset-4' : undefined}`}
          >
            create wallpaper
          </Link>
        </nav>
      </header>
      <Outlet />
    </>
  );
}

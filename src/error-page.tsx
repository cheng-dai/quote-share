import { useRouteError } from 'react-router-dom';

export default function ErrorPage() {
  const error = useRouteError() as { statusText?: string; message?: string };
  console.error(error);

  return (
    <div className='mt-[30vh] flex flex-col items-center justify-center gap-8 '>
      <h1 className='text-2xl font-semibold'>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p className='text-white/50'>
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
}

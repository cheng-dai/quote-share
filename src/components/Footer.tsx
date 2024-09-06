export default function Footer() {
  return (
    <footer className='fixed bottom-0  w-full bg-[#2d2d2d] py-4 text-center font-sans text-white/50'>
      <p>
        by{' '}
        <a
          href='https://www.chengdai.dev'
          className='text-blue-500/80 hover:underline '
          target='_blank'
          rel='noreferrer'
        >
          Cheng
        </a>
      </p>
    </footer>
  );
}

export default function Footer() {
  return (
    <footer className='sticky bottom-0  w-full bg-[#2d2d2d] py-4 text-center font-sans text-white/50'>
      <p>
        POWERED BY{' '}
        <a
          href='https://ppbook.studio/'
          className='text-blue-500/80 hover:underline '
          target='_blank'
          rel='noreferrer'
        >
          PPBook.studio
        </a>
      </p>
    </footer>
  );
}

import { useState, useRef, useEffect } from 'react';
import data from '../utils/screens.json';
import DownloadButton from '../components/ui/DownloadButton';

export default function Wallpaper() {
  const fontsize = 60;
  const footer = '{ ppbook studio }';
  const [color, setColor] = useState<string>('midnightblue');

  const [words, setWords] = useState<string>('');
  const [lines, setLines] = useState<string[]>([]);
  const [fontLoaded, setFontLoaded] = useState<boolean>(false);
  const [downloadLink, setDownloadLink] = useState<string>('');

  const inputRef = useRef<HTMLTextAreaElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const colors = ['midnightblue', 'darkred', 'darkgreen', 'darkgray'];
  useEffect(() => {
    const loadFont = async () => {
      await document.fonts.load(`${fontsize}px Huiwen-mincho`);
      setFontLoaded(true);
    };

    loadFont();
  }, []);
  let canvas = canvasRef.current;

  useEffect(() => {
    const dpi = 1;
    console.log('dpi', dpi);

    if (canvas && fontLoaded) {
      const ctx = canvas.getContext('2d');

      if (ctx) {
        if (words === '') {
          console.log('clear');
          ctx.clearRect(0, 0, canvas.width, canvas.height);
        } else {
          const longestLine = lines.reduce((longest, current) => {
            if (
              /[\u4e00-\u9fff]/.test(current) &&
              !/[\u4e00-\u9fff]/.test(longest) &&
              Math.abs(current.length - longest.length) < 10
            ) {
              return current;
            } else {
              if (current.length > longest.length) {
                return current;
              } else {
                return longest;
              }
            }
          }, '');
          console.log('longest', longestLine);
          ctx.font = `${fontsize}px Huiwen-mincho`;
          const cssWidth = ctx.measureText(longestLine).width + 80;
          console.log('cssWidth', cssWidth);
          // const cssHeight = 60 + lines.length * fontsize * 2;

          canvas.style.height = `${data.iPhone13.height / 4}px`;
          canvas.style.width = `${data.iPhone13.width / 4}px`;
          canvas.height = data.iPhone13.height;
          canvas.width = data.iPhone13.width;
          ctx.scale(dpi, dpi);
          ctx.fillStyle = color;
          ctx.fillRect(0, 0, canvas.width, canvas.height);

          ctx.fillStyle = '#f2f2f2';
          ctx.font = `${fontsize}px Huiwen-mincho`;
          for (let i = 0; i < lines.length; i++) {
            ctx.fillText(
              lines[i],
              (canvas.width - ctx.measureText(longestLine).width) / 2,
              canvas.height / 2 + i * fontsize * 2,
            );
          }
          ctx.font = `${fontsize / 1.5}px Huiwen-mincho`;
          ctx.fillText(
            `${footer}`,
            (canvas.width - ctx.measureText(footer).width) / 2,
            canvas.height - fontsize / 1.5,
          );
        }
      }
      setDownloadLink(canvas.toDataURL('image/png', 1));
    }
  }, [words, color, lines, fontLoaded]);
  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.target.value;
    setWords(newText);
    setLines(newText.split('\n'));
  };

  return (
    <div className='mx-auto w-1/3 max-md:w-full'>
      <textarea
        ref={inputRef}
        id='input'
        className='aspect-[4/1] w-full bg-[#f2f2f2]/20 p-4 text-white'
        value={words}
        onChange={handleInputChange}
      />
      {words ? (
        <div>
          {/* Configuration */}

          <div className='my-4'>
            <div className='flex gap-2'>
              <span className='text-xl'>背景色：</span>
              {colors.map((c) => (
                <button
                  key={c}
                  className={`
        h-8 w-8 rounded-full
        ${c === color ? 'border-2 border-white' : ''}
      )`}
                  style={{ backgroundColor: c }}
                  onClick={() => setColor(c)}
                ></button>
              ))}
            </div>
          </div>
          {fontLoaded ? (
            <div className='flex flex-col items-center justify-center gap-4'>
              <canvas ref={canvasRef}></canvas>
              {canvas && <DownloadButton downloadLink={downloadLink} />}
            </div>
          ) : (
            <p className='mt-20 text-center font-serif text-xl tracking-widest text-blue-200'>
              Loading font...
            </p>
          )}
        </div>
      ) : undefined}
    </div>
  );
}

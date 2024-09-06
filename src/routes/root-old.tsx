import { useState, useRef, useEffect } from 'react';

export default function Root() {
  const fontsize = 16;
  const [color, setColor] = useState<string>('midnightblue');
  const [words, setWords] = useState<string>('');
  const [lines, setLines] = useState<string[]>([]);
  const [fontLoaded, setFontLoaded] = useState<boolean>(false);

  const [downloadLink, setDownloadLink] = useState<string>('');

  const canvasRef = useRef<HTMLCanvasElement>(null);

  const colors = ['midnightblue', 'darkred', 'darkgreen', 'darkgray'];
  useEffect(() => {
    const loadFont = async () => {
      await document.fonts.load(`${fontsize}px Huiwen-mincho`);
      setFontLoaded(true);
    };

    loadFont();
  }, []);
  useEffect(() => {
    const dpi = 8;
    console.log('dpi', dpi);
    const canvas = canvasRef.current;

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
          }, '「ppbook studio」');
          console.log('longest', longestLine);
          ctx.font = `${fontsize}px Huiwen-mincho`;
          const cssWidth = ctx.measureText(longestLine).width + 80;
          console.log('cssWidth', cssWidth);
          const cssHeight = 60 + lines.length * fontsize * 2;

          canvas.style.height = `${cssHeight}px`;
          canvas.style.width = `${cssWidth}px`;
          canvas.height = cssHeight * dpi;
          canvas.width = cssWidth * dpi;
          ctx.scale(dpi, dpi);
          ctx.fillStyle = color;
          ctx.fillRect(0, 0, canvas.width, canvas.height);

          ctx.fillStyle = '#f2f2f2';
          ctx.font = `${fontsize}px Huiwen-mincho`;
          for (let i = 0; i < lines.length; i++) {
            ctx.fillText(lines[i], 40, 40 + i * fontsize * 2);
          }
          ctx.font = '12px Huiwen-mincho';
          ctx.fillText(
            '「ppbook studio」',
            cssWidth / 2 - 40,
            lines.length * fontsize * 2 + 40,
          );
          setDownloadLink(canvas.toDataURL('image/png', 1));
        }
      }
    }
  }, [words, color, lines, fontLoaded]);
  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.target.value;
    setWords(newText);
    setLines(newText.split('\n'));
  };

  // const drawCanvas = () => {
  //   const canvas = canvasRef.current;
  //   if (canvas) {
  //     const ctx = canvas.getContext('2d');
  //     if (ctx) {
  //       ctx.clearRect(0, 0, canvas.width, canvas.height);
  //       ctx.fillStyle = 'white';
  //       ctx.fillRect(0, 0, canvas.width, canvas.height);
  //       ctx.font = '32px Huiwen-mincho';
  //       ctx.fillStyle = 'midnightblue';
  //       ctx.fillText(words, 10, 50);
  //     }
  //   }
  // };

  return (
    <div className='mx-auto w-1/3 max-md:w-full'>
      {/* <h1 className='text-center py-2 font-huiwen text-2xl'>分享</h1> */}

      <textarea
        id='input'
        className='aspect-[2/1] w-full bg-[#f2f2f2]/20 p-4 text-white'
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

              <a
                download
                href={downloadLink}
                className='border-2 px-2 py-1 text-xl '
              >
                Download
              </a>
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

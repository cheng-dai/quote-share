import { useState, useRef, useEffect, useMemo, useCallback } from 'react';

export default function App() {
  const fontsize = 16;
  const [bgcolor, setBgColor] = useState<string>('darkgray');
  const [text, setText] = useState<string>('');
  const [fontLoaded, setFontLoaded] = useState<boolean>(false);
  const [downloadLink, setDownloadLink] = useState<string>('');
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const colors = ['steelblue', 'darkred', 'darkgreen', 'darkgray'];

  // Memoize lines to prevent unnecessary recalculations
  const lines = useMemo(() => text.split('\n'), [text]);

  // Load font only once
  useEffect(() => {
    document.fonts
      .load(`${fontsize}px Huiwen-mincho`)
      .then(() => setFontLoaded(true));
  }, []);

  // Memoize the drawing function
  const drawCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || !fontLoaded || lines.length === 0) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpi = 8;
    ctx.font = `${fontsize}px Huiwen-mincho`;

    // Calculate dimensions
    const longestLine = lines.reduce((longest, current) => {
      return ctx.measureText(current).width > ctx.measureText(longest).width
        ? current
        : longest;
    }, lines[0]);

    const contentWidth = ctx.measureText(longestLine).width + 80;
    const contentHeight = 60 + lines.length * fontsize * 2;

    // Set canvas dimensions
    canvas.width = contentWidth * dpi;
    canvas.height = contentHeight * dpi;
    canvas.style.width = `${contentWidth}px`;
    canvas.style.height = `${contentHeight}px`;

    // Reset context after resize and set scale
    ctx.scale(dpi, dpi);
    ctx.font = `${fontsize}px Huiwen-mincho`;

    // Draw background
    ctx.fillStyle = bgcolor;
    ctx.fillRect(0, 0, contentWidth, contentHeight);

    // Draw text
    ctx.fillStyle = '#103947';
    lines.forEach((line, i) => {
      ctx.fillText(line, 40, 40 + i * fontsize * 2);
    });

    // Draw watermark
    ctx.font = '12px Huiwen-mincho';
    ctx.fillText(
      '「ppstudio.run」',
      contentWidth / 2 - 40,
      lines.length * fontsize * 2 + 40,
    );

    setDownloadLink(canvas.toDataURL('image/png', 1));
  }, [bgcolor, lines, fontLoaded]);

  // Handle text input
  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setText(e.target.value);
    },
    [],
  );

  // Draw canvas when dependencies change
  useEffect(() => {
    if (text && fontLoaded) {
      drawCanvas();
    }
  }, [text, bgcolor, fontLoaded, drawCanvas]);

  return (
    <div className='mx-auto w-1/3 max-md:w-full'>
      <h2 className='my-4 text-center font-serif text-2xl tracking-widest'>
        Share the Quote
      </h2>

      <textarea
        ref={inputRef}
        id='input'
        className='aspect-[2/1] w-full bg-[#f2f2f2]/20 p-4 text-white'
        value={text}
        onChange={handleInputChange}
      />
      {text ? (
        <div>
          <h3 className='mt-4 text-center font-serif text-xl tracking-widest'>
            Customize
          </h3>
          <div className='flex gap-2'>
            <span>Background: </span>
            {colors.map((c) => (
              <button
                key={c}
                className={`h-8 w-8 rounded-full ${c === bgcolor ? 'border-2 border-white' : ''}`}
                style={{ backgroundColor: c }}
                onClick={() => setBgColor(c)}
              />
            ))}
          </div>
          {/* Canvas */}
          {fontLoaded ? (
            <div className='flex flex-col items-center justify-center gap-4'>
              <canvas ref={canvasRef} className='rounded-lg' />
              <a
                download='spread_word'
                href={downloadLink}
                className='rounded border-2 px-4 py-2 text-xl'
              >
                Download Image
              </a>
            </div>
          ) : (
            <p className='mt-20 text-center font-serif text-xl tracking-widest text-blue-200'>
              Loading font...
            </p>
          )}
        </div>
      ) : null}
    </div>
  );
}

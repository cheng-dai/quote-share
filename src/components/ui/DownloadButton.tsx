export default function DownloadButton() {
  return (
    <button
      className='rounded bg-blue-500 px-4 py-2 font-semibold text-white hover:bg-blue-600'
      onClick={() => {
        const canvas = document.querySelector('canvas');
        if (canvas) {
          const dataURL = canvas.toDataURL('image/png');
          const a = document.createElement('a');
          a.href = dataURL;
          a.download = 'wallpaper.png';
          a.click();
        }
      }}
    >
      Download
    </button>
  );
}

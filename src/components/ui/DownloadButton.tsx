export default function DownloadButton({
  downloadLink,
}: {
  downloadLink: string;
}) {
  return (
    <a
      className='rounded bg-blue-500 px-4 py-2 font-semibold text-white hover:bg-blue-600'
      href={downloadLink}
      download={'download.png'}
    >
      Download
    </a>
  );
}

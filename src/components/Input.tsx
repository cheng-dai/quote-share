export default function Input({
  words,
  handleInputChange,
}: {
  words: string;
  handleInputChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}) {
  return (
    <textarea
      id='input'
      className='aspect-[2/1] w-full bg-[#f2f2f2]/20 p-4 text-[#103947]'
      value={words}
      onChange={handleInputChange}
    />
  );
}

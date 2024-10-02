import { copyToClipboard } from '@/utils/strings.util';
import { useState } from 'react';
import { HiCheck, HiClipboard } from 'react-icons/hi2';

interface ClipboardButtonProps {
  textToCopy: string;
}

export const ClipboardButton: React.FC<ClipboardButtonProps> = ({ textToCopy }) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = async () => {
    await copyToClipboard(textToCopy);
    setIsCopied(true);

    // Reset the "Copied" state after 2 seconds
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      className="text-neutral-800 dark:text-neutral-200"
    >
      {isCopied ? <HiCheck className='dark:text-primary-green-500' /> : <HiClipboard /> }
    </button>
  );
};

export const copyToClipboard = async (text: string): Promise<void> => {
  try {
    await navigator.clipboard.writeText(text);
  } catch (err) {
    console.error('Failed to copy text:', err);
  }
};

export const shortenAddress = (
  address: string | undefined
): string | undefined => {
  const prefixLength = 6;
  const suffixLength = 4;

  if (address) {
    if (address.length <= prefixLength + suffixLength) {
      return address;
    }

    const prefix = address.slice(0, prefixLength);
    const suffix = address.slice(-suffixLength);

    return `${prefix}...${suffix}`;
  }
};

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

export const handleImageBridge = (uri?: string, isError?: boolean): string | undefined => {
  if (uri) {
    if (!uri.startsWith("https://")) {
      if (isError) {
        return `https://cloudflare-ipfs.com/ipfs/${uri}`
      }
      return `https://ipfs.io/ipfs/${uri}`
    } else {
      return uri;
    }
  }
  return undefined;
};

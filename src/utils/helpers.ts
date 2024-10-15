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

export const handleChain = (chain?: string): string | undefined => {
  if (chain) {
    switch (chain.toLowerCase()) {
      case 'ethereum':
        return 'eth';
      case 'binancesmartchain':
        return 'bnb';
      case 'polygon':
        return 'polygon';
      case 'arbitrum':
        return 'arbitrum';
      case 'optimism':
        return 'optimism';
      case 'zksync':
        return 'zksync';
      case 'linea':
        return 'linea';
      case 'base':
        return 'base';
      case 'avalanche':
        return 'avalanche';
      case 'moonbeam':
        return 'moonbeam';
      case 'platon':
        return 'platon';
      case 'cronos':
        return 'cronos';
      case 'fantom':
        return 'fantom';
      case 'gnosis':
        return 'gnosis';
      case 'viction':
        return 'viction';
      case 'starknet':
        return 'starknet';
      case 'mantle':
        return 'mantle';
      case 'blast':
        return 'blast';
      default:
        return chain.toLowerCase();
    }
  }
  return undefined;
}

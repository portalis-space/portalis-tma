"use client"
import { ContractType } from '@/services/web3/Web3.types';
import { useTonAddress } from '@tonconnect/ui-react';
import { createContext, useContext, ReactNode, useCallback, useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { activeContractName } from '@/commons/common.constant';
import { useAccount } from 'wagmi';
import { handleChain } from '@/utils/helpers';

interface ContractContextProps {
  contract: ContractType;
  setContract: (contract: ContractType) => void;
  activeWalletAddress?: string;
  activeChain?: string;
}

// Create the ContractContext
const ContractContext = createContext<ContractContextProps | undefined>(undefined);

export const ContractProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [contract, _setContract] = useState<ContractType>('evm');
  const tonUserFriendlyAddress = useTonAddress();
  const { address: evmUserFriendlyAddress, chain: evmChain } = useAccount();

  const setContract = useCallback((c: ContractType) => {
    _setContract(c);
    Cookies.set(activeContractName, c);
  },[])

  const activeWalletAddress = contract === 'evm' ?  evmUserFriendlyAddress : tonUserFriendlyAddress;
  const activeChain = contract === 'evm' ? handleChain(evmChain?.name) : contract;

  useEffect(() => {
    const getFromCookies = Cookies.get(activeContractName) as ContractType;
    if (getFromCookies) {
      console.log('called', getFromCookies);
      _setContract(getFromCookies)
    }
  }, [])

  return (
    <ContractContext.Provider value={{ contract, setContract, activeWalletAddress, activeChain }}>
      {children}
    </ContractContext.Provider>
  );
};

// Custom hook to use the ContractContext
export const useContractContext = () => {
  const context = useContext(ContractContext);
  if (!context) {
    throw new Error('useContract must be used within a ContractProvider');
  }
  return context;
};

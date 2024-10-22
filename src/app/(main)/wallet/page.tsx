"use client"
import Button from "@/components/atoms/Button.atom";
import Typography from "@/components/atoms/Typography.atom";
import { ClipboardButton } from "@/components/molecules/ClipboardButton.molecule";
import CollectionCard from "@/components/molecules/CollectionCard.molecule";
import { Dropdown, DropdownOption } from "@/components/molecules/Dropdown.molecule";
import Loader from "@/components/molecules/Loader.molecule";
import Pagination from "@/components/molecules/Pagination.molecule";
import { useContractContext } from "@/contexts/Contract.context";
import { useGetOwnedNFTsQuery } from "@/services/web3/queries/GetOwnedNFTs.query";
import { useGetTONBalanceQuery } from "@/services/web3/queries/GetTONBalance.query";
import { ContractType } from "@/services/web3/Web3.types";
import { cn } from "@/utils/cn";
import { handleChain, parseNanoTon, shortenAddress } from "@/utils/helpers";
import { useAppKit, useWalletInfo } from "@reown/appkit/react";
import { useTonAddress, useTonConnectUI } from "@tonconnect/ui-react";
import Image from "next/image";
import { useCallback, useMemo, useState } from "react";
import { useAccount, useBalance } from "wagmi";

const Wallet = () => {
  const {contract, setContract, activeWalletAddress}  = useContractContext();
  const [tonConnectUI] = useTonConnectUI();
  const { walletInfo } = useWalletInfo();
  const { open } = useAppKit();
  
  const tonUserFriendlyAddress = useTonAddress();
  const { address: evmUserFriendlyAddress, chain: evmChain } = useAccount();

  const [page, setPage] = useState(1);
  const [contractWallet, setContractWallet] = useState<ContractType>(contract);

  const {isLoading, data: getOwnedNFTsQuery} = useGetOwnedNFTsQuery({
    page,
    size: 10,
    walletAddress: contractWallet === 'evm' ? evmUserFriendlyAddress : tonUserFriendlyAddress,
    chain: contractWallet === 'evm' ? handleChain(evmChain?.name) : contractWallet,
    type: contractWallet
  });
  const ownedNFtsData = useMemo(() => getOwnedNFTsQuery?.data, [getOwnedNFTsQuery?.data]);
  const ownedNFtsMeta = useMemo(() => getOwnedNFTsQuery?.meta, [getOwnedNFTsQuery?.meta]);

  const {isLoading: isGetTONBalanceLoading, data: TONBalanceQuery} = useGetTONBalanceQuery({walletAddress: contractWallet === 'ton' && tonUserFriendlyAddress ? tonUserFriendlyAddress : undefined });
  const TONBalance = useMemo(() => TONBalanceQuery?.result, [TONBalanceQuery?.result]);

  const { data: balance, isError: isErrorBalance, isLoading: isLoadingBalance } = useBalance({
    address: contractWallet === 'evm' ? evmUserFriendlyAddress as `0x${string}` : undefined,
  });

  const contractTypeOptions: DropdownOption[] = [
    {
      id: 'evm',
      element: (
        <div className="flex flex-row items-center gap-3">
          <div className={`cursor-pointer relative rounded-full w-10 h-10 overflow-hidden flex items-center justify-center p-3`}>
            <div className="nav-icon w-full h-full absolute" />
            <div className="absolute w-8 h-8 bg-neutral-900 rounded-full p-1 flex flex-row items-center justify-center">
              <Image src='/assets/eth-logo.png' alt='contract-logo' width={0} height={0} className="w-auto h-6 p-1" />
            </div>
          </div>
          <Typography weight="bold" variant="text-base">EVM</Typography>
        </div>
      ),
    },
    {
      id: 'ton',
      element: (
        <div className="flex flex-row items-center gap-3">
          <div className={`cursor-pointer relative rounded-full w-10 h-10 overflow-hidden flex items-center justify-center`}>
            <div className="nav-icon w-full h-full absolute" />
            <div className="absolute w-8 h-8 bg-neutral-900 rounded-full p-1 flex flex-row items-center justify-center">
              <Image src={'/assets/ton-logo.png'} alt='contract-logo' width={0} height={0} className="w-auto h-6 p-1" />
            </div>
          </div>
          <Typography weight="bold" variant="text-base">TON</Typography>
        </div>
      ),
    }
  ];

  const handleSelectContractType = useCallback((optionId: string) => {
    setContract(optionId as ContractType);
  }, [setContract]);
  return (
    <main className="flex flex-col px-3 gap-2 min-h-screen">
      <section className="flex flex-col w-full gap-3 bg-gradient-to-tr from-primary-purple-107 via-primary-purple-105 to-primary-blue-600 p-4 rounded-xl">
        <Typography variant="text-2xl" weight="bold" className="text-center">My Wallet</Typography>
        <div className="flex flex-col items-center gap-1">
          <Dropdown options={contractTypeOptions} label="Contract Type" onSelect={handleSelectContractType} selectedOption={contract} />
        </div>
        <div className="flex flex-row justify-between items-center">
          <Typography weight="bold" variant="text-xs">Active Wallet:</Typography>
          <div className="flex flex-row items-center gap-1">
            <Typography weight="bold" variant="text-xs">{activeWalletAddress ? shortenAddress(activeWalletAddress) : 'no connected wallet'}</Typography>
            {activeWalletAddress && <ClipboardButton textToCopy={activeWalletAddress} />}
          </div>
        </div>
      </section>
      <Typography variant="text-base" weight="bold" className="text-center !text-primary-purple-105 mt-5">All Connected Wallet</Typography>
      <section className="flex flex-row justify-around items-center">
        <Button
          size="small"
          variant="tinted"
          onClick={() => contractWallet !== 'evm' && setContractWallet('evm')}
          className={cn("w-full border-b-2 border-transparent rounded-none",{" border-primary-purple-105": contractWallet === 'evm'})}
        >EVM</Button>
        <Button
          size="small"
          variant="tinted"
          onClick={() => contractWallet !== 'ton' && setContractWallet('ton')}
          className={cn("w-full border-b-2 border-transparent rounded-none",{"border-primary-purple-105": contractWallet === 'ton'})}
        >TON</Button>
      </section>
      <section className="flex flex-col w-full gap-3">
        {
          contractWallet === 'evm' ?
          <div className="flex flex-row items-center gap-1">
            {evmChain?.name && <Button variant="outlined" onClick={() => open({view: 'Networks'})} className="max-w-min px-2">{evmChain.name}</Button>}
            <Button variant="outlined" onClick={() => open()}>{
              walletInfo ?
              <>
                {
                  walletInfo?.icon &&
                  <Image
                    src={walletInfo.icon}
                    alt='wallet icon'
                    width={100}
                    height={100}
                    className="w-8 h-auto pr-3"
                  />
                }
                {
                  walletInfo.name && <Typography variant="text-base">{walletInfo.name}</Typography>
                }
              </> : 'Connect EVM Wallet'
            }</Button>
          </div> : 
          <Button variant="outlined" onClick={() => tonConnectUI.connected ? tonConnectUI.disconnect() : tonConnectUI.openModal()}>
            {tonConnectUI.connected ? "Disconnect" : 'Connect TON Wallet'}
          </Button>
        }
        <div className="flex flex-row items-center gap-3 justify-center">
          {
            contractWallet === 'evm' ? (
              isLoadingBalance ?
              <Loader /> :
              balance && 
              <>
                <Image src={'/assets/eth-logo.png'} alt='eth-logo' width={48} height={48} className="w-auto h-6" />
                <Typography variant="text-lg" weight="bold">{balance.formatted} {balance.symbol}</Typography>
              </>
            ) : (
              isGetTONBalanceLoading ? 
              <Loader /> :
              TONBalance && 
              <>
                <Image src={'/assets/ton-logo.png'} alt='ton-logo' width={48} height={48} className="w-auto h-6" />
                <Typography variant="text-lg" weight="bold">{parseNanoTon(TONBalance)} TON</Typography>
              </>
            )
          }
        </div>
        {isErrorBalance && <Typography variant="text-xs" className="!text-red-500 text-center">Failed to get balance</Typography>}
        <div className="flex w-full justify-between border-b-2 border-primary-purple-105 pb-2">
          <Typography variant="text-sm" weight="bold" className="!text-primary-purple-105">Owned Collection</Typography>
          <div className="flex flex-row items-center gap-1">
            <Typography weight="bold" variant="text-xs">{
              contractWallet === 'evm' ?
              (evmUserFriendlyAddress ? shortenAddress(evmUserFriendlyAddress) : 'no connected wallet') :
              (tonUserFriendlyAddress ? shortenAddress(tonUserFriendlyAddress) : 'no connected wallet')
            }</Typography>
            {
              contractWallet === 'evm' ?
              (evmUserFriendlyAddress && <ClipboardButton textToCopy={evmUserFriendlyAddress} />) :
              (tonUserFriendlyAddress && <ClipboardButton textToCopy={tonUserFriendlyAddress} />)
            }
          </div>
        </div>
          {
            isLoading && <div className="flex items-center justify-center h-1/3 w-full"><Loader /></div>
          }
          {
            ownedNFtsData && ownedNFtsData.length > 0 && 
            <>
              <div className="flex flex-row flex-wrap">
              {ownedNFtsData?.map((collection) => 
                <div className="p-1 w-1/2 lg:w-1/3" key={collection.attributes.contract_address}>
                  <CollectionCard collection={collection} withModal={true} owned/>
                </div>
              )}
              </div>
              <Pagination page={page} setPage={setPage} meta={ownedNFtsMeta} />
            </>
          }
          {
            !isLoading && ownedNFtsData && ownedNFtsData.length === 0 && <Typography variant="text-xs" className="text-center">You don&apos;t have any collection.</Typography>
          }
      </section>
    </main>
  )
}

export default Wallet;
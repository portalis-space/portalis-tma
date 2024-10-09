"use client"
import Button from "@/components/atoms/Button.atom";
import Typography from "@/components/atoms/Typography.atom";
import { ClipboardButton } from "@/components/molecules/ClipboardButton.molecule";
import CollectionCard from "@/components/molecules/CollectionCard.molecule";
import Loader from "@/components/molecules/Loader.molecule";
import Pagination from "@/components/molecules/Pagination.molecule";
import { useGetOwnedNFTsQuery } from "@/services/web3/queries/GetOwnedNFTs.query";
import { shortenAddress } from "@/utils/strings.util";
import { useAppKit, useWalletInfo } from "@reown/appkit/react";
import Image from "next/image";
import { useMemo, useState } from "react";
import { useAccount, useBalance } from "wagmi";

const Wallet = () => {
  const { walletInfo } = useWalletInfo();
  const { open } = useAppKit();
  const { address, chain } = useAccount();
  const { data: balance, isError: isErrorBalance, isLoading: isLoadingBalance } = useBalance({
    address, // Pass the connected wallet address
  });
  const [page, setPage] = useState(1);

  const {isLoading, data: getOwnedNFTsQuery} = useGetOwnedNFTsQuery({
    page,
    size: 10,
    walletAddress: address,
    chain: chain?.name === 'Ethereum' ? chain?.name?.substring(0,3)?.toLowerCase() : chain?.name?.toLowerCase(),
    type: 'evm'
  });
  const ownedNFtsData = useMemo(() => getOwnedNFTsQuery?.data, [getOwnedNFTsQuery?.data]);
  const ownedNFtsMeta= useMemo(() => getOwnedNFTsQuery?.meta, [getOwnedNFTsQuery?.meta]);

  return (
    <main className="flex flex-col px-3 gap-2 min-h-screen">
      <Typography variant="text-lg" weight="bold" className="text-center">My Wallet</Typography>
      <section className="flex flex-col w-full gap-3">
        <div className="flex flex-row justify-between items-center text-primary-purple-106">
          <Typography weight="bold" variant="text-xs">Current Wallet:</Typography>
          <div className="flex flex-row items-center gap-1">
            <Typography weight="bold" variant="text-xs">{address ? shortenAddress(address) : 'no connected wallet'}</Typography>
            {address && <ClipboardButton textToCopy={address} />}
          </div>
        </div>
        <Button variant="outlined" onClick={() => open()}>{
          walletInfo ?
          <>
            {
              walletInfo.icon &&
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
          </> : 'Connect Wallet'
        }</Button>
        <div className="flex flex-row items-center gap-3 justify-center">
          <Image src={'/assets/svg/eth-coin.svg'} alt='eth-coin' width={48} height={48} className="w-auto h-8" />
          {
            isLoadingBalance ?
            <Loader /> :
            balance && <Typography variant="text-lg" weight="bold" className="text-primary-purple-106">{balance.formatted} {balance.symbol}</Typography>
          }
        </div>
        {isErrorBalance && <Typography variant="text-xs" className="!text-red-500 text-center">Failed to get balance</Typography>}
        <div className="flex w-full justify-center border-b-2 border-primary-purple-106 mt-5">
          <Typography variant="text-sm" weight="bold" className="text-primary-purple-106">Owned Collection</Typography>
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
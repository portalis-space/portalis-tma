"use client"
import Button from "@/components/atoms/Button.atom";
import Typography from "@/components/atoms/Typography.atom";
import { ClipboardButton } from "@/components/molecules/ClipboardButton.molecule";
import Loader from "@/components/molecules/Loader.molecule";
import NFTCard from "@/components/molecules/NFTCard.molecule";
import { shortenAddress } from "@/utils/strings.util";
import { useAppKit, useWalletInfo } from "@reown/appkit/react";
import Image from "next/image";
import { useAccount, useBalance } from "wagmi";

const Wallet = () => {
  const { walletInfo } = useWalletInfo();
  const { open } = useAppKit();
  const { address } = useAccount();
  const { data: balance, isError: isErrorBalance, isLoading: isLoadingBalance } = useBalance({
    address, // Pass the connected wallet address
  });

  // const walletOptions: DropdownOption[] = [
  //   {
  //     id: 'metamask',
  //     element: (
  //       <div className="flex flex-row items-center justify-start gap-2">
  //         <Image src={'/assets/svg/metamask-logo.svg'} alt='metamask-logo' width={50} height={50} className="w-6 h-6" />
  //         <Typography variant='text-sm' weight="bold">Metamask</Typography>
  //       </div>
  //     ),
  //   },
  //   {
  //     id: 'trustwallet',
  //     element: (
  //       <div className="flex flex-row items-center justify-start gap-2">
  //         <Typography variant='text-sm' weight="bold">TrustWallet</Typography>
  //       </div>
  //     ),
  //   },
  // ];

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
          walletInfo?.icon && walletInfo?.name ?
          <>
            <Image
              src={walletInfo.icon}
              alt='wallet icon'
              width={100}
              height={100}
              className="w-8 h-auto"
            />
            <Typography variant="text-base" className="pl-3">{walletInfo.name}</Typography>
          </> : 'Connect to your wallet'
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
          <Typography variant="text-sm" weight="bold" className="text-primary-purple-106">Owned NFT</Typography>
        </div>
        <div className="flex flex-row flex-wrap">
          <div className="p-1 w-1/2 lg:w-1/3">
            <NFTCard owned />
          </div>
          <div className="p-1 w-1/2 lg:w-1/3">
            <NFTCard owned />
          </div>
          <div className="p-1 w-1/2 lg:w-1/3">
            <NFTCard owned />
          </div>
          <div className="p-1 w-1/2 lg:w-1/3">
            <NFTCard owned />
          </div>
          <div className="p-1 w-1/2 lg:w-1/3">
            <NFTCard owned />
          </div>
          <div className="p-1 w-1/2 lg:w-1/3">
            <NFTCard owned />
          </div>
          <div className="p-1 w-1/2 lg:w-1/3">
            <NFTCard owned />
          </div>
        </div>
      </section>
    </main>
  )
}

export default Wallet;
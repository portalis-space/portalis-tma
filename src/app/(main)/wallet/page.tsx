"use client"
import Typography from "@/components/atoms/Typography.atom";
import { Dropdown, DropdownOption } from "@/components/molecules/Dropdown.molecule";
import NFTCard from "@/components/molecules/NFTCard.molecule";
import Image from "next/image";
import { useCallback, useState } from "react";
import { HiClipboard } from "react-icons/hi2";

const Wallet = () => {
  const [selectedWallet, setSelectedWallet] = useState<string>('metamask'); // Initially select 'metamask'

  const handleSelect = useCallback((optionId: string) => {
    setSelectedWallet(optionId); // Update state based on selected option
  }, []);
  console.log(selectedWallet)
  const walletOptions: DropdownOption[] = [
    {
      id: 'metamask',
      element: (
        <div className="flex flex-row items-center justify-start gap-2">
          <Image src={'/assets/svg/metamask-logo.svg'} alt='metamask-logo' width={50} height={50} className="w-6 h-6" />
          <Typography variant='text-sm' weight="bold">Metamask</Typography>
        </div>
      ),
    },
    {
      id: 'trustwallet',
      element: (
        <div className="flex flex-row items-center justify-start gap-2">
          <Typography variant='text-sm' weight="bold">TrustWallet</Typography>
        </div>
      ),
    },
  ];

  return (
    <main className="flex flex-col py-10 px-3 gap-2">
      <Typography variant="text-lg" weight="bold" className="text-center">My Wallet</Typography>
      <section className="flex flex-col w-full gap-3">
        <div className="flex flex-row justify-between items-center text-primary-purple-106">
          <Typography weight="bold" variant="text-xs">Current Wallet:</Typography>
          <div className="flex flex-row items-center gap-1">
            <Typography weight="bold" variant="text-xs">0x721d...a378</Typography>
            <HiClipboard className="text-neutral-800 dark:text-neutral-200 text-xs" />
          </div>
        </div>
        <Dropdown
          label="Select a Wallet"
          defaultOptionId="metamask"
          options={walletOptions}
          onSelect={handleSelect}
          className="wallet-dropdown"
        />
        <div className="flex flex-row items-center gap-3 justify-center">
          <Image src={'/assets/svg/eth-coin.svg'} alt='eth-coin' width={48} height={48} className="w-auto h-8" />
          <Typography variant="text-lg" weight="bold" className="text-primary-purple-106">999 ETH</Typography>
        </div>
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
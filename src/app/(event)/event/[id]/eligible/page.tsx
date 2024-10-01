"use client"
import Button from "@/components/atoms/Button.atom";
import { useState } from "react";
import { cn } from "@/utils/cn";
import Typography from "@/components/atoms/Typography.atom";
import EligibleNFT from "./EligibleNFT.section";
import EligibleCollection from "./EligibleCollection.section";

const EligibleAsset = () => {
  const [activeTab, setActiveTab] = useState<'collections' | 'nfts'>('collections')
  return (
    <main className="flex flex-col gap-3 pt-10 pb-20 px-3 min-h-screen">
      <div className="bg-neutral-200 dark:bg-neutral-800 rounded-xl flex flex-col items-center p-2 w-full">
        <Typography weight="bold" variant="text-xs" className="!text-primary-purple-105 truncate w-full text-center">Decentralized with Portalis and Team</Typography> 
      </div>
      <div className="flex flex-col items-center">
        <Typography weight="bold">Eligible Assets</Typography>
        <Typography weight="light" variant="text-xs">Please select the eligible asset to generate the ticket.</Typography> 
      </div>
      <section className="flex flex-row justify-around items-center">
        <Button
          size="small"
          variant="tinted"
          onClick={() => activeTab !== 'collections' && setActiveTab('collections')}
          className={cn("w-full border-b-2 border-transparent rounded-none",{" border-primary-purple-101": activeTab === 'collections'})}
        >Collections</Button>
        <Button
          size="small"
          variant="tinted"
          onClick={() => activeTab !== 'nfts' && setActiveTab('nfts')}
          className={cn("w-full border-b-2 border-transparent rounded-none",{"border-primary-purple-101": activeTab === 'nfts'})}
        >NFTs</Button>
      </section>
      {
        activeTab === 'collections' && <EligibleCollection />
      }
      {
        activeTab === 'nfts' && <EligibleNFT />
      }
    </main>
  )
}

export default EligibleAsset;
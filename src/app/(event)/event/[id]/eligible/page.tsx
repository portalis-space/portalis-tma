"use client"
import Typography from "@/components/atoms/Typography.atom";
import EligibleCollection from "./EligibleCollection.section";

const EligibleAsset = () => {
  return (
    <main className="flex flex-col gap-3 px-3 min-h-screen">
      <div className="bg-neutral-200 dark:bg-neutral-800 rounded-xl flex flex-col items-center p-2 w-full">
        <Typography weight="bold" variant="text-xs" className="!text-primary-purple-105 truncate w-full text-center">Decentralized with Portalis and Team</Typography> 
      </div>
      <div className="flex flex-col items-center">
        <Typography weight="bold">Eligible Assets</Typography>
        <Typography weight="light" variant="text-xs">Please select the eligible asset to generate the ticket.</Typography> 
      </div>
      <EligibleCollection />
    </main>
  )
}

export default EligibleAsset;
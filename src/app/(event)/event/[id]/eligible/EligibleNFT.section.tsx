"use client"
import InputWithIcon from "@/components/molecules/InputWithIcon.molecule";
import { HiMagnifyingGlass } from "react-icons/hi2";
import NFTCard from "@/components/molecules/NFTCard.molecule";
import { useRouter } from "next/navigation";

const EligibleNFT = () => {
  const router = useRouter();
  return (
    <section className="flex flex-col gap-3">
      <InputWithIcon headingIcon={<HiMagnifyingGlass className="text-neutral-800 dark:text-neutral-200" />} />
      <div className="flex flex-row flex-wrap">
        <div className="p-1 w-1/2 lg:w-1/3">
          <NFTCard owned onClick={() => router.push('/generate-ticket')} />
        </div>
        <div className="p-1 w-1/2 lg:w-1/3">
          <NFTCard />
        </div>
        <div className="p-1 w-1/2 lg:w-1/3">
          <NFTCard />
        </div>
        <div className="p-1 w-1/2 lg:w-1/3">
          <NFTCard />
        </div>
        <div className="p-1 w-1/2 lg:w-1/3">
          <NFTCard />
        </div>
        <div className="p-1 w-1/2 lg:w-1/3">
          <NFTCard />
        </div>
        <div className="p-1 w-1/2 lg:w-1/3">
          <NFTCard />
        </div>
      </div>
    </section>
  )
}

export default EligibleNFT;
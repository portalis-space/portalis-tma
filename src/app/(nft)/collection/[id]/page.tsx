"use client"
import Button from "@/components/atoms/Button.atom";
import Typography from "@/components/atoms/Typography.atom";
import BottomArea from "@/components/molecules/BottomArea.molecule";
import NFTCard from "@/components/molecules/NFTCard.molecule";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { HiChevronRight, HiGift, HiUserCircle } from "react-icons/hi2";

const CollectionDetail = () => {
  const router = useRouter();
  return (
    <main className="flex flex-col pb-16 gap-2 min-h-screen">
      <section className="px-3 w-full relative">
        <Image
          alt="eventImage"
          src={'/assets/collection-placeholder.jpg'}
          width={960}
          height={540}
          className="w-full h-auto aspect-square object-cover rounded-lg"
        />
        <div className="absolute top-1 right-4 flex flex-row px-3 py-1 gap-1 items-center rounded bg-primary-blue-500 text-primary-purple-108">
          <HiGift />
          <Typography variant="text-xs" weight="bold" className="!text-primary-purple-108">Drop</Typography>
        </div>
      </section>
      <section className="flex flex-col gap-3 px-3">
        <Typography variant="text-2xl" weight="extra-bold" className="text-primary-purple-108">Orange Bird With Sound Like a Thunder</Typography>
        <div className="flex flex-row items-center justify-between p-4 gap-1 rounded-lg bg-white bg-opacity-30 dark:bg-neutral-800 flex-auto">
          <div className="flex flex-row items-center gap-2">
            <HiUserCircle className="text-primary-purple-105"/>
            <Typography variant="text-xs" weight="bold" className="!text-primary-purple-105">Portalis Team</Typography>
          </div>
          <HiChevronRight className="text-primary-purple-105" />
        </div>
        <div className="flex flex-row items-center gap-2">
          <Typography weight="bold" className="text-[10px] basis-1/5">Floor Price</Typography>
          <Typography variant="text-base" weight="bold">123</Typography>
        </div>
        <div className="flex flex-row items-center gap-2">
          <Typography weight="bold" className="text-[10px] basis-1/5">Supply</Typography>
          <Typography variant="text-base" weight="bold">100</Typography>
        </div>
        <div className="flex flex-col">
          <Typography weight="bold" className="text-neutral-800 text-base">Description</Typography>
          <Typography className="text-neutral-800 text-base">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</Typography>
        </div>
        <Typography weight="bold" className="text-neutral-800 text-base">NFT List</Typography>
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
      <BottomArea>
        <Button size="large" variant="filled" className="rounded-lg">Buy Now</Button>
      </BottomArea>
    </main>
  )
}

export default CollectionDetail;
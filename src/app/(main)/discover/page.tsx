"use client"
import Typography from "@/components/atoms/Typography.atom";
import DiscoverEvent from "./DiscoverEvent.section";
import { useRouter, useSearchParams } from "next/navigation";
import Button from "@/components/atoms/Button.atom";
import DiscoverCollection from "./DiscoverCollection.section";
import { cn } from "@/utils/cn";

const Discover = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const activeTab = searchParams.get('t') || 'events';
  return (
    <main className="flex flex-col py-10 px-3 gap-2">
      <Typography variant="text-lg" weight="bold" className="text-center">Discover</Typography>
      <div className="flex flex-row justify-around items-center">
        <Button
          size="small"
          variant="tinted"
          onClick={() => activeTab !== 'events' && router.push('/discover?t=events')}
          className={cn("w-full border-b-2 border-transparent rounded-none",{" border-primary-purple-101": activeTab === 'events'})}
        >Events</Button>
        <Button
          size="small"
          variant="tinted"
          onClick={() => activeTab !== 'nfts' && router.push('/discover?t=nfts')}
          className={cn("w-full border-b-2 border-transparent rounded-none",{"border-primary-purple-101": activeTab === 'nfts'})}
        >Collections</Button>
      </div>
      {activeTab === 'events' && <DiscoverEvent />}
      {activeTab === 'nfts' && <DiscoverCollection />}
    </main>
  )
}

export default Discover;
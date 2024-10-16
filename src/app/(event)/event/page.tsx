"use client"
import Typography from "@/components/atoms/Typography.atom";
import { useRouter, useSearchParams } from "next/navigation";
import Button from "@/components/atoms/Button.atom";
import { cn } from "@/utils/cn";
import MyEvent from "./MyEvent.section";
import AssignedEvent from "./AssignedEvent.section";

const Discover = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const activeTab = searchParams.get('t') || 'self';
  return (
    <main className="flex flex-col px-3 gap-2 min-h-screen">
      <Typography variant="text-lg" weight="bold" className="text-center">My Events</Typography>
      <div className="flex flex-row justify-around items-center">
        <Button
          size="small"
          variant="tinted"
          onClick={() => activeTab !== 'self' && router.push('/event?t=self')}
          className={cn("w-full border-2 border-transparent rounded-xl",{" border-primary-purple-105": activeTab === 'self'})}
        >Created</Button>
        <Button
          size="small"
          variant="tinted"
          onClick={() => activeTab !== 'assigned' && router.push('/event?t=assigned')}
          className={cn("w-full border-2 border-transparent rounded-xl",{"border-primary-purple-105": activeTab === 'assigned'})}
        >Assigned</Button>
      </div>
      {activeTab === 'self' && <MyEvent />}
      {activeTab === 'assigned' && <AssignedEvent />}
    </main>
  )
}

export default Discover;
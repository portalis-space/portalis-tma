"use client"
import Typography from "@/components/atoms/Typography.atom";
import DiscoverEvent from "./DiscoverEvent.section";

const Discover = () => {
  return (
    <main className="flex flex-col px-3 gap-2 min-h-screen">
      <Typography variant="text-lg" weight="bold" className="text-center">Discover</Typography>
      <div className="flex flex-row justify-around items-center">
      </div>
      <DiscoverEvent />
    </main>
  )
}

export default Discover;
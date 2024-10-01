"use client"
import Button from "@/components/atoms/Button.atom";
import { useState } from "react";
import { cn } from "@/utils/cn";
import Typography from "@/components/atoms/Typography.atom";
import TicketCard from "@/components/molecules/TicketCard.molecule";

const MyTicket = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'available' | 'used'>('all')
  return (
    <main className="flex flex-col gap-3 pt-10 pb-20 px-3 min-h-screen">
      <Typography weight="bold" className="text-center">My Ticket</Typography>
      <section className="flex flex-row justify-around items-center">
        <Button
          size="small"
          variant="tinted"
          onClick={() => activeTab !== 'all' && setActiveTab('all')}
          className={cn("w-full border-b-2 border-transparent rounded-none",{" border-primary-purple-101": activeTab === 'all'})}
        >All</Button>
        <Button
          size="small"
          variant="tinted"
          onClick={() => activeTab !== 'available' && setActiveTab('available')}
          className={cn("w-full border-b-2 border-transparent rounded-none",{"border-primary-purple-101": activeTab === 'available'})}
        >Available</Button>
        <Button
          size="small"
          variant="tinted"
          onClick={() => activeTab !== 'used' && setActiveTab('used')}
          className={cn("w-full border-b-2 border-transparent rounded-none",{"border-primary-purple-101": activeTab === 'used'})}
        >Used</Button>
      </section>
      <section className="flex flex-col gap-3">
        <TicketCard />
        <TicketCard />
        <TicketCard />
        <TicketCard disabled />
      </section>
    </main>
  )
}

export default MyTicket;
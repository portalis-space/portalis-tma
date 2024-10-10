"use client"
import Typography from "@/components/atoms/Typography.atom";
import { useGetEventQuery } from "@/services/event/queries/GetEvent.query";
import { useMemo, useState } from "react";
import Button from "@/components/atoms/Button.atom";
import { cn } from "@/utils/cn";
import OwnedEligibleCollection from "./OwnedEligibleCollection.section";
import Loader from "@/components/molecules/Loader.molecule";

const EligibleAsset = ({ params: {id} }: { params: { id: string } }) => {
  const [activeTab, setActiveTab] = useState<'owned' | 'all'>('owned');

  const {isLoading: isGetEventLoading, data: eventQuery} = useGetEventQuery({id});
  const eventData = useMemo(() => eventQuery?.data, [eventQuery?.data]);

  return (
    <main className="flex flex-col gap-3 px-3 min-h-screen">
      <div className="bg-white bg-opacity-30 dark:bg-neutral-800 rounded-xl flex flex-col items-center p-2 w-full">
        <Typography weight="bold" variant="text-xs" className="!text-primary-purple-105 truncate w-full text-center py-2">{eventData?.attributes.title}</Typography> 
      </div>
      <div className="flex flex-col items-center">
        <Typography weight="bold">Eligible Assets</Typography>
        <Typography weight="light" variant="text-xs">Please select the eligible asset to generate the ticket.</Typography>
      </div>
      <div className="flex flex-row justify-around items-center">
        <Button
          size="small"
          variant="tinted"
          onClick={() => activeTab !== 'owned' && setActiveTab('owned')}
          className={cn("w-full border-b-2 border-transparent rounded-none",{" border-primary-purple-105": activeTab === 'owned'})}
        >Owned</Button>
        <Button
          size="small"
          variant="tinted"
          onClick={() => activeTab !== 'all' && setActiveTab('all')}
          className={cn("w-full border-b-2 border-transparent rounded-none",{"border-primary-purple-105": activeTab === 'all'})}
        >All</Button>
      </div>
      {
        isGetEventLoading ?
        <div className="flex flex-row items-center justify-center pt-2"><Loader /></div> :
        activeTab === 'owned' ?
          <OwnedEligibleCollection eventData={eventData} /> :
          <></>
      }
    </main>
  )
}

export default EligibleAsset;
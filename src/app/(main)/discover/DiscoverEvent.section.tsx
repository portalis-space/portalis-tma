"use client"
import Button from "@/components/atoms/Button.atom";
import Typography from "@/components/atoms/Typography.atom";
import EventCard from "@/components/molecules/EventCard.molecule";
import Loader from "@/components/molecules/Loader.molecule";
import Pagination from "@/components/molecules/Pagination.molecule";
import SearchWithDebounce from "@/components/molecules/SearchWithDebounce.molecule";
import { EventStatusType } from "@/services/event/Event.types";
import { useGetEventsQuery } from "@/services/event/queries/GetEvents.query";
import { cn } from "@/utils/cn";
import { useMemo, useState } from "react";

const DiscoverEvent = () => {
  const [activeTab, setActiveTab] = useState<EventStatusType>('ONGOING');
  const [searchText, setSearchText] = useState("");
  const [page, setPage] = useState(1);

  const {isLoading: isDiscoverEventsLoading, data: discoverEventsQuery} = useGetEventsQuery({page, size: 10, "sort[schedule]": 'asc', search: searchText, status: activeTab});
  const discoverEventsData = useMemo(() => discoverEventsQuery?.data, [discoverEventsQuery?.data]);
  const discoverEventsMeta = useMemo(() => discoverEventsQuery?.meta, [discoverEventsQuery?.meta]);

  return (
    <section className="flex flex-col gap-3">
      <div className="sticky top-0 z-50 backdrop-blur-lg bg-inherit p-3">
        <SearchWithDebounce setSearchText={setSearchText} setPage={setPage} />
      </div>
      <div className="flex flex-row justify-around items-center">
        <Button
          size="small"
          variant="tinted"
          onClick={() => activeTab !== 'ONGOING' && setActiveTab('ONGOING')}
          className={cn("w-full border-b-2 border-transparent rounded-none",{" border-primary-purple-105": activeTab === 'ONGOING'})}
        >Ongoing</Button>
        <Button
          size="small"
          variant="tinted"
          onClick={() => activeTab !== 'UPCOMING' && setActiveTab('UPCOMING')}
          className={cn("w-full border-b-2 border-transparent rounded-none",{"border-primary-purple-105": activeTab === 'UPCOMING'})}
        >Upcoming</Button>
        <Button
          size="small"
          variant="tinted"
          onClick={() => activeTab !== 'PAST' && setActiveTab('PAST')}
          className={cn("w-full border-b-2 border-transparent rounded-none",{"border-primary-purple-105": activeTab === 'PAST'})}
        >Past</Button>
      </div>
      <div className="flex flex-col w-full gap-2 px-3">
        {
          discoverEventsData?.map((event) => <EventCard key={event.id} event={event} />)
        }
        {isDiscoverEventsLoading && <Loader />}
      </div>
      {
        discoverEventsData && discoverEventsData.length > 0 ?
        <Pagination page={page} setPage={setPage} meta={discoverEventsMeta} /> :
        !isDiscoverEventsLoading && <Typography variant="text-xs" className="text-center">No Item Found.</Typography>
      }
    </section>
  )
}

export default DiscoverEvent;
"use client"
import Button from "@/components/atoms/Button.atom";
import Typography from "@/components/atoms/Typography.atom";
import EventCard from "@/components/molecules/EventCard.molecule";
import Loader from "@/components/molecules/Loader.molecule";
import Pagination from "@/components/molecules/Pagination.molecule";
import SearchWithDebounce from "@/components/molecules/SearchWithDebounce.molecule";
import { useAuthContext } from "@/contexts/Auth.context";
import { EventStatusType } from "@/services/event/Event.types";
import { useGetEventsQuery } from "@/services/event/queries/GetEvents.query";
import { cn } from "@/utils/cn";
import { useMemo, useState } from "react";

const MyEvent = () => {
  const {currentUserData} = useAuthContext();
  const [activeTab, setActiveTab] = useState<EventStatusType>('ONGOING');
  const [searchText, setSearchText] = useState("");
  const [page, setPage] = useState(1);

  const {isLoading: isEventsLoading, data: eventsQuery} = useGetEventsQuery({
    page,
    size: 10,
    "sort[schedule]": 'asc',
    search: searchText,
    owner: currentUserData?.id,
    status: [activeTab]
  });
  const eventsData = useMemo(() => eventsQuery?.data, [eventsQuery?.data]);
  const eventsMeta = useMemo(() => eventsQuery?.meta, [eventsQuery?.meta]);

  return (
    <section className="flex flex-col gap-3">
      <div className="w-full flex flex-col sticky top-0 pt-2 gap-2 z-50 bg-neutral-100 dark:bg-neutral-900">
        <SearchWithDebounce setSearchText={setSearchText} setPage={setPage} />
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
      </div>
      <div className="flex flex-col w-full gap-2">
        {
          eventsData?.map((event) => <EventCard key={event.id} event={event} />)
        }
        {isEventsLoading && <Loader />}
      </div>
      {
        eventsData && eventsData.length > 0 ?
        <Pagination page={page} setPage={setPage} meta={eventsMeta} /> :
        !isEventsLoading && <Typography variant="text-xs" className="text-center">No Item Found.</Typography>
      }
    </section>
  )
}

export default MyEvent;
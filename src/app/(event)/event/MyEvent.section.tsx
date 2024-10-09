"use client"
import Typography from "@/components/atoms/Typography.atom";
import EventCard from "@/components/molecules/EventCard.molecule";
import Loader from "@/components/molecules/Loader.molecule";
import Pagination from "@/components/molecules/Pagination.molecule";
import SearchWithDebounce from "@/components/molecules/SearchWithDebounce.molecule";
import { useAuthContext } from "@/contexts/Auth.context";
import { useGetEventsQuery } from "@/services/event/queries/GetEvents.query";
import { useMemo, useState } from "react";

const MyEvent = () => {
  const {currentUserData} = useAuthContext();
  const [searchText, setSearchText] = useState("");
  const [page, setPage] = useState(1);

  const {isLoading: isEventsLoading, data: eventsQuery} = useGetEventsQuery({
    page,
    size: 10,
    "sort[schedule]": 'desc',
    search: searchText,
    owner: currentUserData?.id,
  });
  const eventsData = useMemo(() => eventsQuery?.data, [eventsQuery?.data]);
  const eventsMeta = useMemo(() => eventsQuery?.meta, [eventsQuery?.meta]);
  return (
    <section className="flex flex-col gap-3">
      <SearchWithDebounce setSearchText={setSearchText} setPage={setPage} />
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
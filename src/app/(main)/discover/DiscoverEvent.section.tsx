"use client"
import Typography from "@/components/atoms/Typography.atom";
import EventCard from "@/components/molecules/EventCard.molecule";
import Loader from "@/components/molecules/Loader.molecule";
import Pagination from "@/components/molecules/Pagination.molecule";
import SearchWithDebounce from "@/components/molecules/SearchWithDebounce.molecule";
import { useGetEventsQuery } from "@/services/event/queries/GetEvents.query";
import { useMemo, useState } from "react";

const DiscoverEvent = () => {
  const [searchText, setSearchText] = useState("");
  const [page, setPage] = useState(1);

  const {isLoading: isDiscoverEventsLoading, data: discoverEventsQuery} = useGetEventsQuery({page, size: 10, "sort[schedule]": 'desc', search: searchText});
  const discoverEventsData = useMemo(() => discoverEventsQuery?.data, [discoverEventsQuery?.data]);
  const discoverEventsMeta = useMemo(() => discoverEventsQuery?.meta, [discoverEventsQuery?.meta]);

  return (
    <section className="flex flex-col gap-3">
      <div className="sticky top-0 z-50 backdrop-blur-lg bg-inherit p-3">
        <SearchWithDebounce setSearchText={setSearchText} setPage={setPage} />
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
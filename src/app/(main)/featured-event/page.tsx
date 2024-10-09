"use client"
import Typography from "@/components/atoms/Typography.atom";
import EventCard from "@/components/molecules/EventCard.molecule";
import Loader from "@/components/molecules/Loader.molecule";
import Pagination from "@/components/molecules/Pagination.molecule";
import SearchWithDebounce from "@/components/molecules/SearchWithDebounce.molecule";
import { useGetEventsQuery } from "@/services/event/queries/GetEvents.query";
import { useMemo, useState } from "react";

const FeaturedEvent = () => {
  const [searchText, setSearchText] = useState("");
  const [page, setPage] = useState(1);

  const {isLoading: isFeaturedEventsLoading, data: featuredEventsQuery} = useGetEventsQuery({page, size: 10, isHighlighted: true, search: searchText});
  const featuredEventData = useMemo(() => featuredEventsQuery?.data, [featuredEventsQuery?.data]);
  const featuredEventMeta = useMemo(() => featuredEventsQuery?.meta, [featuredEventsQuery?.meta]);

  return (
    <main className="flex flex-col gap-2 min-h-screen">
      <Typography variant="text-lg" weight="bold" className="text-center">All Featured Events</Typography>
      <div className="sticky top-0 z-50 backdrop-blur-lg bg-inherit p-3">
        <SearchWithDebounce setSearchText={setSearchText} setPage={setPage} />
      </div>
      <section className="flex flex-col w-full gap-3 mt-3 px-3">
        {
          featuredEventData?.map((event) => <EventCard key={event.id} event={event} />)
        }
        {isFeaturedEventsLoading && <Loader />}
      </section>
      {
        featuredEventData && featuredEventData.length > 0 ?
        <Pagination page={page} setPage={setPage} meta={featuredEventMeta} /> :
        !isFeaturedEventsLoading && <Typography variant="text-xs" className="text-center">No Item Found.</Typography>
      }
    </main>
  )
}

export default FeaturedEvent;
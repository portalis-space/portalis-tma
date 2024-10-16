import Typography from "@/components/atoms/Typography.atom";
import EventCard from "@/components/molecules/EventCard.molecule";
import Loader from "@/components/molecules/Loader.molecule";
import Pagination from "@/components/molecules/Pagination.molecule";
import SearchWithDebounce from "@/components/molecules/SearchWithDebounce.molecule";
import { useGetEventsQuery } from "@/services/event/queries/GetEvents.query";
import { useMemo, useState } from "react";

const AssignedEvent = () => {
  const [searchText, setSearchText] = useState("");
  const [page, setPage] = useState(1);

  const {isLoading: isEventsLoading, data: eventsQuery} = useGetEventsQuery({
    page,
    size: 10,
    "sort[schedule]": 'asc',
    search: searchText,
    scannerEvent: true
  });
  const eventsData = useMemo(() => eventsQuery?.data, [eventsQuery?.data]);
  const eventsMeta = useMemo(() => eventsQuery?.meta, [eventsQuery?.meta]);
  return (
    <section className="flex flex-col gap-3">
      <div className="flex flex-col sticky top-0 py-2 z-50 bg-neutral-100 dark:bg-neutral-900">
        <SearchWithDebounce setSearchText={setSearchText} setPage={setPage} />
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

export default AssignedEvent;
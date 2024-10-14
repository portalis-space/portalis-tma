"use client"
import Button from "@/components/atoms/Button.atom";
import Typography from "@/components/atoms/Typography.atom";
import EventCard from "@/components/molecules/EventCard.molecule";
import Loader from "@/components/molecules/Loader.molecule";
import Pagination from "@/components/molecules/Pagination.molecule";
import SearchWithDebounce from "@/components/molecules/SearchWithDebounce.molecule";
import { useGetEventsQuery } from "@/services/event/queries/GetEvents.query";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { useAccount } from "wagmi";

const ActiveEligibleEvent = () => {
  const router = useRouter();
  const {address, chainId, chain} = useAccount();
  const [searchText, setSearchText] = useState("");
  const [page, setPage] = useState(1);

  const {isLoading: isEligibleEventsLoading , data: eligibleEventsQuery} = useGetEventsQuery({
    page: address && chainId ? page : undefined,
    size: 10,
    eligibleEvent: true,
    wallet: address,
    chain: chain?.name ? (chain?.name === 'Ethereum' ? chain?.name?.substring(0,3)?.toLowerCase() : chain?.name?.toLowerCase()) : 'eth',
    type: 'evm',
    search: searchText,
    status: 'ONGOING'
  });
  const eligibleEventData = useMemo(() => eligibleEventsQuery?.data, [eligibleEventsQuery?.data]);
  const eligibleEventMeta = useMemo(() => eligibleEventsQuery?.meta, [eligibleEventsQuery?.meta]);

  return (
    <main className="flex flex-col gap-2 min-h-screen">
      <Typography variant="text-lg" weight="bold" className="text-center">All Active Eligible Events</Typography>
      <div className="sticky top-0 z-50 backdrop-blur-lg bg-inherit p-3">
        <SearchWithDebounce setSearchText={setSearchText} setPage={setPage} />
      </div>
      <section className="flex flex-col w-full gap-3 px-3">
        {isEligibleEventsLoading && <Loader />}
        {
          eligibleEventData ?
            eligibleEventData.map((event) => <EventCard key={event.id} event={event} />):
            !isEligibleEventsLoading &&
            <div className="flex flex-col items-center py-3 gap-2">
              <Typography variant="text-sm">You don&apos;t have any eligible event.</Typography>
              <Button variant="filled" onClick={() => router.push('/wallet')} className="w-1/2">Go to My Wallet</Button>
            </div>
        }
      </section>
      {
        eligibleEventData && eligibleEventData.length > 0 ?
        <Pagination page={page} setPage={setPage} meta={eligibleEventMeta} /> :
        !isEligibleEventsLoading && <Typography variant="text-xs" className="text-center">No Item Found.</Typography>
      }
    </main>
  )
}

export default ActiveEligibleEvent;
"use client"
import { useMemo, useState } from "react";
import Typography from "@/components/atoms/Typography.atom";
import TicketCard from "@/components/molecules/TicketCard.molecule";
import { useGetTicketsQuery } from "@/services/ticket/queries/GetTickets.query";
import { useAccount } from "wagmi";
import SearchWithDebounce from "@/components/molecules/SearchWithDebounce.molecule";
import Loader from "@/components/molecules/Loader.molecule";
import Pagination from "@/components/molecules/Pagination.molecule";

const MyTicket = () => {
  const {address} = useAccount();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  const {isLoading: isGetTicketLoading, data: getTicketsQuery} = useGetTicketsQuery({
    page,
    size: 10,
    search,
    walletAddress: address
  });
  const ticketsData = useMemo(() => getTicketsQuery?.data, [getTicketsQuery?.data]);
  const ticketsMeta = useMemo(() => getTicketsQuery?.meta, [getTicketsQuery?.meta]);

  return (
    <main className="flex flex-col gap-3 px-3 min-h-screen">
      <Typography weight="bold" className="text-center">My Ticket</Typography>
      <SearchWithDebounce setSearchText={setSearch} />
      <section className="flex flex-col gap-3">
        {
          isGetTicketLoading && <div className="flex items-center justify-center h-1/3 w-full"><Loader /></div>
        }
        {
           ticketsData && ticketsData.length > 0 &&
            <>
              { ticketsData.map((ticket, index) => <TicketCard key={index} ticket={ticket} disabled={ticket.attributes.status === 'USED'} />) }
              <Pagination page={page} setPage={setPage} meta={ticketsMeta} />
            </>
        }
        {
          !isGetTicketLoading && <Typography variant="text-xs" className="text-center">No ticket found.</Typography>
        }
      </section>
    </main>
  )
}

export default MyTicket;
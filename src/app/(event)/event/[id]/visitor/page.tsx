"use client"
import Typography from "@/components/atoms/Typography.atom";
import Loader from "@/components/molecules/Loader.molecule";
import Pagination from "@/components/molecules/Pagination.molecule";
import VisitorCard from "@/components/molecules/VisitorCard.molecule";
import { useGetVisitorDataQuery } from "@/services/event/queries/GetEventVisitorData.query";
import { useMemo, useState } from "react";

const EventVisitor = ({ params: {id} }: { params: { id: string } }) => {
  const [page, setPage] = useState(1);

  const {isLoading, data: visitorQuery} = useGetVisitorDataQuery({page, size: 10, event: id});
  const visitorData = useMemo(() => visitorQuery?.data, [visitorQuery?.data]);
  const visitorMeta = useMemo(() => visitorQuery?.meta, [visitorQuery?.meta]);

  return (
    <main className="flex flex-col px-3 gap-2 min-h-screen">
      <Typography variant="text-lg" weight="bold" className="text-center">Visitor</Typography>
      <Typography variant="text-sm" weight="bold" className="text-end">Total: {visitorMeta?.totalRecordCount}</Typography>
      <section className="flex flex-col w-full gap-3">
        {
          isLoading && <div className="flex flex-row items-center justify-center mt-10"><Loader /></div>
        }
        {
          visitorData?.map((visitor, index) => <VisitorCard visitor={visitor} key={index} />)
        }
        {
          visitorData && visitorData.length > 0 && <Pagination page={page} setPage={setPage} meta={visitorMeta} />
        }
      </section>
    </main>
  )
}

export default EventVisitor;
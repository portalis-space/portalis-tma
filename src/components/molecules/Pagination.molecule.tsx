"use client"
import { HiChevronLeft, HiChevronRight } from "react-icons/hi2";
import { APIMetaType } from "@/services/common/Common.types";
import Typography from "../atoms/Typography.atom";
import Button from "../atoms/Button.atom";

type Props = {
  page: number;
  setPage(page: number): void;
  meta?: APIMetaType;
}

const Pagination = ({page, setPage, meta}: Props) => {
  if (!page || !setPage || !meta) {
    return (<></>)
  }
  return (
    <section className="flex flex-row justify-center items-center gap-5 py-6">
      <Button
        variant="outlined"
        onClick={() => setPage(page - 1)}
        disabled={page === 1}
        className="w-16"
      >
        <HiChevronLeft />
      </Button>
      <Typography variant="text-xs" className="whitespace-nowrap">
        {meta?.startOf}-
        {((meta &&
          meta?.startOf + meta?.currentRecordCount) ||
          1) - 1}{" "}
        of {meta?.totalRecordCount}
      </Typography>        
      <Button
        variant="outlined"
        onClick={() => setPage(page + 1)}
        disabled={page === meta?.totalPage}
        className="w-16"
      >
        <HiChevronRight />
      </Button>
    </section>
  )
}

export default Pagination;
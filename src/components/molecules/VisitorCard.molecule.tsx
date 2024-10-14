import Typography from "@/components/atoms/Typography.atom";
import { EventVisitorType } from "@/services/event/Event.types";
import { format } from "date-fns";
import { HiUser } from "react-icons/hi2";

type Props = {
  visitor: EventVisitorType;
}

const VisitorCard = ({visitor}: Props) => {
  return (
    <div className="flex flex-row items-center justify-start gap-2 w-full bg-white bg-opacity-30 dark:bg-neutral-800 rounded px-3 py-2">
      <HiUser className="w-8 h-8 text-neutral-800 dark:text-neutral-200" />
      <div className="flex flex-col">
        <Typography variant="text-base" weight="bold">{visitor?.attributes?.user?.username}</Typography>
        <Typography variant="text-xs">Issued at: {visitor?.attributes?.ticket?.issuedAt ? format(visitor?.attributes?.ticket?.issuedAt, 'MMM dd, yyyy hh:mm:aa') : '-'}</Typography>
      </div>
    </div>
  )
}

export default VisitorCard;
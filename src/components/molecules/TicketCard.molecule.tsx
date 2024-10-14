import Typography from "@/components/atoms/Typography.atom";
import { TicketType } from "@/services/ticket/Ticket.types";
import { format } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import { HiChevronDoubleRight, HiMapPin, HiUserCircle } from "react-icons/hi2";

interface Props {
  disabled?: boolean;
  ticket?: TicketType;
}

const TicketCard: React.FC<Props> = ({disabled, ticket}) => {
  return (
    <div className="flex flex-col gap-0.5 w-full">
      <div className={`flex flex-row justify-between items-center bg-primary-purple-102 dark:bg-primary-purple-107 p-2 gap-2 ${disabled ? "!bg-neutral-400" : ''}`}>
        <div className="flex flex-row items-start justify-start gap-2 w-11/12 border-r-2 pr-3 border-primary-purple-105 border-dashed">
          <Image
            alt="eventImage"
            src={ticket?.attributes?.event?.banner || '/assets/event-placeholder.jpg'}
            width={960}
            height={540}
            className="w-1/3 h-[100px] lg:h-[160px] object-cover rounded-md"
          />
          <div className="flex flex-col w-2/3 gap-1 ">
            <Typography variant="text-xs" className="text-[10px] lg:text-xs truncate">
              {ticket?.attributes?.event?.startAt ? format(ticket?.attributes?.event?.startAt, "MMM dd, yyyy hh:mmaaa") : '-'} - {ticket?.attributes?.event?.startAt ? format(ticket?.attributes?.event?.startAt, "MMM dd, yyyy hh:mmaaa") : '-'}
            </Typography>
            <Typography weight="bold" variant="text-lg" className={`truncate ${disabled ? "" : "!text-primary-purple-105 dark:!text-primary-purple-101"}`}>{ticket?.attributes?.event?.title}</Typography>
            <div className="flex flex-row items-center gap-2">
            {
                  ticket?.attributes?.owner?.profilePics ?
                  <Image
                    alt="userImage"
                    src={ticket?.attributes?.owner?.profilePics}
                    width={200}
                    height={200}
                    className="w-4 h-4 object-cover rounded-full"
                  /> :
                  <HiUserCircle className="text-neutral-800 dark:text-neutral-200" />
                }
              <Typography weight="bold" variant="text-sm" className="truncate">{ticket?.attributes?.owner?.username}</Typography>
            </div>
            <div className="flex flex-row items-center gap-2 w-full">
              <HiMapPin className="text-primary-purple-105 w-4 h-4" />
              <Typography weight="bold" variant="text-xs" className="truncate w-full">{ticket?.attributes?.event?.location?.address}</Typography>
            </div>
          </div>
        </div>
        <Link href={`/ticket/${ticket?.id}`} className="w-1/12 h-auto">
          <HiChevronDoubleRight className="!text-primary-purple-105 dark:!text-primary-purple-101 w-full" />
        </Link>
      </div>
      <Typography variant="text-xs" className="text-[10px] lg:text-xs truncate">Transaction date: {ticket?.attributes?.issuedAt ? format(ticket.attributes.issuedAt, "MMM dd, yyyy hh:mmaaa") : '-'}</Typography>
    </div>
  )
}

export default TicketCard;
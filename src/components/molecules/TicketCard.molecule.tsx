import Typography from "@/components/atoms/Typography.atom";
import Image from "next/image";
import Link from "next/link";
import { HiChevronDoubleRight, HiMapPin, HiUserCircle } from "react-icons/hi2";

interface Props {
  disabled?: boolean;
}

const TicketCard: React.FC<Props> = ({disabled}) => {
  return (
    <div className="flex flex-col gap-0.5 w-full">
      <div className={`flex flex-row justify-between items-center bg-primary-purple-102 dark:bg-primary-purple-107 p-2 gap-2 ${disabled ? "!bg-neutral-400" : ''}`}>
        <div className="flex flex-row items-start justify-start gap-2 w-11/12 border-r-2 pr-3 border-primary-purple-105 border-dashed">
          <Image
            alt="eventImage"
            src={'/assets/event-placeholder.jpg'}
            width={960}
            height={540}
            className="w-1/3 h-[100px] lg:h-[160px] object-cover rounded-md"
          />
          <div className="flex flex-col w-2/3 gap-1 ">
            <Typography variant="text-xs" className="text-[10px] lg:text-xs truncate">Nov 11, 2024 11:00am - Nov 11, 2024 08:00pm</Typography>
            <Typography weight="bold" variant="text-lg" className={`truncate ${disabled ? "" : "!text-primary-purple-105 dark:!text-primary-purple-101"}`}>Decentralized with Portalis</Typography>
            <div className="flex flex-row items-center gap-2">
              <HiUserCircle className="text-primary-purple-105" />
              <Typography weight="bold" variant="text-sm" className="truncate">Portalis Team</Typography>
            </div>
            <div className="flex flex-row items-center gap-2">
              <HiMapPin className="text-primary-purple-105" />
              <Typography weight="bold" variant="text-xs" className="truncate">Jakarta Convention Center</Typography>
            </div>
          </div>
        </div>
        <Link href={'/ticket/1'} className="w-1/12 h-auto">
          <HiChevronDoubleRight className="!text-primary-purple-105 dark:!text-primary-purple-101 w-full" />
        </Link>
      </div>
      <Typography variant="text-xs" className="text-[10px] lg:text-xs truncate">Transaction date: Nov 10, 2024 08:00pm</Typography>
    </div>
  )
}

export default TicketCard;
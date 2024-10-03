import Image from "next/image";
import Typography from "../atoms/Typography.atom";
import { cn } from "@/utils/cn";
import { HiMapPin, HiUserCircle } from "react-icons/hi2";
import Link from "next/link";

interface Props {
  className?: string;
}

const EventCard = (props: Props) => {
  const {
    className = ''
  } = props;
  return (
      <div className={cn("flex flex-col rounded-lg px-2 py-4 bg-white dark:bg-neutral-500 bg-opacity-30 dark:bg-opacity-20 w-full", className)}>
        <Link href={'/event/1'}>
          <div className="flex flex-row gap-2 justify-start">
            <Image
              alt="eventImage"
              src={'/assets/event-placeholder.jpg'}
              width={960}
              height={540}
              className="w-1/3 h-[100px] lg:h-[160px] object-cover rounded-md"
            />
            <div className="flex flex-col w-2/3 gap-1">
              <Typography weight="bold"  className="!text-neutral-500 text-[10px] lg:text-xs truncate">Nov 11, 2024 11:00am - Nov 11, 2024 08:00pm</Typography>
              <Typography weight="bold" variant="text-lg" className="truncate text-primary-blue-900 dark:text-primary-purple-103">Decentralized with Portalis</Typography>
              <div className="flex flex-row items-center gap-2">
                <HiUserCircle className="text-neutral-800 dark:text-neutral-200" />
                <Typography variant="text-sm" weight="bold" className="truncate">Portalis Team</Typography>
              </div>
              <div className="flex flex-row items-center gap-2">
                <HiMapPin className="text-neutral-800 dark:text-neutral-200" />
                <Typography weight="bold" variant="text-sm" className="truncate">Jakarta Convention Center</Typography>
              </div>
            </div>
          </div>
        </Link>
      </div>
  )
}

export default EventCard;
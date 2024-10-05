import Image from "next/image";
import Typography from "../atoms/Typography.atom";
import { cn } from "@/utils/cn";
import { HiMapPin, HiStar, HiUserCircle } from "react-icons/hi2";
import Link from "next/link";

interface Props {
  className?: string;
}

const EventCard = (props: Props) => {
  const {
    className = ''
  } = props;
  return (
      <div className={cn("flex flex-col rounded-xl p-2 bg-neutral-50 dark:bg-neutral-950 w-full shadow-lg", className)}>
        <Link href={'/event/1'}>
          <div className="flex flex-col gap-2">
            <div className="relative rounded-xl overflow-hidden">
              <Image
                alt="eventImage"
                src={'/assets/event-placeholder.jpg'}
                width={960}
                height={540}
                className="w-full h-48 lg:h-64 object-cover rounded-xl"
              />
              <div className="absolute bottom-0 w-full bg-gradient-to-t backdrop-blur-sm from-white/30 to-white/[0.001] p-2 flex flex-row items-center justify-between">
                <Typography weight="light" variant="text-base" className="!text-neutral-50 w-full">Decentralized with Portalis</Typography>
                <div className="w-20 h-12 flex flex-col items-center bg-neutral-200 rounded-lg px-1">
                  <Typography variant="text-xs" className="!text-primary-purple-105">Nov 11</Typography>
                  <div className="bg-gradient-to-br from-primary-purple-105 to-primary-blue-600 w-full h-[28px] flex items-center justify-center rounded-lg">
                    <Typography variant="text-xs" className="!text-neutral-50">11am</Typography>
                  </div>
                </div>
              </div>
              <div className="absolute top-0 left-0 p-2 flex flex-row items-center">
                <div className="bg-neutral-50 dark:bg-neutral-950 rounded-xl p-2">
                  <Typography weight="semi-bold" className="text-[10px]">One Time</Typography>
                </div>
                <div className="bg-gradient-to-br from-primary-blue-500 via-primary-blue-700 to-primary-blue-500 rounded-full p-2">
                  <HiStar className="text-neutral-50 w-3 h-3" />
                </div>
              </div>
            </div>
            <div className="flex flex-col w-full gap-1">
              <div className="flex flex-row items-center gap-2">
                <HiUserCircle className="text-neutral-800 dark:text-neutral-200" />
                <Typography variant="text-sm" weight="bold" className="truncate">Portalis Team</Typography>
              </div>
              <div className="flex flex-row items-center gap-2">
                <HiMapPin className="text-neutral-800 dark:text-neutral-200" />
                <Typography weight="light" variant="text-sm" className="truncate">Jakarta Convention Center</Typography>
              </div>
            </div>
          </div>
        </Link>
      </div>
  )
}

export default EventCard;
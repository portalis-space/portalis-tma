import Typography from "@/components/atoms/Typography.atom";
import { EventVisitorType } from "@/services/event/Event.types";
import { format } from "date-fns";
import Image from "next/image";
import { HiUser } from "react-icons/hi2";

type Props = {
  visitor: EventVisitorType;
}

const VisitorCard = ({visitor}: Props) => {
  return (
    <div className="flex flex-row items-center justify-start gap-2 w-full bg-white bg-opacity-30 dark:bg-neutral-800 rounded px-3 py-2">
      {
        visitor?.attributes?.user?.profilePics ?
        <Image
          alt="userImage"
          src={visitor?.attributes?.user?.profilePics}
          width={100}
          height={100}
          className="w-8 h-8 object-cover rounded-full"
        /> :
        <HiUser className="w-8 h-8 text-neutral-800 dark:text-neutral-200" />
      }
      <div className="flex flex-col">
        <Typography variant="text-base" weight="bold">{visitor?.attributes?.user?.username}</Typography>
        <Typography variant="text-xs">Issued at: {visitor?.attributes?.ticket?.issuedAt ? format(visitor?.attributes?.ticket?.issuedAt, 'MMM dd, yyyy hh:mm:aa') : '-'}</Typography>
      </div>
    </div>
  )
}

export default VisitorCard;
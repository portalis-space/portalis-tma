import Image from "next/image";
import Typography from "../atoms/Typography.atom";
import { cn } from "@/utils/cn";
import Link from "next/link";

interface Props {
  className?: string;
}

const CollectionCard = (props: Props) => {
  const {
    className = ''
  } = props;
  return (
    <Link href={'/collection/1'}>
      <div className={cn("flex flex-col rounded-lg p-1 bg-neutral-50 dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-700 w-full shadow", className)}>
        <Image
          alt="eventImage"
          src={'/assets/collection-placeholder.jpg'}
          width={640}
          height={640}
          className="w-full h-auto lg:h-[300px] object-cover rounded-md"
        />
        <div className="flex flex-col w-full gap-1">
          <Typography weight="bold" variant="text-base" className="truncate text-primary-purple-108">Orange Bird With Sound Like a Thunder</Typography>
          <div className="flex flex-row items-center gap-2">
            <Typography className="text-[10px] basis-1/3">Floor Price</Typography>
            <Typography weight="bold" variant="text-sm" className="truncate">23</Typography>
          </div>
          <div className="flex flex-row items-center gap-2">
            <Typography className="text-[10px] basis-1/3">Supply</Typography>
            <Typography weight="bold" variant="text-sm" className="truncate">100</Typography>
          </div>
        </div>   
      </div>
    </Link>
  )
}

export default CollectionCard;
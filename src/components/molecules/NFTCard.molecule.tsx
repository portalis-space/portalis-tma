"use client"
import Image from "next/image";
import Typography from "../atoms/Typography.atom";
import { cn } from "@/utils/cn";
import Button from "../atoms/Button.atom";

interface Props {
  className?: string;
  owned?: boolean;
  onClick?: () => void;
  onCLickBuy?: () => void;
}

const NFTCard = (props: Props) => {
  const {
    className = '',
    owned = false,
    onClick,
    onCLickBuy
  } = props;
  return (
      <div className={cn("flex flex-col rounded-lg p-1 bg-neutral-50 dark:bg-neutral-950 border border-neutral-100 dark:border-neutral-900 w-full shadow", className)}>
        <div className="relative w-full overflow-hidden">
          <Image
            alt="eventImage"
            src={'/assets/nft-placeholder.jpg'}
            width={640}
            height={640}
            className="w-full h-auto aspect-square object-cover rounded-md"
            onClick={() => onClick ? onClick() : {}}
          />
          {owned && <div className="absolute w-20 h-10 bg-primary-blue-500 justify-end rotate-45 -right-7 -top-2">
            <Typography className="!text-primary-purple-105 font-bold text-center pt-6 text-[8px]">OWNED!</Typography>
          </div>}
          {!owned && <Button size="small" variant="filled" className="rounded-lg py-2 bg-primary-purple-106 absolute top-1 left-1" onClick={() => onCLickBuy ? onCLickBuy() : {}}>Buy</Button>}
        </div>
        <div className="flex flex-col w-full gap-1">
          <span role="button" onClick={() => onClick ? onClick() : {}}>
            <Typography weight="bold" variant="text-base" className="truncate text-primary-purple-108">NFT Bird Chirping</Typography>
          </span>
          <div className="flex flex-row items-center gap-2">
            <Typography variant="text-xs" className="truncate">Price</Typography>
            <Typography weight="bold" variant="text-sm" className="truncate">250</Typography>
          </div>
        </div>
      </div>
  )
}

export default NFTCard;
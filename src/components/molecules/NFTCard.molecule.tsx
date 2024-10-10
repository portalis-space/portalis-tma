"use client"
import Image from "next/image";
import Typography from "../atoms/Typography.atom";
import { cn } from "@/utils/cn";
import Button from "../atoms/Button.atom";
import { NFTAttributesType } from "@/services/web3/Web3.types";
import { handleImageBridge, shortenAddress } from "@/utils/helpers";
import { ClipboardButton } from "./ClipboardButton.molecule";
import { useState } from "react";

interface Props {
  className?: string;
  owned?: boolean;
  onClick?: () => void;
  onCLickBuy?: () => void;
  onClickUseOnCreation?: () => void;
  onClickOnGeneration?: () => void;
  nft?: NFTAttributesType;
}

const NFTCard = ({
  className = '',
  owned = false,
  onClick,
  onCLickBuy,
  onClickUseOnCreation,
  onClickOnGeneration,
  nft
}: Props) => {
  const [isImageError, setIsImageError] = useState(false);

  return (
      <div className={cn("flex flex-col rounded-lg p-2 bg-gradient-to-br from-primary-blue-600 via-primary-purple-105 to-primary-purple-107 w-full gap-3", className)}>
        <div className="relative w-full overflow-hidden">
          <Image
            alt="eventImage"
            src={handleImageBridge(nft?.image_uri, isImageError) || '/assets/nft-placeholder.jpg'}
            width={640}
            height={640}
            className="w-full h-auto aspect-square object-cover rounded-md"
            onClick={() => onClick ? onClick() : {}}
            onError={() => setIsImageError(true)}
          />
          {owned && <div className="absolute w-20 h-10 bg-primary-blue-500 justify-end rotate-45 -right-7 -top-2">
            <Typography className="!text-primary-purple-105 font-bold text-center pt-6 text-[8px]">OWNED!</Typography>
          </div>}
          {!owned && onCLickBuy && <Button size="small" variant="filled" className="rounded-lg py-2 bg-primary-purple-106 absolute top-1 left-1" onClick={() => onCLickBuy()}>Buy</Button>}
        </div>
        <div className="flex flex-col w-full gap-1">
          <span role="button" onClick={() => onClick ? onClick() : {}}>
            <Typography weight="bold" variant="text-base" className="truncate !text-primary-purple-101">{nft?.name || nft?.contract_name}</Typography>
          </span>
          <div className="flex flex-row items-center justify-between gap-2">
            <Typography weight="bold" variant="text-xs" className="truncate !text-primary-purple-101">{nft?.token_id ? shortenAddress(nft.contract_address) : ''}</Typography>
            <ClipboardButton textToCopy={nft?.contract_address ? nft.contract_address : 'not found'} />
          </div>
          <div className="flex flex-row items-center gap-1">
            <Typography variant="text-xs" className="truncate !text-primary-purple-101">#{nft?.token_id ? shortenAddress(nft.token_id) : ''}</Typography>
          </div>
          <div className="flex flex-row items-center gap-2">
            <Typography variant="text-xs" className="truncate !text-primary-purple-101 w-[28px]">Price</Typography>
            <Typography weight="bold" variant="text-xs" className="truncate !text-primary-purple-101">{nft?.mint_price}</Typography>
          </div>
        </div>
        {onClickUseOnCreation && <Button variant="outlined" onClick={onClickUseOnCreation}>Use</Button>}
        {onClickOnGeneration && <Button variant="outlined" onClick={onClickOnGeneration}>Generate Ticket</Button>}
      </div>
  )
}

export default NFTCard;
"use client"
import Image from "next/image";
import Typography from "../atoms/Typography.atom";
import { cn } from "@/utils/cn";
import { CollectionType } from "@/services/web3/Web3.types";
import { handleImageBridge } from "@/utils/strings.util";
import Modal from "./Modal.molecule";
import { useState } from "react";
import NFTCard from "./NFTCard.molecule";
import { useRouter } from "next/navigation";

interface Props {
  className?: string;
  collection?: CollectionType;
  withModal?: boolean;
  owned?: boolean;
  onClickUse?: (isFromOwnedList?: boolean, ownedAddress?: string) => void;
}

const CollectionCard = ({className = '', collection, withModal = false, owned = false, onClickUse}: Props) => {
  const router = useRouter();
  const [isNFTModalOpen, setIsNFTModalOpen] = useState(false);
  const [isImageError, setIsImageError] = useState(false);

  return (
    <>
      <div
        className={cn("flex flex-col rounded-lg p-2 bg-white bg-opacity-50 dark:bg-neutral-800 w-full shadow-lg", className)}
        onClick={() => withModal ? setIsNFTModalOpen(true) : router.push('/collection/1')}
      >
        <Image
          alt="eventImage"
          src={handleImageBridge(collection?.attributes?.logo_url, isImageError) || '/assets/collection-placeholder.jpg'}
          width={640}
          height={640}
          className="w-full h-auto lg:h-[300px] object-cover rounded-md"
          onError={() => setIsImageError(true)}
        />
        <div className="flex flex-col w-full gap-1">
          <Typography weight="extra-bold" variant="text-base" className="truncate !text-primary-blue-900 dark:!text-primary-blue-500">{collection?.attributes.contract_name}</Typography>
          <div className="flex flex-row items-center gap-2">
            <Typography className="text-[10px] basis-5/12">Floor Price</Typography>
            <Typography weight="bold" variant="text-sm" className="truncate">{collection?.attributes.floor_price}</Typography>
          </div>
          <div className="flex flex-row items-center gap-2">
            <Typography className="text-[10px] basis-5/12">Supply</Typography>
            <Typography weight="bold" variant="text-sm" className="truncate">{collection?.attributes.items_total}</Typography>
          </div>
          <div className="flex flex-row items-center gap-2">
            <Typography className="text-[10px] basis-5/12">Owned</Typography>
            <Typography weight="bold" variant="text-sm" className="truncate">{collection?.attributes.owns_total}</Typography>
          </div>
        </div>   
      </div>
      {
        withModal &&
        <Modal isOpen={isNFTModalOpen} onClose={() => setIsNFTModalOpen(false)}>
          <Typography variant="text-sm" className="text-center">{collection?.attributes.contract_name}</Typography>
          <Typography variant="text-sm" weight="bold" className="text-center">{owned ? 'Owned ': ''}NFTs</Typography>
          <div className="flex flex-row flex-wrap mt-3">
            {
              collection?.attributes?.assets?.map((nft) =>
                <div className="p-1 w-1/2 lg:w-1/3" key={collection.attributes.contract_address}>
                  <NFTCard
                    nft={nft}
                    owned={owned}
                    onClickUse={
                      onClickUse && nft.contract_address ?
                      () => {
                        onClickUse(true, nft.contract_address);
                        setIsNFTModalOpen(false);
                      } : undefined
                    }
                  />
                </div>
              )
            }
          </div>
        </Modal>
      }
    </>
  )
}

export default CollectionCard;
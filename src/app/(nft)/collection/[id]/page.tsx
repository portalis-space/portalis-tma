"use client"
import Button from "@/components/atoms/Button.atom";
import Typography from "@/components/atoms/Typography.atom";
import { ClipboardButton } from "@/components/molecules/ClipboardButton.molecule";
import Loader from "@/components/molecules/Loader.molecule";
import NFTCard from "@/components/molecules/NFTCard.molecule";
import { useGetCollectionQuery } from "@/services/web3/queries/GetCollection.query";
import { useGetNFTsByContractQuery } from "@/services/web3/queries/GetNFTsByContract.query";
import { handleImageBridge, shortenAddress } from "@/utils/helpers";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { HiGift, HiOutlineQueueList } from "react-icons/hi2";
import { useAccount } from "wagmi";

const CollectionDetail = ({ params: {id} }: { params: { id: string } }) => {
  const router = useRouter();
  const {chain} = useAccount();

  const [isImageError, setIsImageError] = useState(false);
  const isDrop = false;

  const {isLoading: isCollectionQueryLoading, data: collectionQuery} = useGetCollectionQuery({
    contractAddress: id,
    chain: chain?.name ? (chain.name === 'Ethereum' ? chain.name.substring(0,3)?.toLowerCase() : chain.name.toLowerCase()) : undefined,
    type: 'evm' // TODO: change when TON available
  })
  const collectionData = useMemo(() => collectionQuery?.data, [collectionQuery?.data]);

  const {isLoading: isNFTsByContractLoading, data: getNFTsByContractQuery} = useGetNFTsByContractQuery({
    page: 1,
    size: 12,
    chain: chain?.name ? (chain.name === 'Ethereum' ? chain.name?.substring(0,3)?.toLowerCase() : chain.name?.toLowerCase()) : undefined,
    type: 'evm', // TODO: Change when TON available
    contractAddress: id
  });
  const NFtsData = useMemo(() => getNFTsByContractQuery?.data, [getNFTsByContractQuery?.data]);

  if (isCollectionQueryLoading) {
    return (
      <main className="flex flex-col pb-16 gap-2 min-h-screen items-center justify-center">
        <Loader />
      </main>
    )
  }

  return (
    <main className="flex flex-col pb-16 gap-2 min-h-screen">
      <section className="px-3 w-full relative">
        <Image
          alt="collection image"
          src={handleImageBridge(collectionData?.attributes?.logo_url, isImageError) || '/assets/collection-placeholder.jpg'}
          width={640}
          height={640}
          className="w-full h-auto aspect-square object-cover rounded-lg"
          onError={() => setIsImageError(true)}
        />
        {
          isDrop &&
          <div className="absolute top-1 right-4 flex flex-row px-3 py-1 gap-1 items-center rounded bg-gradient-to-br from-primary-purple-105 via-primary-purple-108 to-primary-purple-105 text-neutral-50">
            <HiGift />
            <Typography variant="text-xs" weight="bold" className="!text-neutral-50">Drop</Typography>
          </div>
        }
      </section>
      <section className="flex flex-col gap-3 px-3">
        <Typography variant="text-2xl" weight="extra-bold" className="bg-gradient-to-b from-primary-purple-107 via-primary-blue-600 to-primary-purple-105 inline-block !text-transparent bg-clip-text">{collectionData?.attributes.name}</Typography>
        <div className="flex flex-row items-center justify-between p-4 gap-1 rounded-lg bg-neutral-200 dark:bg-neutral-800 flex-auto">
          <div className="flex flex-row items-center gap-2">
            <HiOutlineQueueList className="text-primary-purple-105"/>
            <Typography variant="text-xs" weight="bold" className="!text-primary-purple-105">{shortenAddress(collectionData?.attributes?.contract_address || '-')}</Typography>
          </div>
          <ClipboardButton textToCopy={collectionData?.attributes?.contract_address || '-'} />
        </div>
        <div className="flex flex-row items-center gap-2">
          <Typography weight="bold" className="text-[10px] basis-1/5">Floor Price</Typography>
          <Typography variant="text-base" weight="bold">{collectionData?.attributes?.floor_price} {collectionData?.attributes.price_symbol}</Typography>
        </div>
        <div className="flex flex-row items-center gap-2">
          <Typography weight="bold" className="text-[10px] basis-1/5">Supply</Typography>
          <Typography variant="text-base" weight="bold">{collectionData?.attributes?.items_total}</Typography>
        </div>
        <div className="flex flex-col">
          <Typography weight="bold" className="text-neutral-800 text-base">Description</Typography>
          <Typography className="text-neutral-800 text-base">{collectionData?.attributes?.description}</Typography>
        </div>
        {collectionData?.attributes?.website && <Button variant="outlined" onClick={() => router.push(collectionData.attributes.website)}>More Information</Button>}
        <Typography weight="bold" className="text-neutral-800 text-base">NFT List</Typography>
        {
          isNFTsByContractLoading && <div className="flex items-center justify-center h-1/3 w-full"><Loader /></div>
        }
        {
          NFtsData && NFtsData.length > 0 && (
            <div className="flex flex-row flex-wrap">
            {
              NFtsData.map((nft, index) => 
                <div className="p-1 w-1/2 lg:w-1/3" key={index}>
                  <NFTCard nft={nft.attributes} />
                </div>
              )
            } 
            </div>
          )
        }
      </section>
    </main>
  )
}

export default CollectionDetail;
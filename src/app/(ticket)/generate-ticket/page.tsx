"use client"
import Button from "@/components/atoms/Button.atom";
import Typography from "@/components/atoms/Typography.atom";
import BottomArea from "@/components/molecules/BottomArea.molecule";
import { useGetEventQuery } from "@/services/event/queries/GetEvent.query";
import { useGetOwnedNFTsQuery } from "@/services/web3/queries/GetOwnedNFTs.query";
import { handleImageBridge } from "@/utils/helpers";
import { format } from "date-fns";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { HiMapPin } from "react-icons/hi2";
import { useAccount } from "wagmi";

const GenerateTicket = () => {
  const router = useRouter();
  const searchParams = useSearchParams()
  const eventId = searchParams.get('id');
  const contractAddress = searchParams.get('address');
  const { address, chain } = useAccount();

  const [isImageError, setIsImageError] = useState(false);

  const {data: eventQuery} = useGetEventQuery({id: eventId || ''});
  const eventData = useMemo(() => eventQuery?.data, [eventQuery?.data]);

  const {data: getOwnedNFTsQuery} = useGetOwnedNFTsQuery({
    page: 1,
    size: 1,
    walletAddress: contractAddress ? address : undefined,
    chain: chain?.name === 'Ethereum' ? chain?.name?.substring(0,3)?.toLowerCase() : chain?.name?.toLowerCase(),
    type: 'evm', // TODO: Change when TON available
    contractAddress: contractAddress ? [contractAddress] : undefined
  });
  const ownedNFtsData = useMemo(() => getOwnedNFTsQuery?.data[0], [getOwnedNFTsQuery?.data]);


  if (!eventId || !contractAddress) {
    return (
      <main className="flex flex-col items-center justify-center min-h-screen">
        <Typography variant="text-lg" weight="bold" className="text-center">It seems you&apos;ve lost!</Typography>
        <Button variant="tinted" className="min-w-max text-center !text-primary-purple-105" onClick={() => router.replace('/')}>Go Home</Button>
      </main>
    )
  }

  return (
    <main className="flex flex-col pb-16 gap-2 min-h-screen">
      <Typography variant="text-lg" weight="bold" className="text-center">Generate Ticket</Typography>
      <section className="px-3 lg:px-10">
        <div className="flex flex-col w-full gap-3 bg-neutral-200 dark:bg-neutral-800 shadow dark:shadow-neutral-700 p-3">
          <Typography variant="text-sm" weight="bold" className="text-center">{ownedNFtsData?.attributes.assets[0]?.name}</Typography>
          <div className="rounded-lg px-10">
            <Image
              alt="nftImage"
              src={handleImageBridge(ownedNFtsData?.attributes.assets[0]?.image_uri, isImageError) || '/assets/nft-placeholder.jpg'}
              width={640}
              height={640}
              className="w-full h-auto aspect-square object-cover rounded-lg"
              onError={() => setIsImageError(true)}
            />
          </div>
          <Typography variant="text-xs" className="text-center border-b-2 border-neutral-500 border-dashed pb-3 mb-3">This NFT will be used for:</Typography>
          <Typography variant="text-sm" weight="bold" className="text-center !text-primary-purple-105">{eventData?.attributes.title}</Typography>
          <Image
            alt="eventImage"
            src={eventData?.attributes?.banner ||  '/assets/event-placeholder.jpg'}
            width={960}
            height={540}
            className="w-full h-auto object-cover rounded-lg"
          />
          <div className="flex flex-row items-start gap-2">
            <div className="w-10 h-10 flex flex-col items-center bg-primary-purple-107 rounded-lg">
              <Typography weight="bold" className="text-neutral-50 text-[10px]">{eventData?.attributes?.startAt ? format(eventData.attributes.startAt, 'LLL') : '-'}</Typography>
              <Typography variant="text-xs" weight="bold" className="text-neutral-50 bg-primary-purple-105 rounded px-2.5 py-0.5">{eventData?.attributes?.startAt ? format(eventData.attributes.startAt, 'dd') : '-'}</Typography>
            </div>
            <div className="flex flex-col">
            <Typography weight="bold" className="text-sm lg:text-base">{eventData?.attributes?.startAt ? format(eventData.attributes.startAt, 'LLL dd, y hh:mmaaa') : '-'} -</Typography>
            <Typography weight="bold" className="text-sm lg:text-base">{eventData?.attributes?.endAt ? format(eventData.attributes.endAt, 'LLL dd, y hh:mmaaa') : '-'}</Typography>
            </div>
          </div>
          <div className="flex flex-row items-start gap-2">
            <div className="w-10 h-10 flex flex-col items-center justify-center bg-primary-purple-107 text-primary-purple-105 rounded-lg">
              <HiMapPin className="w-6 h-6 mx-2 text-primary-purple-105" />
            </div>
            <div className="flex flex-col">
              <Typography className="text-sm lg:text-base">{eventData?.attributes.location.address}</Typography>
            </div>
          </div>
        </div>
      </section>
      <BottomArea>
        <Button size="large" variant="filled" className="rounded-full bg-primary-purple-106" onClick={() => router.push('/ticket/1')}>Generate Ticket</Button>
      </BottomArea>
    </main>
  )
}

export default GenerateTicket;
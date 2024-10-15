"use client"
import Button from "@/components/atoms/Button.atom";
import Typography from "@/components/atoms/Typography.atom";
import BottomArea from "@/components/molecules/BottomArea.molecule";
import Loader from "@/components/molecules/Loader.molecule";
import Modal from "@/components/molecules/Modal.molecule";
import { useGetEventQuery } from "@/services/event/queries/GetEvent.query";
import useGenerateTicket from "@/services/ticket/mutations/GenerateTicket.query";
import { useGetOwnedNFTsQuery } from "@/services/web3/queries/GetOwnedNFTs.query";
import { handleChain, handleImageBridge } from "@/utils/helpers";
import { format } from "date-fns";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useMemo, useState } from "react";
import { HiMapPin } from "react-icons/hi2";
import { useAccount } from "wagmi";

const GenerateTicket = () => {
  const router = useRouter();
  const searchParams = useSearchParams()
  const eventId = searchParams.get('id');
  const contractAddress = searchParams.get('address');
  const token = searchParams.get('token');
  const { address, chain } = useAccount();

  const [isImageError, setIsImageError] = useState(false);
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const [isGenerateTicketLoading, setIsGenerateTicketLoading] = useState(false);
  const [generateTicketErrMessage, setGenerateTicketErrorMessage] = useState<string | undefined>(undefined);

  const {data: eventQuery} = useGetEventQuery({id: eventId || ''});
  const eventData = useMemo(() => eventQuery?.data, [eventQuery?.data]);

  const {data: getOwnedNFTsQuery} = useGetOwnedNFTsQuery({
    page: 1,
    size: 1,
    walletAddress: contractAddress ? address : undefined,
    chain: handleChain(chain?.name),
    type: 'evm', // TODO: Change when TON available
    contractAddress: contractAddress ? [contractAddress] : undefined
  });
  const ownedNFtsData = useMemo(() => getOwnedNFTsQuery?.data[0], [getOwnedNFTsQuery?.data]);
  const pointedNFT = useMemo(() => ownedNFtsData?.attributes.assets.find((nft) => nft.token_id === token), [ownedNFtsData?.attributes.assets, token]);

  const generateTicket = useGenerateTicket({
    onSuccess: (res) => {
      router.replace(`/ticket/${res.data.attributes._id}`)
    },
    onError: (err) => {
      setGenerateTicketErrorMessage(err.errors[0].detail)
    },
    onMutate: () => {
      setIsGenerateTicketLoading(true);
    },
    onSettled: () => {
      setIsGenerateTicketLoading(false);
    }
  });

  const handleGenerate = useCallback(() => {
    if (contractAddress && chain?.name && eventId && token && address) generateTicket.mutate({
      contractAddress,
      chain: handleChain(chain?.name) || '',
      event: eventId,
      token,
      type: 'evm', // TODO: Change when TON available,
      walletAddress: address
    })
  }, [address, chain?.name, contractAddress, eventId, generateTicket, token])

  if (!eventId || !contractAddress || !token) {
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
          <div className="flex flex-col items-center">
            <Typography variant="text-sm" className="text-center">#{pointedNFT?.token_id}</Typography>
            <Typography variant="text-sm" weight="bold" className="text-center">{pointedNFT?.name}</Typography>
          </div>
          <div className="rounded-lg px-10">
            <Image
              alt="nftImage"
              src={handleImageBridge(pointedNFT?.image_uri, isImageError) || '/assets/nft-placeholder.jpg'}
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
        <Button size="large" variant="filled" className="rounded-full bg-primary-purple-106" onClick={() => setIsConfirmationModalOpen(true)}>Generate Ticket</Button>
      </BottomArea>
      <Modal isOpen={isConfirmationModalOpen} onClose={() => setIsConfirmationModalOpen(false)}>
        <div className="flex flex-col gap-5 items-center">
          <div className="flex flex-col items-center">
            <Typography variant="text-sm">You attempted to generate ticket</Typography>
            <Typography variant="text-base" weight="bold">Are You Sure?</Typography>
          </div>
          {generateTicketErrMessage && <Typography variant="text-xs" className="text-center !text-red-500">{generateTicketErrMessage}</Typography>}
          <Button variant="outlined" onClick={handleGenerate} disabled={isGenerateTicketLoading}>{isGenerateTicketLoading ? <Loader /> : 'Generate Now'}</Button>
          <Button variant="outlined" onClick={() => setIsConfirmationModalOpen(false)}>Cancel</Button>
        </div>
      </Modal>
    </main>
  )
}

export default GenerateTicket;
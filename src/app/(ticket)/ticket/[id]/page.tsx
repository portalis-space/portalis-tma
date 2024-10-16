"use client"
import Button from "@/components/atoms/Button.atom";
import Typography from "@/components/atoms/Typography.atom";
import BottomArea from "@/components/molecules/BottomArea.molecule";
import { ClipboardButton } from "@/components/molecules/ClipboardButton.molecule";
import Loader from "@/components/molecules/Loader.molecule";
import Modal from "@/components/molecules/Modal.molecule";
import useSocket from "@/hooks/useSocket";
import useGenerateQR from "@/services/ticket/mutations/GenerateQR.query";
import { useGetTicketKey, useGetTicketQuery } from "@/services/ticket/queries/GetTicket.query";
import { useGetTicketsKey } from "@/services/ticket/queries/GetTickets.query";
import { shortenAddress } from "@/utils/helpers";
import { useQueryClient } from "@tanstack/react-query";
import { differenceInMilliseconds, format, fromUnixTime } from "date-fns";
import { useQRCode } from "next-qrcode";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { HiCheckCircle, HiChevronRight, HiMapPin } from "react-icons/hi2";
import { useAccount } from "wagmi";

const TicketDetail = ({ params: {id} }: { params: { id: string } }) => {
  const { scanListenerData } = useSocket();
  const { address } = useAccount();
  const router = useRouter();
  const { Canvas } = useQRCode();
  const queryClient = useQueryClient();

  const [QR, setQR] = useState('');
  const [QRErrorMessage, setQRErrorMessage] = useState<string | undefined>(undefined);
  const [isGenerateQRLoading, setIsGenerateQRLoading] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  const {isLoading: isTicketQueryLoading, data: ticketQuery} = useGetTicketQuery({id});
  const ticketData = useMemo(() => ticketQuery?.data, [ticketQuery?.data]);

  const generateQR = useGenerateQR({
    onSuccess: (res) => {
      setQRErrorMessage(undefined);
      setQR(res?.data.attributes.qrString);

      // Calculate how much time is left until expiration using date-fns
      const now = new Date();
      const expiresAt = new Date(fromUnixTime(res.data.attributes.expiredAt));
      const timeUntilExpiration = differenceInMilliseconds(expiresAt, now);

      // Clear any existing timeout before setting a new one
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }

      // Schedule the next generation request based on the expiration time
      if (timeUntilExpiration > 0) {
        timeoutRef.current = setTimeout(() => {
          generateQR.mutate({ticket: id, walletAddress: address as string}); // Re-trigger the mutation when QR expires
        }, timeUntilExpiration);
      }
    },
    onError: (err) => {
      setQRErrorMessage(err.errors[0].detail)
    },
    onMutate: () => {
      setQRErrorMessage(undefined);
      setIsGenerateQRLoading(true);
    },
    onSettled: () => {
      setIsGenerateQRLoading(false);
    }
  });

  const handleGenerateQR = useCallback(() => {
    if (id && address)
      generateQR.mutate({ticket: id, walletAddress: address as string});
  }, [address, generateQR, id]);

  const handleCloseQR = useCallback(() => {
    setQR(''); // Clear the QR
    // Clear the timeout when closing the QR
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);

  useEffect(() => {
    if (scanListenerData?.participant?.ticket?.ticketNumber && ticketData?.attributes?.ticketNumber && scanListenerData.participant.ticket.ticketNumber === ticketData.attributes.ticketNumber) {
      setIsSuccessModalOpen(true);
      setQR('');
      queryClient.invalidateQueries({queryKey: [useGetTicketKey]});
      queryClient.invalidateQueries({queryKey: [useGetTicketsKey]});
    }
  }, [queryClient, scanListenerData, ticketData?.attributes.ticketNumber])

  if (isTicketQueryLoading) {
    return (
      <main className="flex flex-col pb-16 gap-2 min-h-screen items-center justify-center">
        <Loader />
      </main>
    )
  }

  return (
    <main className="flex flex-col pb-16 gap-2 min-h-screen">
      <section className="px-3 lg:px-10">
        <div className="flex flex-col w-full gap-3 bg-primary-purple-102 dark:bg-primary-purple-108 p-3 rounded-xl">
          <div className="flex flex-col gap-2">
            <Typography variant="text-xs" className="text-[10px] lg:text-xs truncate">Transaction date: {ticketData?.attributes.issuedAt ? format(ticketData?.attributes.issuedAt, 'MMM dd, yyyy hh:mmaaa') : '-'}</Typography>
            <div className="flex flex-row items-center gap-2">
              <Typography weight="light" className="text-end text-[10px]">ID: {ticketData?.attributes?.ticketNumber}</Typography>
              <ClipboardButton textToCopy={ticketData?.attributes?.ticketNumber ||'-'} />
            </div>
          </div>
          <div className="flex flex-row items-center justify-between">
            <Typography variant="text-lg" weight="bold" className="text-center">Ticket Detail</Typography>
            <div className="bg-primary-blue-500 px-2 py-1 rounded-lg">
              <Typography variant="text-xs" className="!text-primary-purple-106">{ticketData?.attributes?.status}</Typography>
            </div>
          </div>
          <Image
            alt="eventImage"
            src={ticketData?.attributes?.event?.banner || '/assets/event-placeholder.jpg'}
            width={960}
            height={540}
            className="w-full h-auto object-cover rounded-lg"
          />
          <Typography variant="text-sm" weight="bold" className="text-center !text-primary-purple-105">{ticketData?.attributes?.event.title}</Typography>
          <div className="flex flex-row items-start gap-2">
            <div className="w-10 h-10 flex flex-col items-center bg-primary-purple-107 rounded-lg">
              <Typography weight="bold" className="text-neutral-50 text-[10px]">{ticketData?.attributes?.event?.startAt ? format(ticketData?.attributes?.event?.startAt, "MMM") : '-'}</Typography>
              <Typography variant="text-xs" weight="bold" className="text-neutral-50 bg-primary-purple-105 rounded px-2.5 py-0.5">{ticketData?.attributes?.event?.startAt ? format(ticketData?.attributes?.event?.startAt, "dd") : '-'}</Typography>
            </div>
            <div className="flex flex-col">
              <Typography weight="bold" className="text-neutral-800 text-sm lg:text-base">{ticketData?.attributes?.event?.startAt ? format(ticketData?.attributes?.event?.startAt, "MMM dd, yyyy hh:mmaaa") : '-'} -</Typography>
              <Typography weight="bold" className="text-neutral-800 text-sm lg:text-base">{ticketData?.attributes?.event?.endAt ? format(ticketData?.attributes?.event?.endAt, "MMM dd, yyyy hh:mmaaa") : '-'}</Typography>
            </div>
          </div>
          <div className="flex flex-row items-start gap-2 ">
            <div className="w-10 h-10 flex flex-col items-center justify-center bg-primary-purple-107 text-primary-purple-105 rounded-lg">
              <HiMapPin className="w-6 h-6 mx-2 text-primary-purple-105" />
            </div>
            <div className="flex flex-col">
              <Typography className="text-neutral-800 text-sm lg:text-base">{ticketData?.attributes?.event?.location?.address}</Typography>
            </div>
          </div>
          <div className="border-b-2 border-primary-purple-109 border-dashed w-full" />
          <Typography variant="text-xs" className="text-center">NFT used:</Typography>
          <div className="flex flex-row items-center gap-2">
            <Typography variant="text-sm" weight="bold" className="text-center">{shortenAddress(ticketData?.attributes?.contractAddress)}</Typography>
            <ClipboardButton textToCopy={ticketData?.attributes?.contractAddress || '-'} />
          </div>
          <div className="flex flex-row items-center gap-2">
            <Typography variant="text-sm" weight="bold" className="text-center">#{ticketData?.attributes?.token}</Typography>
            <ClipboardButton textToCopy={ticketData?.attributes?.token || '-'} />
          </div>
          <div className="flex flex-row items-center justify-between bg-primary-purple-105 p-2 rounded-lg" role="button" onClick={() => router.push(`/collection/${ticketData?.attributes?.contractAddress}`)}>
            <Typography variant="text-xs" weight="bold" className="!text-neutral-200">Go to Collection</Typography>
            <HiChevronRight className="!text-neutral-200" />
          </div>
        </div>
      </section>
      <BottomArea>
        {QRErrorMessage && <Typography variant="text-xs" className="!text-red-500 bg-neutral-200 bg-opacity-15 backdrop-blur self-center max-w-min text-nowrap p-2 rounded">{QRErrorMessage}</Typography>}
        {
          QR && !isGenerateQRLoading &&
          <div className="w-full md:w-1/2 lg:w-1/3 h-auto rounded-lg mb-3 mx-auto my-0 z-50 px-3 flex items-center justify-center">
            <Canvas
              text={QR}
              options={{
                errorCorrectionLevel: 'M',
                margin: 3,
                scale: 4,
                width: 300,
              }}
            />
          </div>
        }
        {
          ticketData?.attributes.status !== 'USED' && (
            address ? 
            <Button
              size="large"
              variant="filled"
              className="rounded-full bg-primary-purple-106"
              onClick={QR !== '' ? handleCloseQR : handleGenerateQR}
            >
                {isGenerateQRLoading ? <Loader /> : QR ? 'Close' : 'Show QR'}
            </Button> : 
            <Button
              size="large"
              variant="filled"
              className="rounded-full bg-primary-purple-106"
              onClick={() => router.push('/wallet')}
            >
                Connect Wallet To Generate QR
            </Button>
          )
        }
      </BottomArea>
      <Modal isOpen={isSuccessModalOpen} onClose={() => setIsSuccessModalOpen(false)}>
        <div className="flex flex-col gap-5 items-center justify-center py-20">
          <div className="flex flex-col items-center w-full">
            <HiCheckCircle className="text-primary-purple-105 w-1/2 h-auto animate-bounce" />
            <Typography variant="text-xl" weight="bold">Scan Successful!</Typography>
          </div>
          <Button variant="outlined" onClick={() => router.push('/ticket')}>Go To My Ticket</Button>
          <Button variant="outlined" onClick={() => setIsSuccessModalOpen(false)}>Close</Button>
        </div>
      </Modal>
    </main>
  )
}

export default TicketDetail;
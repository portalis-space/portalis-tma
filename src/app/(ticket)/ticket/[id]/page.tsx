"use client"
import Button from "@/components/atoms/Button.atom";
import Typography from "@/components/atoms/Typography.atom";
import BottomArea from "@/components/molecules/BottomArea.molecule";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { HiChevronRight, HiMapPin } from "react-icons/hi2";

const TicketDetail = () => {
  const router = useRouter();
  const [viewQR, setViewQR] = useState(false);
  return (
    <main className="flex flex-col pb-16 gap-2 min-h-screen">
      <section className="px-3 lg:px-10">
        <div className="flex flex-col w-full gap-3 bg-primary-purple-102 dark:bg-primary-purple-108 p-3 rounded-xl">
          <div className="flex flex-row items-center justify-between">
            <Typography variant="text-xs" className="text-[10px] lg:text-xs truncate">Transaction date: Nov 10, 2024 08:00pm</Typography>
            <Typography weight="light" className="text-end text-[10px]">ID: TXT-839912</Typography>
          </div>
          <div className="flex flex-row items-center justify-between">
            <Typography variant="text-lg" weight="bold" className="text-center">Ticket Detail</Typography>
            <div className="bg-primary-blue-500 px-2 py-1 rounded-lg">
              <Typography variant="text-xs" className="!text-primary-purple-106">Available</Typography>
            </div>
          </div>
          <Image
            alt="eventImage"
            src={'/assets/event-placeholder.jpg'}
            width={960}
            height={540}
            className="w-full h-auto object-cover rounded-lg"
          />
          <Typography variant="text-sm" weight="bold" className="text-center !text-primary-purple-105">Decentralized with Portalis and Team</Typography>
          <div className="flex flex-row items-start gap-2">
            <div className="w-10 h-10 flex flex-col items-center bg-primary-purple-107 rounded-lg">
              <Typography weight="bold" className="text-neutral-50 text-[10px]">Nov</Typography>
              <Typography variant="text-xs" weight="bold" className="text-neutral-50 bg-primary-purple-105 rounded px-2.5 py-0.5">11</Typography>
            </div>
            <div className="flex flex-col">
              <Typography weight="bold" className="text-neutral-800 text-sm lg:text-base">Nov 11, 2024 11:00am -</Typography>
              <Typography weight="bold" className="text-neutral-800 text-sm lg:text-base">Nov 11, 2024 08:00pm</Typography>
            </div>
          </div>
          <div className="flex flex-row items-start gap-2 ">
            <div className="w-10 h-10 flex flex-col items-center justify-center bg-primary-purple-107 text-primary-purple-105 rounded-lg">
              <HiMapPin className="w-6 h-6 mx-2 text-primary-purple-105" />
            </div>
            <div className="flex flex-col">
              <Typography weight="bold" className="text-neutral-800 text-sm lg:text-base">Jakarta Convention Center</Typography>
              <Typography className="text-neutral-800 text-sm lg:text-base">Jl. Gatot Subroto No.1, RT.1/RW.3, Gelora, Kecamatan Tanah Abang, Kota Jakarta Pusat, Daerah Khusus Ibukota Jakarta 10270</Typography>
            </div>
          </div>
          <div className="border-b-2 border-primary-purple-109 border-dashed w-full" />
          <Typography variant="text-xs" className="text-center">NFT used:</Typography>
          <div className="rounded-lg px-10">
            <Image
              alt="nftImage"
              src={'/assets/nft-placeholder.jpg'}
              width={640}
              height={640}
              className="w-full h-auto aspect-square object-cover rounded-lg"
            />
          </div>
          <Typography variant="text-sm" weight="bold" className="text-center">NFT Bird Chirping</Typography>
          <div className="flex flex-row items-center justify-between bg-primary-purple-105 p-2 rounded-lg" role="button" onClick={() => router.push('/collection/1')}>
            <Typography variant="text-xs" weight="bold" className="!text-neutral-200">Orange Bird With Sound Like a Thunder</Typography>
            <HiChevronRight className="!text-neutral-200" />
          </div>
        </div>
      </section>
      <BottomArea>
        {
          viewQR &&
          <Image
            alt="eventImage"
            src={'/assets/qr-placeholder.png'}
            width={640}
            height={640}
            className="w-full md:w-1/2 lg:w-1/3 h-auto aspect-square object-cover rounded-lg mb-3 mx-auto my-0"
          />
        }
        <Button
          size="large"
          variant="filled"
          className="rounded-lg bg-primary-purple-106"
          onClick={() => setViewQR(!viewQR)}
        >
            {viewQR ? 'Close' : 'Show QR'}
        </Button>
      </BottomArea>
    </main>
  )
}

export default TicketDetail;
"use client"
import Button from "@/components/atoms/Button.atom";
import Typography from "@/components/atoms/Typography.atom";
import BottomArea from "@/components/molecules/BottomArea.molecule";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { HiMapPin } from "react-icons/hi2";

const GenerateTicket = () => {
  const router = useRouter();
  return (
    <main className="flex flex-col pb-16 gap-2 min-h-screen">
      <Typography variant="text-lg" weight="bold" className="text-center">Generate Ticket</Typography>
      <section className="px-3 lg:px-10">
        <div className="flex flex-col w-full gap-3 bg-neutral-200 dark:bg-neutral-800 shadow dark:shadow-neutral-700 p-3">
          <Typography variant="text-sm" weight="bold" className="text-center">NFT Bird Chirping</Typography>
          <div className="rounded-lg px-10">
            <Image
              alt="nftImage"
              src={'/assets/nft-placeholder.jpg'}
              width={640}
              height={640}
              className="w-full h-auto aspect-square object-cover rounded-lg"
            />
          </div>
          <Typography variant="text-xs" className="text-center border-b-2 border-neutral-500 border-dashed pb-3 mb-3">This NFT will be used for:</Typography>
          <Typography variant="text-sm" weight="bold" className="text-center !text-primary-purple-105">Decentralized with Portalis and Team</Typography>
          <Image
            alt="eventImage"
            src={'/assets/event-placeholder.jpg'}
            width={960}
            height={540}
            className="w-full h-auto object-cover rounded-lg"
          />
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
          <div className="flex flex-row items-start gap-2">
            <div className="w-10 h-10 flex flex-col items-center justify-center bg-primary-purple-107 text-primary-purple-105 rounded-lg">
              <HiMapPin className="w-6 h-6 mx-2 text-primary-purple-105" />
            </div>
            <div className="flex flex-col">
              <Typography weight="bold" className="text-neutral-800 text-sm lg:text-base">Jakarta Convention Center</Typography>
              <Typography className="text-neutral-800 text-sm lg:text-base">Jl. Gatot Subroto No.1, RT.1/RW.3, Gelora, Kecamatan Tanah Abang, Kota Jakarta Pusat, Daerah Khusus Ibukota Jakarta 10270</Typography>
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
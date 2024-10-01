"use client"
import Button from "@/components/atoms/Button.atom";
import Typography from "@/components/atoms/Typography.atom";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { HiChevronRight, HiMapPin, HiMiniFlag, HiMiniGlobeAlt, HiUserCircle, HiUserGroup } from "react-icons/hi2";

const EventDetail = () => {
  const router = useRouter();
  return (
    <main className="flex flex-col pt-10 pb-36 lg:pb-20 gap-2 min-h-screen">
      <section className="px-3 w-full relative">
        <Image
          alt="eventImage"
          src={'/assets/event-placeholder.jpg'}
          width={960}
          height={540}
          className="w-full h-auto object-cover rounded-lg"
        />
        <div className="absolute top-1 right-4 flex flex-row w-[100px] px-3 py-1 gap-1 items-center rounded bg-primary-green-500">
          <HiMiniFlag className="text-primary-purple-108" />
          <Typography variant="text-xs" weight="bold" className="!text-primary-purple-108">Featured</Typography>
        </div>
      </section>
      <section className="flex flex-col gap-3 px-3">
        <Typography variant="text-2xl" weight="extra-bold" className="text-primary-purple-108">Decentralized with Portalis and Team</Typography>
        <div className="flex flex-row items-center justify-between p-4 gap-1 rounded-lg bg-neutral-200 dark:bg-neutral-800 flex-auto">
          <div className="flex flex-row items-center gap-2">
            <HiUserCircle className="text-primary-purple-105"/>
            <Typography variant="text-xs" weight="bold" className="!text-primary-purple-105">Portalis Team</Typography>
          </div>
          <HiChevronRight className="text-primary-purple-105" />
        </div>
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
        <div className="flex flex-col">
          <Typography weight="bold" className="text-neutral-800 text-base">Event Description</Typography>
          <Typography className="text-neutral-800 text-base">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</Typography>
        </div>
        <Button size="small" variant="outlined" className="rounded-lg" onClick={() => router.push('https://portalis.fun')}>
          <span className="flex flex-row items-center gap-2">
            <HiMiniGlobeAlt className="w-4 h-4 text-neutral-800 dark:text-neutral-200"/>
            <Typography variant="text-sm">Visit Website</Typography>
          </span>
        </Button>
        <Button size="small" variant="outlined" className="rounded-lg" onClick={() => router.push('/event/1/visitor')}>
          <span className="flex flex-row items-center gap-2">
            <HiUserGroup className="w-4 h-4 text-neutral-800 dark:text-neutral-200"/>
            <Typography variant="text-sm">See Visitor Data</Typography>
          </span>
        </Button>
      </section>
      <div className="bottom-16 lg:bottom-0 left-0 right-0 w-full fixed bg-neutral-200 dark:bg-neutral-800 px-3 py-2">
        <Button size="large" variant="filled" className="rounded-lg bg-primary-purple-106" onClick={() => router.push('/event/1/eligible')}>Check Eligible Asset</Button>
      </div>
    </main>
  )
}

export default EventDetail;
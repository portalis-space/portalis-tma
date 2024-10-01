"use client"
import Typography from "@/components/atoms/Typography.atom";
import Link from "next/link";
import { HiMiniWallet, HiOutlineUserCircle, HiTicket } from "react-icons/hi2";
import { RiCompass3Fill } from "react-icons/ri";

const Header = () => {
  return (
      <div className="flex flex-row justify-between items-center h-10 bg-neutral-100 dark:bg-neutral-900 fixed px-2 w-full z-50">
        <div className="flex flex-row items-center justify-start basis-1/6">
          <Link href={'/'}>
            <Typography variant="text-sm" weight="bold">PORTALIS</Typography>
          </Link>
        </div>
        <div className="flex flex-row items-center gap-4 lg:gap-8 basis-2/3 justify-center">
          <Link href={'/discover'}>
            <RiCompass3Fill className="w-6 h-6 lg:w-8 lg:h-8 text-neutral-800 dark:text-neutral-200"/>
          </Link>
          <Link href={'/ticket'}>
            <HiTicket className="w-6 h-6 lg:w-8 lg:h-8 text-neutral-800 dark:text-neutral-200"/>
          </Link>
          <Link href={'/wallet'}>
            <HiMiniWallet className="w-6 h-6 lg:w-8 lg:h-8 text-neutral-800 dark:text-neutral-200"/>
          </Link>
        </div>
        <div className="flex flex-row items-center justify-end basis-1/6 gap-3">
          <Link href={'/my-profile'}>
            <HiOutlineUserCircle className="w-6 h-6 lg:w-8 lg:h-8 text-neutral-800 dark:text-neutral-200" />
          </Link>
        </div>
      </div>
  )
}

export default Header;
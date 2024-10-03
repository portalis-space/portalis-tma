"use client"
import { cn } from "@/utils/cn";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { HiHome, HiMiniWallet, HiTicket, HiUserCircle } from "react-icons/hi2";
import { RiCompass3Fill } from "react-icons/ri";

const Nav = () => {
  const pathname = usePathname();
  return (
    <div className="flex flex-row justify-around items-center h-16 bg-neutral-100 dark:bg-neutral-900 fixed bottom-0 px-2 z-50 w-full md:w-3/4 lg:w-2/3 xl:w-1/2">
      <Link href={'/'}>
        <HiHome className={cn("w-6 h-6 text-neutral-800 dark:text-neutral-200", {"!text-primary-purple-105" : pathname === '/'})} />
      </Link>
      <Link href={'/discover'}>
        <RiCompass3Fill className={cn("w-6 h-6 text-neutral-800 dark:text-neutral-200", {"!text-primary-purple-105" : pathname === '/discover'})}/>
      </Link>
      <Link href={'/wallet'}>
        <HiMiniWallet className={cn("w-6 h-6 text-neutral-800 dark:text-neutral-200", {"!text-primary-purple-105" : pathname === '/wallet'})}/>
      </Link>
      <Link href={'/ticket'}>
        <HiTicket className={cn("w-6 h-6 text-neutral-800 dark:text-neutral-200", {"!text-primary-purple-105" : pathname === '/ticket'})}/>
      </Link>
      <Link href={'/my-profile'}>
        <HiUserCircle className={cn("w-6 h-6 text-neutral-800 dark:text-neutral-200", {"!text-primary-purple-105" : pathname === '/my-profile'})} />
      </Link>
    </div>
  )
}

export default Nav;
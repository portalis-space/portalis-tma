"use client"
import Typography from "@/components/atoms/Typography.atom";
import { cn } from "@/utils/cn";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { HiHome, HiMiniWallet, HiTicket, HiUserCircle } from "react-icons/hi2";
import { RiCompass3Fill } from "react-icons/ri";

const Header = () => {
  const pathname = usePathname();
  return (
    <>
      <div className="hidden lg:flex flex-row justify-between items-center h-10 bg-neutral-100 dark:bg-neutral-900 fixed px-2 w-full z-50">
        <div className="flex flex-row items-center justify-start basis-1/6">
          <Link href={'/'}>
            <Typography variant="text-sm" weight="bold" className={`${pathname === '/' ? '!text-primary-purple-105' : ''}`}>PORTALIS</Typography>
          </Link>
        </div>
        <div className="flex flex-row items-center gap-4 lg:gap-8 basis-2/3 justify-center">
          <Link href={'/discover'}>
            <RiCompass3Fill className={cn("w-6 h-6 lg:w-8 lg:h-8 text-neutral-800 dark:text-neutral-200", {"!text-primary-purple-105" : pathname === '/discover'})}/>
          </Link>
          <Link href={'/wallet'}>
            <HiMiniWallet className={cn("w-6 h-6 lg:w-8 lg:h-8 text-neutral-800 dark:text-neutral-200", {"!text-primary-purple-105" : pathname === '/wallet'})}/>
          </Link>
          <Link href={'/ticket'}>
            <HiTicket className={cn("w-6 h-6 lg:w-8 lg:h-8 text-neutral-800 dark:text-neutral-200", {"!text-primary-purple-105" : pathname === '/ticket'})}/>
          </Link>
        </div>
        <div className="flex flex-row items-center justify-end basis-1/6 gap-3">
          <Link href={'/my-profile'}>
            <HiUserCircle className={cn("w-6 h-6 lg:w-8 lg:h-8 text-neutral-800 dark:text-neutral-200", {"!text-primary-purple-105" : pathname === '/my-profile'})} />
          </Link>
        </div>
      </div>
      {/* MOBILES */}
      <div className="flex lg:hidden flex-row justify-around items-center h-16 bg-neutral-100 dark:bg-neutral-900 fixed bottom-0 left-0 right-0 px-2 w-full z-50">
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
    </>
  )
}

export default Header;
"use client"
import { cn } from "@/utils/cn";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { HiChevronLeft, HiChevronRight, HiClock, HiHome, HiMiniFlag, HiPlusCircle, HiUserCircle } from "react-icons/hi2";

const Nav = () => {
  const pathname = usePathname();
  const router =useRouter();
  return (
    <div className="flex flex-row justify-around items-center h-16 bg-primary-blue-500 dark:bg-neutral-900 fixed bottom-0 z-50 w-full md:w-3/4 lg:w-2/3 xl:w-1/2">
      <HiChevronLeft className="text-neutral-800 dark:text-neutral-200 w-6 h-6" role="button" onClick={() => router.back()} />
      <Link href={'/'}>
        <HiHome className={cn("w-6 h-6 text-neutral-800 dark:text-neutral-200", {"!text-primary-purple-105" : pathname === '/'})} />
      </Link>
      <Link href={'/quest'}>
        <HiMiniFlag className={cn("w-6 h-6 text-neutral-800 dark:text-neutral-200", {"!text-primary-purple-105" : pathname === '/quest'})}/>
      </Link>
      <Link href={'/create-utility'}>
        <HiPlusCircle className={cn("w-6 h-6 text-neutral-800 dark:text-neutral-200", {"!text-primary-purple-105" : pathname === '/create-utility'})}/>
      </Link>
      <Link href={'/event'}>
        <HiClock className={cn("w-6 h-6 text-neutral-800 dark:text-neutral-200", {"!text-primary-purple-105" : pathname === '/event'})}/>
      </Link>
      <Link href={'/my-profile'}>
        <HiUserCircle className={cn("w-6 h-6 text-neutral-800 dark:text-neutral-200", {"!text-primary-purple-105" : pathname === '/my-profile'})} />
      </Link>
      <HiChevronRight className="text-neutral-800 dark:text-neutral-200 w-6 h-6" role="button" onClick={() => router.forward()} />
    </div>
  )
}

export default Nav;
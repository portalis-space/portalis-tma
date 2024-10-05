"use client"
import { cn } from "@/utils/cn";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { HiChevronLeft, HiChevronRight, HiClock, HiHome, HiMiniFlag, HiPlusCircle, HiUserCircle } from "react-icons/hi2";

const Nav = () => {
  const pathname = usePathname();
  const router =useRouter();
  return (
    <div className="fixed bottom-0 z-50 w-full md:w-3/4 lg:w-2/3 xl:w-1/2 p-2">
      <div className="flex flex-row justify-around items-center h-12 bg-gradient-to-br from-primary-blue-500 to-primary-purple-105 rounded-full">
        <HiChevronLeft className="text-primary-purple-101 dark:text-primary-purple-109 w-6 h-6" role="button" onClick={() => router.back()} />
        <Link href={'/'}>
          <HiHome className={cn("w-6 h-6 text-primary-purple-101 dark:text-primary-purple-109", {"dark:text-primary-purple-101 text-primary-purple-109" : pathname === '/'})} />
        </Link>
        <Link href={'/quest'}>
          <HiMiniFlag className={cn("w-6 h-6 text-primary-purple-101 dark:text-primary-purple-109", {"dark:text-primary-purple-101 text-primary-purple-109" : pathname === '/quest'})}/>
        </Link>
        <Link href={'/create-utility'}>
          <HiPlusCircle className={cn("w-6 h-6 text-primary-purple-101 dark:text-primary-purple-109", {"dark:text-primary-purple-101 text-primary-purple-109" : pathname === '/create-utility'})}/>
        </Link>
        <Link href={'/event'}>
          <HiClock className={cn("w-6 h-6 text-primary-purple-101 dark:text-primary-purple-109", {"dark:text-primary-purple-101 text-primary-purple-109" : pathname === '/event'})}/>
        </Link>
        <Link href={'/my-profile'}>
          <HiUserCircle className={cn("w-6 h-6 text-primary-purple-101 dark:text-primary-purple-109", {"dark:text-primary-purple-101 text-primary-purple-109" : pathname === '/my-profile'})} />
        </Link>
        <HiChevronRight className="text-primary-purple-101 dark:text-primary-purple-109 w-6 h-6" role="button" onClick={() => router.forward()} />
      </div>
    </div>
  )
}

export default Nav;
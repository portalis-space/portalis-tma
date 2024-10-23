"use client"
import { useContractContext } from "@/contexts/Contract.context";
import { cn } from "@/utils/cn";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { HiChevronLeft, HiChevronRight, HiClock, HiHome, HiPlusCircle, HiUserCircle } from "react-icons/hi2";

const Nav = () => {
  const {contract} = useContractContext();
  const pathname = usePathname();
  const router = useRouter();
  return (
    <div className="fixed bottom-0 z-50 w-full md:w-3/4 lg:w-2/3 xl:w-1/2 p-2">
      <div className="flex flex-row justify-around items-center h-12 bg-gradient-to-br from-primary-blue-500 to-primary-purple-105 rounded-full">
        <HiChevronLeft className="text-primary-purple-101 dark:text-primary-purple-109 w-6 h-6" role="button" onClick={() => router.back()} />
        <Link href={'/'}>
          <HiHome className={cn("w-6 h-6 text-primary-purple-101 dark:text-primary-purple-109", {"dark:text-primary-purple-101 text-primary-purple-109" : pathname === '/'})} />
        </Link>
        <Link href={'/create-utility'}>
          <HiPlusCircle className={cn("w-6 h-6 text-primary-purple-101 dark:text-primary-purple-109", {"dark:text-primary-purple-101 text-primary-purple-109" : pathname === '/create-utility'})}/>
        </Link>
        <Link
          href={'/wallet'}
          className={`cursor-pointer relative rounded-full w-10 h-10 overflow-hidden flex items-center justify-center ${contract === 'evm' ? 'p-3' : ''}`}>
          <div className="nav-icon w-full h-full absolute" />
          <div className="absolute w-8 h-8 bg-neutral-900 rounded-full p-1 flex flex-row items-center justify-center">
            <Image src={contract === 'evm' ? '/assets/eth-logo.png' : '/assets/ton-logo.png'} alt='contract-logo' width={0} height={0} className="w-auto h-6 p-1" />
          </div>
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
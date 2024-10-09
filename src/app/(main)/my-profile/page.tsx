"use client"
import Typography from "@/components/atoms/Typography.atom";
import { ClipboardButton } from "@/components/molecules/ClipboardButton.molecule";
import InputWithIcon from "@/components/molecules/InputWithIcon.molecule";
import { Switch } from "@/components/molecules/Switch.molecule";
import { useAuthContext } from "@/contexts/Auth.context";
import { useDarkMode } from "@/contexts/DarkMode.context";
import { retrieveLaunchParams } from "@telegram-apps/sdk-react";
import Image from "next/image";
import Link from "next/link";
import { HiAtSymbol, HiChatBubbleLeft, HiChevronRight, HiIdentification, HiOutlineWallet, HiTicket, HiUser, HiUserCircle } from "react-icons/hi2";

const MyProfile = () => {
  const launchParam = typeof window !== "undefined" && retrieveLaunchParams();
  console.log(launchParam);
  const {currentUserData} = useAuthContext();
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  return (
    <main className="flex flex-col px-3 gap-2 min-h-screen">
      <Typography variant="text-lg" weight="bold" className="text-center">My Profile</Typography>
      <section className="flex flex-col w-full gap-3">
        <div className="flex flex-col lg:flex-row items-center gap-2">
          {
            currentUserData?.attributes.profilePics ?
            <Image
              alt='profile image'
              src={currentUserData?.attributes.profilePics}
              width={200}
              height={200}
              className="w-40 h-40 lg:basis-1/3 object-cover rounded-full"
            /> :
            <HiUserCircle className="text-neutral-800 dark:text-neutral-200 w-40 h-40 lg:basis-1/3" />
          }
          <div className="flex flex-col gap-2 lg:basis-2/3">
            <div className="flex flex-row justify-start items-center">
              <Typography variant="text-sm" className="w-1/3">User ID</Typography>
              <InputWithIcon headingIcon={<HiIdentification className="text-neutral-800 dark:text-neutral-200" />} value={currentUserData?.attributes.userId} disabled />
            </div>
            <div className="flex flex-row justify-start items-center">
              <Typography variant="text-sm" className="w-1/3">Chat ID</Typography>
              <InputWithIcon headingIcon={<HiChatBubbleLeft className="text-neutral-800 dark:text-neutral-200" />} value={currentUserData?.attributes.chatId} disabled />
            </div>
            <div className="flex flex-row justify-start items-center">
              <Typography variant="text-sm" className="w-1/3">Username</Typography>
              <InputWithIcon headingIcon={<HiAtSymbol className="text-neutral-800 dark:text-neutral-200" />} value={currentUserData?.attributes.username} disabled />
            </div>
            <div className="flex flex-row justify-start items-center">
              <Typography variant="text-sm" className="w-1/3">Name</Typography>
              <InputWithIcon headingIcon={<HiUser className="text-neutral-800 dark:text-neutral-200" />} value={`${currentUserData?.attributes.firstName} ${currentUserData?.attributes.lastName}`} disabled />
            </div>
          </div>
        </div>
        <div className="w-full border-y border-neutral-500" />
        <Link href={'/wallet'} className="flex flex-row items-center justify-between rounded w-full bg-white bg-opacity-30 dark:bg-neutral-900 p-3">
          <div className="flex flex-row items-center gap-2">
            <HiOutlineWallet className="text-neutral-800 dark:text-neutral-200" />
            <Typography variant="text-sm" weight="bold">My Wallet</Typography>
          </div>
          <HiChevronRight className="text-neutral-800 dark:text-neutral-200" />
        </Link>
        <Link href={'/ticket'} className="flex flex-row items-center justify-between rounded w-full bg-white bg-opacity-30 dark:bg-neutral-900 p-3">
          <div className="flex flex-row items-center gap-2">
            <HiTicket className="text-neutral-800 dark:text-neutral-200" />
            <Typography variant="text-sm" weight="bold">My Ticket</Typography>
          </div>
          <HiChevronRight className="text-neutral-800 dark:text-neutral-200" />
        </Link>
        <div className="flex flex-row justify-start items-center rounded bg-white bg-opacity-30 dark:bg-neutral-900 p-3">
          <Typography variant="text-sm" className="w-1/3">Dark Mode</Typography>
          <div className="w-2/3 flex flex-row items-center justify-end gap-2">
            <Switch
              isOn={isDarkMode} // Use the dark mode state
              onToggle={toggleDarkMode} // Toggle dark mode via context
              onColor="bg-gray-700"
              offColor="bg-gray-300"
              circleColor="bg-white"
              className="text-end"
            />
            <Typography variant="text-xs">{isDarkMode ? 'ON' : 'OFF'}</Typography>
          </div>
        </div>
        <Typography variant="text-sm" className="w-1/3">Copy Launch Param</Typography>
        <ClipboardButton textToCopy={launchParam ? JSON.stringify(launchParam) : '-'} />
      </section>
    </main>
  )
}

export default MyProfile;
"use client"
import Button from "@/components/atoms/Button.atom";
import Typography from "@/components/atoms/Typography.atom";
import InputWithIcon from "@/components/molecules/InputWithIcon.molecule";
import { Switch } from "@/components/molecules/Switch.molecule";
import { useAuthContext } from "@/contexts/Auth.context";
import { useDarkMode } from "@/contexts/DarkMode.context";
import { HiAtSymbol, HiChatBubbleLeft, HiIdentification, HiUser } from "react-icons/hi2";

const MyProfile = () => {
  const {currentUserData} = useAuthContext();
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  return (
    <main className="flex flex-col px-3 gap-2 min-h-screen">
      <Typography variant="text-lg" weight="bold" className="text-center">My Profile</Typography>
      <section className="flex flex-col w-full gap-3">
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
        <div className="flex flex-row justify-start items-center">
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
        <Button variant="outlined">Logout</Button>
      </section>
    </main>
  )
}

export default MyProfile;
import Typography from "@/components/atoms/Typography.atom";
import { HiCheck, HiXMark } from "react-icons/hi2";

const Quest = () => {
  return (
    <main className="flex flex-col px-3 gap-5 min-h-screen">
      <div className="flex flex-col gap-2">
        <Typography variant="text-lg" weight="bold" className="text-center">Quest</Typography>
        <Typography variant="text-xs" weight="bold" className="text-center">Complete these quests to earn points and significantly boost your chances of receiving airdrop.</Typography>
        <div className="flex flex-row justify-between items-center bg-primary-purple-105 p-4 rounded-lg">
          <Typography variant="text-lg" weight="bold" className="text-center !text-neutral-200">Your Point</Typography>
          <Typography variant="text-lg" weight="bold" className="text-center !text-neutral-200">100pts</Typography>
        </div>
      </div>
      <section className="flex flex-col w-full gap-3">
        <div className="w-full flex flex-row items-center justify-between bg-white bg-opacity-30 dark:bg-neutral-800 p-3 gap-2 rounded-lg">
          <Typography variant="text-sm" weight="bold">Connect your wallet</Typography>
          <div className="flex flex-row items-center gap-2">
            <Typography variant="text-sm" weight="bold">100pts</Typography>
            <HiCheck className="text-primary-purple-105" />
          </div>
        </div>
        <div className="w-full flex flex-row items-center justify-between bg-white bg-opacity-30 dark:bg-neutral-800 p-3 gap-2 rounded-lg">
          <Typography variant="text-sm" weight="bold">Create your first event</Typography>
          <div className="flex flex-row items-center gap-2">
            <Typography variant="text-sm" weight="bold">50pts</Typography>
            <HiXMark className="text-neutral-500" />
          </div>
        </div>
        <div className="w-full flex flex-row items-center justify-between bg-white bg-opacity-30 dark:bg-neutral-800 p-3 gap-2 rounded-lg">
          <Typography variant="text-sm" weight="bold">Generate your first ticket</Typography>
          <div className="flex flex-row items-center gap-2">
            <Typography variant="text-sm" weight="bold">100pts</Typography>
            <HiXMark className="text-neutral-500" />
          </div>
        </div>
        <div className="w-full flex flex-row items-center justify-between bg-white bg-opacity-30 dark:bg-neutral-800 p-3 gap-2 rounded-lg">
          <Typography variant="text-sm" weight="bold">Attend 3 Event</Typography>
          <div className="flex flex-row items-center gap-2">
            <Typography variant="text-sm" weight="bold">150pts</Typography>
            <HiXMark className="text-neutral-500" />
          </div>
        </div>
      </section>
    </main>
  )
}

export default Quest;
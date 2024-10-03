import Typography from "@/components/atoms/Typography.atom";
import { HiUser } from "react-icons/hi2";

const VisitorCard = () => {
  return (
    <div className="flex flex-row items-center justify-start gap-2 w-full bg-white bg-opacity-30 dark:bg-neutral-800 rounded px-3 py-2">
      <HiUser className="w-8 h-8 text-neutral-800 dark:text-neutral-200" />
      <div className="flex flex-col">
        <Typography variant="text-base" weight="bold">Santana</Typography>
        <Typography variant="text-xs">Nov 20, 2024 08:12pm</Typography>
      </div>
    </div>
  )
}

export default VisitorCard;
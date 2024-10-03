import Typography from "@/components/atoms/Typography.atom";
import { HiClock } from "react-icons/hi2";

const CreateUtility = () => {
  return (
    <main className="flex flex-col px-3 gap-5 min-h-screen">
      <div>
        <Typography variant="text-lg" weight="bold" className="text-center">Create Utility</Typography>
        <Typography variant="text-xs" weight="bold" className="text-center">Choose new utility you want to create.</Typography>
      </div>
      <section className="flex flex-col w-full gap-3">
        <div className="w-full flex flex-row items-center justify-center bg-white bg-opacity-50 dark:bg-neutral-800 p-5 gap-2 rounded-lg">
          <HiClock className="text-primary-blue-800 dark:text-primary-blue-500 w-16 h-16" />
          <Typography variant="text-3xl" weight="extra-bold" className="text-primary-blue-800 dark:!text-primary-blue-500">EVENT</Typography>
        </div>
      </section>
    </main>
  )
}

export default CreateUtility;
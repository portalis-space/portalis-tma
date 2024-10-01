import EventCard from "@/components/molecules/EventCard.molecule";
import InputWithIcon from "@/components/molecules/InputWithIcon.molecule";
import { HiMagnifyingGlass } from "react-icons/hi2";

const DiscoverEvent = () => {
  return (
    <section className="flex flex-col gap-3">
      <InputWithIcon headingIcon={<HiMagnifyingGlass className="text-neutral-800 dark:text-neutral-200" />} />
      <div className="flex flex-col w-full gap-2">
        <EventCard />
        <EventCard />
        <EventCard />
        <EventCard />
        <EventCard/>     
      </div>
    </section>
  )
}

export default DiscoverEvent;
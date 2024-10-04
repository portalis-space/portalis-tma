import EventCard from "@/components/molecules/EventCard.molecule";

const AssignedEvent = () => {
  return (
    <section className="flex flex-col gap-3">
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

export default AssignedEvent;
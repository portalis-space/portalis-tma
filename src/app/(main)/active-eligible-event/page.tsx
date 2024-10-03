import Typography from "@/components/atoms/Typography.atom";
import EventCard from "@/components/molecules/EventCard.molecule";

const ActiveEligibleEvent = () => {
  return (
    <main className="flex flex-col px-3 gap-2 min-h-screen">
      <Typography variant="text-lg" weight="bold" className="text-center">All Active Eligible Events</Typography>
      <section className="flex flex-col w-full gap-3">
        <EventCard />
        <EventCard />
        <EventCard />
        <EventCard />
        <EventCard />
        <EventCard />
        <EventCard />
        <EventCard />
      </section>
    </main>
  )
}

export default ActiveEligibleEvent;
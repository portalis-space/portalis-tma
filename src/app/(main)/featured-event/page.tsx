import Typography from "@/components/atoms/Typography.atom";
import EventCard from "@/components/molecules/EventCard.molecule";

const FeaturedEvent = () => {
  return (
    <main className="flex flex-col pt-10 pb-20 px-3 gap-2 min-h-screen">
      <Typography variant="text-lg" weight="bold" className="text-center">All Featured Events</Typography>
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

export default FeaturedEvent;
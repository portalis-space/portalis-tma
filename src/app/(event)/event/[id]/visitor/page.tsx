import Typography from "@/components/atoms/Typography.atom";
import VisitorCard from "@/components/molecules/VisitorCard.molecule";

const EventVisitor = () => {
  return (
    <main className="flex flex-col px-3 gap-2 min-h-screen">
      <div className="bg-neutral-200 dark:bg-neutral-800 rounded-xl flex flex-col items-center p-2 w-full">
        <Typography weight="bold" variant="text-xs" className="!text-primary-purple-105 truncate w-full text-center">Decentralized with Portalis and Team</Typography> 
      </div>
      <Typography variant="text-lg" weight="bold" className="text-center">Visitor</Typography>
      <Typography variant="text-sm" weight="bold" className="text-end">Total: 123</Typography>
      <section className="flex flex-col w-full gap-3">
        <VisitorCard />
        <VisitorCard />
        <VisitorCard />
        <VisitorCard />
      </section>
    </main>
  )
}

export default EventVisitor;